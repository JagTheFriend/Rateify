'use server'

import { notFound } from 'next/navigation'
import { formatNumber } from '~/lib/utils'
import { getCommentsOfPost } from '~/server/comment-actions'
import { getUserById } from '~/server/general-actions'
import { getPostData } from '~/server/post-actions'
import CommentBox from './_components/CommentBox'
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
      <DisplayCounters
        likeCounter={formatNumber(postData.likeCounter)}
        dislikeCounter={formatNumber(postData.dislikeCounter)}
        numberOfComments={formatNumber(postData.commentCounter)}
        postId={postData.id}
      />
      <CommentBox postId={postData.id} />
      <ViewComments comments={commentData} />
    </div>
  )
}
