'use server'

type Props = {
  params: { id: string }
}

export default async function ViewPostContent({ params }: Props) {
  const { id: postId } = params
  return <>{params.id}</>
}
