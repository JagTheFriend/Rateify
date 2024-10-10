'use server'

import { auth } from '@clerk/nextjs/server'

export async function newPost(formData: FormData) {
  const currentUser = auth()

  if (!currentUser) {
    return { message: 'Unauthenticated', status: 401 }
  }

  console.log(`Title ${formData.get('post-title')}`)
  return ''
}
