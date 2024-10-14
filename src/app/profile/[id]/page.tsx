import DisplayPosts from '~/app/_authorized/_components/DisplayPosts'
import type { CustomPostType } from '~/lib/types'
import { getUserById } from '~/server/general-actions'
import { getListOfPosts } from '~/server/post-actions'

export default async function UserProfile({
  params,
}: { params: { id: string } }) {
  const { id: userId } = params
  const userData = await getUserById(userId)
  const posts = await getListOfPosts(undefined, '', userId)

  return (
    <>
      <section className="py-2 mx-2 border-base-300 border-b flex flex-row items-center justify-center gap-2">
        <div className="avatar">
          <div className="w-10 rounded-full">
            <img src={userData.message.image} />
          </div>
        </div>
        <p className="text-xl font-semibold">{userData.message.username}</p>
      </section>
      <DisplayPosts initialPostData={posts.message as CustomPostType[]} />
    </>
  )
}
