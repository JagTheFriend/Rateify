'use server'

import { auth } from '@clerk/nextjs/server'
import { getStorage, ref, uploadBytes } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'
import { firebaseApp } from './db'

export async function newPost(formData: FormData) {
  const currentUser = auth()

  if (!currentUser) {
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
    return { message: 'Uploaded Images', status: 200 }
  } catch (error) {
    return { message: 'Error Occur', status: 503 }
  }
}
