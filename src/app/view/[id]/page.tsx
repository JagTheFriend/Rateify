'use server'

import { getPostData } from '~/server/actions'

type Props = {
  params: { id: string }
}

export default async function ViewPostContent({ params }: Props) {
  const { id: postId } = params
  const postData = await getPostData(postId)
  return <>{params.id}</>
}
