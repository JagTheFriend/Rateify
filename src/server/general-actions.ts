'use server'

import { auth, clerkClient } from '@clerk/nextjs/server'
import { z } from 'zod'
import { type CustomUserType, SERVER_ERROR_MESSAGE } from '~/lib/types'
import { getUserDetail } from '~/lib/utils'

export async function checkAuthentication() {
  const currentUser = auth()

  if (!currentUser?.userId) {
    throw new Error('Unauthenticated')
  }
  return currentUser
}

const GetUserByIdSchema = z.object({
  userId: z.string().min(1),
})

export async function getUserById(userId: string): Promise<{
  status: 404 | 200 | number
  message: CustomUserType | string
}> {
  try {
    GetUserByIdSchema.parse({
      userId,
    })
    await checkAuthentication()
    const user = await clerkClient().users.getUser(userId)
    const details = getUserDetail(user)
    return { status: 200, message: details }
  } catch (error) {
    return SERVER_ERROR_MESSAGE
  }
}
