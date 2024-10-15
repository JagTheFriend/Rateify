'use server'

import { clerkClient } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { type CustomUserType, SERVER_ERROR_MESSAGE } from '~/lib/types'
import { checkAuthentication, getUserDetail } from '~/lib/utils'
import { db } from './db'

const PostCommentSchema = z.object({
  postId: z.string().min(1),
  comment: z.string().min(1),
})

export async function postComment(formData: FormData) {
  const postId = formData.get('postId') as string
  const comment = formData.get('commentContent') as string

  try {
    PostCommentSchema.parse({
      postId,
      comment,
    })
    const { userId: authorId } = checkAuthentication()

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
    return SERVER_ERROR_MESSAGE
  }
}

const LikeOrDislikeCommentSchema = z.object({
  commentId: z.string().min(1),
  decrement: z.boolean(),
})

export async function likeOrDislikeComment(
  commentId: string,
  decrement = false,
) {
  var postId
  try {
    LikeOrDislikeCommentSchema.parse({
      commentId,
      decrement,
    })
    checkAuthentication()

    if (!decrement) {
      const postData = await db.comment.update({
        where: {
          id: commentId,
        },
        data: {
          likeCounter: {
            increment: 1,
          },
        },
      })
      postId = postData.postId
    } else {
      const postData = await db.comment.update({
        where: {
          id: commentId,
        },
        data: {
          likeCounter: {
            decrement: 1,
          },
        },
      })
      postId = postData.postId
    }
    revalidatePath(`/view/${postId}`)
    return { message: 'Success', status: 200 }
  } catch (error) {
    return SERVER_ERROR_MESSAGE
  }
}

const GetCommentsOfPostSchema = z.object({
  postId: z.string().min(1),
  currentUser: z.string().optional(),
})

export async function getCommentsOfPost(
  postId: string,
  currentCursor?: string,
) {
  try {
    GetCommentsOfPostSchema.parse({
      postId,
      currentCursor,
    })
    checkAuthentication()

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

    return { status: 200, message: finalData }
  } catch (error) {
    return SERVER_ERROR_MESSAGE
  }
}
