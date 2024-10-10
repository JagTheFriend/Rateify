'use server'

import { auth } from '@clerk/nextjs/server'
import { getStorage, ref, uploadBytes } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'
import { db, firebaseApp } from './db'

export async function newPost(
  formData: FormData,
): Promise<{ message: string; status: 401 | 200 | 503 }> {
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

  const storage = getStorage(firebaseApp)

  try {
    uploadData.imageFiles.forEach(async (file, index) => {
      const storageRef = ref(storage, `posts/${uploadData.postId}/${index}`)
      await uploadBytes(storageRef, file)
    })
    await db.post.create({
      data: {
        id: uploadData.postId,
        description: uploadData.description,
        title: uploadData.title,
        authorId: currentUser.userId,
      },
    })
    return { message: 'Uploaded Images', status: 200 }
  } catch (error) {
    const errorMessage = (error as Error).message
    if (
      !errorMessage.startsWith(
        "unhandledRejection: TypeError: Cannot read properties of undefined (reading 'path')",
      )
    ) {
      return { message: 'Server Error', status: 503 }
    }
    return { message: 'Uploaded Images', status: 200 }
  }
}
