import type { Post } from '@prisma/client'

export type CustomUserType = {
  id: string
  username: string
  email: string
  image: string
  dateJoined: number
}

export type ReturnTypeOfPost = Post & {
  imageUrls: string[]
}
export type CustomPostType = Post & {
  authorData: CustomUserType
  imageUrls: string[]
}
