import { type User, auth } from '@clerk/nextjs/server'
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

export function formatNumber(number: number): string {
  // Use the toLocaleString method to add suffixes to the number
  return number.toLocaleString('en-US', {
    // add suffixes for thousands, millions, and billions
    // the maximum number of decimal places to use
    maximumFractionDigits: 2,
    // specify the abbreviations to use for the suffixes
    notation: 'compact',
    compactDisplay: 'short',
  })
}

export function checkAuthentication() {
  const currentUser = auth()

  if (!currentUser?.userId) {
    throw new Error('Unauthenticated')
  }
  return currentUser
}
