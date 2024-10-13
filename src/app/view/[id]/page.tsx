'use server'

import type { Comment } from '@prisma/client'
import { notFound } from 'next/navigation'
import type { CustomUserType } from '~/lib/types'
import { getCommentsOfPost } from '~/server/comment-actions'
import { getUserById } from '~/server/general-actions'
import { getPostData } from '~/server/post-actions'
import CommentInputBox from './_components/CommentInputBox'
import DisplayCounters from './_components/DisplayCounters'
import ImageCarousel from './_components/ImageCarousel'
import UserProfile from './_components/UserProfile'
import ViewComments from './_components/ViewComments'

type Props = {
  params: { id: string }
}

export default async function ViewPostContent({ params }: Props) {
  const { id: postId } = params
  const { status: postStatus, message: postData } = await getPostData(postId)
  if (postStatus === 404) {
    return notFound()
  }

  const { status: authorStatus, message: authorData } = await getUserById(
    postData.authorId,
  )
  if (authorStatus === 404) {
    return notFound()
  }

  const { message: commentData } = await getCommentsOfPost(postId)

  return (
    <div className="m-4">
      <UserProfile userData={authorData} />
      <ImageCarousel imageUrls={postData.imageUrls} />
      <section className="my-2">
        <p className="text-lg">{postData.title}</p>
        <p className="text-base">{postData.description}</p>
      </section>
      <DisplayCounters
        likeCounter={postData.likeCounter}
        dislikeCounter={postData.dislikeCounter}
        numberOfComments={postData.commentCounter}
        postId={postData.id}
      />
      <CommentInputBox postId={postData.id} />
      <ViewComments
        initialComments={
          commentData as (Comment & {
            authorData: CustomUserType
          })[]
        }
      />
    </div>
  )
}
