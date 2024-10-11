'use server'

import Error from 'next/error'
import { getPostData } from '~/server/actions'

type Props = {
  params: { id: string }
}

export default async function ViewPostContent({ params }: Props) {
  const { id: postId } = params
  const { status, message } = await getPostData(postId)

  if (status === 404) {
    return <Error statusCode={status} />
  }

  return <></>
}
