import type { User } from '@clerk/nextjs/server'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { CustomUserType } from './types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getUserDetail(user: User): CustomUserType {
  return {
    id: user.id,
    username:
      user.username ??
      user.firstName ??
      user.lastName ??
      user.fullName ??
      'Unknown',
    email: user.emailAddresses[0]?.emailAddress ?? 'unknown',
    image: user.imageUrl,
    dateJoined: user.createdAt,
  }
}
