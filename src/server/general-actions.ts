'use server'

import { clerkClient } from '@clerk/nextjs/server'
import type { CustomUserType } from '~/lib/types'
import { getUserDetail } from '~/lib/utils'

export async function getUserById(userId: string): Promise<{
  status: 404 | 200
  message: CustomUserType
}> {
  try {
    const user = await clerkClient().users.getUser(userId)
    const details = getUserDetail(user)
    return { status: 200, message: details }
  } catch (error) {
    return {
      status: 404,
      message: {} as CustomUserType,
    }
  }
}
