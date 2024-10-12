'use server'

import { auth, clerkClient } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import type { CustomUserType } from '~/lib/types'
import { getUserDetail } from '~/lib/utils'
import { db } from './db'

export async function postComment(formData: FormData) {
  const postId = formData.get('postId') as string
  const comment = formData.get('commentContent') as string
  const { userId: authorId } = auth()

  if (!authorId) {
    return { message: 'Unauthenticated', status: 401 }
  }

  try {
    await db.post.update({
      where: {
        id: postId,
      },
      data: {
        commentCounter: {
          increment: 1,
        },
        comments: {
          create: {
            authorId,
            content: comment,
          },
        },
      },
    })
    revalidatePath(`/view/${postId}`)
    return { message: 'Comment Created', status: 200 }
  } catch (error) {
    return {
      message: 'Server Error Occurred. Try again after sometime',
      status: 503,
    }
  }
}

export async function likeComment(commentId: string) {
  try {
    const { postId } = await db.comment.update({
      where: {
        id: commentId,
      },
      data: {
        likeCounter: {
          increment: 1,
        },
      },
    })
    revalidatePath(`/view/${postId}`)
    return { message: 'Liked Comment', status: 200 }
  } catch (error) {
    return {
      message: 'Server Error Occurred. Try again after sometime',
      status: 503,
    }
  }
}

export async function getCommentsOfPost(
  postId: string,
  currentCursor?: string,
) {
  let comments
  if (currentCursor) {
    comments = await db.comment.findMany({
      where: {
        postId,
      },
      take: 10,
      cursor: {
        id: currentCursor,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
  } else {
    comments = await db.comment.findMany({
      where: {
        postId,
      },
      take: 10,
      orderBy: {
        createdAt: 'desc',
      },
    })
  }

  const commentAuthors = await clerkClient().users.getUserList({
    userId: comments.map((comment) => comment.authorId),
  })
  const userData = commentAuthors.data.map((commentAuthor) =>
    getUserDetail(commentAuthor),
  )

  const finalData = comments.map((comment) => ({
    ...comment,
    authorData:
      userData.filter((user) => user.id === comment.authorId)[0] ??
      ({
        id: 'DELETE_USER',
        dateJoined: 2,
        email: 'unknown@example.com',
        image: '',
        username: 'Unknown',
      } as CustomUserType),
  }))

  return { status: 2030, message: finalData }
}
