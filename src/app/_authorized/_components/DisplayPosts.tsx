'use client'

import type { Post } from '@prisma/client'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import type { CustomUserType } from '~/lib/types'
import { getListOfPosts } from '~/server/post-actions'
import type { CustomPostType } from './type'

function Post({ post }: { post: Post & { authorData: CustomUserType } }) {
  return <>{post.id}</>
}

export default function DisplayPosts({
  initialPostData,
}: { initialPostData: CustomPostType[] }) {
  const [posts, setPosts] = useState(initialPostData)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    setPosts(initialPostData)
  }, [initialPostData])

  return (
    <div className="mt-5 border-b-2 max-h-screen border-base-100 flex flex-col gap-2 relative">
      <div className="overflow-auto no-scrollbar">
        <InfiniteScroll
          className="no-scrollbar flex flex-col gap-2"
          dataLength={posts.length}
          hasMore={hasMore}
          next={async () => {
            const cursor = posts[posts.length - 1]?.id
            const { status, message } = await getListOfPosts(cursor)

            if (status !== 200) {
              setHasMore(false)
              // toast.error('Unable to fetch more posts')
            }
            setPosts([...posts, ...(message as CustomPostType[])])
          }}
          loader={
            <div className="flex items-center gap-4">
              <div className="skeleton h-11 w-11 shrink-0 rounded-full"></div>
              <div className="flex flex-col gap-4">
                <div className="skeleton h-4 w-20"></div>
                <div className="skeleton h-3 w-28"></div>
              </div>
            </div>
          }
        >
          {posts.map((post) => (
            <Post key={Math.random()} post={post} />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  )
}
