import { notFound } from 'next/navigation'
import DisplayPosts from '~/app/_authorized/_components/DisplayPosts'
import type {
  CustomPostType,
  CustomUserType,
  ReturnTypeOfPost,
} from '~/lib/types'
import { getUserById } from '~/server/general-actions'
import { getListOfPosts } from '~/server/post-actions'

export default async function UserProfile({
  params,
}: { params: { id: string } }) {
  const { id: userId } = params
  const { status: userStatus, message: userMessage } = await getUserById(userId)
  const { status: postStatus, message: postMessage } = await getListOfPosts(
    undefined,
    '',
    userId,
  )

  if (userStatus !== 200 || postStatus !== 200) {
    return notFound()
  }

  const userData = userMessage as CustomUserType
  const postData = postMessage as ReturnTypeOfPost[]

  return (
    <>
      <section className="py-2 mx-2 border-base-300 border-b flex flex-row items-center justify-center gap-2">
        <div className="avatar">
          <div className="w-10 rounded-full">
            <img src={userData.image} />
          </div>
        </div>
        <p className="text-xl font-semibold">{userData.username}</p>
      </section>
      <DisplayPosts initialPostData={postData as CustomPostType[]} />
    </>
  )
}
