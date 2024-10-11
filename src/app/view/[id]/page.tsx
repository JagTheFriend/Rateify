'use server'

import Error from 'next/error'
import { getPostData, getUserById } from '~/server/actions'

type Props = {
  params: { id: string }
}

export default async function ViewPostContent({ params }: Props) {
  const { id: postId } = params
  const { status: postStatus, message: postData } = await getPostData(postId)
  if (postStatus === 404) {
    return <Error statusCode={postStatus} />
  }

  const { status: authorStatus, message: authorData } = await getUserById(
    postData.authorId,
  )
  if (authorStatus === 404) {
    return <Error statusCode={postStatus} />
  }

  return <></>
}
