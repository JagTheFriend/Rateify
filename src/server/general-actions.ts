'use server'

import { clerkClient } from '@clerk/nextjs/server'
import { z } from 'zod'
import { type CustomUserType, SERVER_ERROR_MESSAGE } from '~/lib/types'
import { checkAuthentication, getUserDetail } from '~/lib/utils'

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
    checkAuthentication()
    const user = await clerkClient().users.getUser(userId)
    const details = getUserDetail(user)
    return { status: 200, message: details }
  } catch (error) {
    return SERVER_ERROR_MESSAGE
  }
}
