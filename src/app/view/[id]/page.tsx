'use server'

import { notFound } from 'next/navigation'
import { getPostData, getUserById } from '~/server/actions'
import ImageCarousel from './_components/ImageCarousel'

type Props = {
  params: { id: string }
}

export default async function ViewPostContent({ params }: Props) {
  const { id: postId } = await params
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
    <>
      <ImageCarousel imageUrls={postData.imageUrls} />
    </>
  )
}
