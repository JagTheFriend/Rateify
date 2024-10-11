'use server'

import { auth, clerkClient } from '@clerk/nextjs/server'
import { getStorage, ref, uploadBytes } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'
import { getUserDetail } from '~/lib/utils'
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
    uploadData.imageFiles.forEach(async (file, index) => {
      const storageRef = ref(storage, `posts/${uploadData.postId}/${index}`)
      await uploadBytes(storageRef, file, {
        contentType: file.type,
        customMetadata: {
          postId: uploadData.postId,
          name: file.name,
          size: file.size.toString(),
        },
      })
    })
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
    const errorMessage = (error as Error).message
    if (
      !errorMessage.startsWith(
        "unhandledRejection: TypeError: Cannot read properties of undefined (reading 'path')",
      )
    ) {
      return { message: 'Server Error', status: 503 }
    }
    return { message: uploadData.postId, status: 200 }
  }
}

export async function getUserById(userId: string) {
  try {
    const user = await clerkClient.users.getUser(userId)
    const details = getUserDetail(user)
    return { details }
  } catch (error) {
    return {
      error: true,
    }
  }
}

export async function getPostData(postId: string) {
  const post = await db.post.findUnique({ where: { id: postId } })
  if (!post) {
    return { message: 'Post not found', status: 404 }
  }

  const storage = getStorage(firebaseApp)

  // Create a reference with an initial file path and name
  for (let index = 0; index < post.numberOfImages; index++) {
    const imageUrl = `https://firebasestorage.googleapis.com/v0/b/rateify-17fc8.appspot.com/o/posts%2F${postId}%2F${index}?alt=media`
    console.log(imageUrl)
  }
}
