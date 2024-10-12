'use server'

import { auth } from '@clerk/nextjs/server'
import { getStorage, ref, uploadBytes } from 'firebase/storage'
import { revalidatePath } from 'next/cache'
import { v4 as uuidv4 } from 'uuid'
import type { ReturnTypeOfPost } from '~/lib/types'
import { db, firebaseApp } from './db'

export async function newPost(
  formData: FormData,
): Promise<{ message: string; status: 401 | 200 | 503 | 507 }> {
  const currentUser = auth()

  if (!currentUser?.userId) {
    return { message: 'Unauthenticated', status: 401 }
  }

  const uploadData = {
    postId: uuidv4(),
    title: formData.get('post-title') as string,
    description: formData.get('post-description') as string,
    imageFiles: formData.getAll('image') as File[],
  }

  if (uploadData.imageFiles.filter((file) => file.size > 8.389e6).length > 0) {
    return {
      message: 'Image too big',
      status: 507,
    }
  }

  const storage = getStorage(firebaseApp)

  try {
    let index = 0
    for (let file of uploadData.imageFiles) {
      const storageRef = ref(storage, `posts/${uploadData.postId}/${index}`)
      await uploadBytes(storageRef, file, {
        contentType: file.type,
        customMetadata: {
          postId: uploadData.postId,
          name: file.name,
          size: file.size.toString(),
        },
      })
      index++
    }
    await db.post.create({
      data: {
        id: uploadData.postId,
        description: uploadData.description,
        title: uploadData.title,
        numberOfImages: uploadData.imageFiles.length,
        authorId: currentUser.userId,
      },
    })
    return { message: uploadData.postId, status: 200 }
  } catch (error) {
    console.warn(error)
    return { message: 'Server Error', status: 503 }
  }
}

export async function getPostData(postId: string): Promise<{
  message: ReturnTypeOfPost
  status: 404 | 200
}> {
  const post = await db.post.findUnique({ where: { id: postId } })

  if (!post) {
    return { message: {} as ReturnTypeOfPost, status: 404 }
  }

  const returnData: ReturnTypeOfPost = { ...post, imageUrls: [] }

  // Create a reference with an initial file path and name
  for (let index = 0; index < post.numberOfImages; index++) {
    const imageUrl = `https://firebasestorage.googleapis.com/v0/b/rateify-17fc8.appspot.com/o/posts%2F${postId}%2F${index}?alt=media`
    returnData.imageUrls.push(imageUrl)
  }

  return {
    message: returnData,
    status: 200,
  }
}

export async function likeOrDislikePost(
  type: 'like' | 'dislike',
  postId: string,
  decrement = false,
): Promise<{ message: string; status: 404 | 200 | 503 }> {
  try {
    const post = await db.post.findUnique({ where: { id: postId } })

    if (!post) {
      return { message: 'Post Not Found!', status: 404 }
    }

    if (type == 'like') {
      if (!decrement) {
        await db.post.update({
          where: {
            id: postId,
          },
          data: {
            likeCounter: {
              increment: 1,
            },
          },
        })
      } else {
        await db.post.update({
          where: {
            id: postId,
          },
          data: {
            likeCounter: {
              decrement: 1,
            },
          },
        })
      }
    } else {
      if (!decrement) {
        await db.post.update({
          where: {
            id: postId,
          },
          data: {
            dislikeCounter: {
              increment: 1,
            },
          },
        })
      } else {
        await db.post.update({
          where: {
            id: postId,
          },
          data: {
            dislikeCounter: {
              decrement: 1,
            },
          },
        })
      }
    }
    revalidatePath(`/view/${postId}`)
    return { message: 'Success', status: 200 }
  } catch (error) {
    return { message: 'Server Error', status: 503 }
  }
}
