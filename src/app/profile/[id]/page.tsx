import { getUserById } from '~/server/general-actions'

export default async function UserProfile({
  params,
}: { params: { id: string } }) {
  const { id: userId } = params
  const userDetails = await getUserById(userId)
  return <>{params.id}</>
}
