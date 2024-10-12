'use server'

import { auth } from '@clerk/nextjs/server'
import { db } from './db'

export async function postComment(formData: FormData) {
  const postId = formData.get('postId') as string
  const comment = formData.get('commentContent') as string
  const { userId: authorId } = auth()

  if (!authorId) {
    return { message: 'Unauthenticated', status: 401 }
  }

  try {
    await db.comment.create({
      data: {
        authorId,
        content: comment,
        postId: postId,
      },
    })
    return { message: 'Comment Created', status: 200 }
  } catch (error) {
    return { message: 'Server Error Occurred. Try again later', status: 503 }
  }
}
