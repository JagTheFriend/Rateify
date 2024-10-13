import type { Post } from '@prisma/client'
import type { CustomUserType } from '~/lib/types'

export type CustomPostType = Post & { authorData: CustomUserType }
