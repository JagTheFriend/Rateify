'use server'

import { notFound } from 'next/navigation'
import { formatNumber } from '~/lib/utils'
import { getPostData, getUserById } from '~/server/actions'
import Counters from './_components/DisplayCounters'
import ImageCarousel from './_components/ImageCarousel'
import UserProfile from './_components/UserProfile'

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

  return (
    <div className="m-4">
      <UserProfile userData={authorData} />
      <ImageCarousel imageUrls={postData.imageUrls} />
      <Counters
        likeCounter={formatNumber(postData.likeCounter)}
        dislikeCounter={formatNumber(postData.dislikeCounter)}
        numberOfComments={formatNumber(999)}
      />
    </div>
  )
}
