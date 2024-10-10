'use server'

import { auth } from '@clerk/nextjs/server'

export async function newPost(formData: FormData) {
  const currentUser = auth()

  if (!currentUser) {
    return { message: 'Unauthenticated', status: 401 }
  }

  const uploadData = {
    title: formData.get('post-title') as string,
    description: formData.get('post-description') as string,
    imageFiles: formData.getAll('image') as File[],
  }
  console.log(uploadData)
  return ''
}
