'use client'

import type { Post } from '@prisma/client'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import DisplayCounters from '~/components/DisplayCounters'
import ImageCarousel from '~/components/ImageCarousel'
import UserProfile from '~/components/UserProfile'
import type { CustomPostType } from '~/lib/types'
import { getListOfPosts } from '~/server/post-actions'

function Post({ post }: { post: CustomPostType }) {
  return (
    <div className="mt-2">
      <UserProfile userData={post.authorData} />
      <ImageCarousel imageUrls={post.imageUrls} />
      <section className="my-2">
        <p className="text-lg">{post.title}</p>
        <p className="text-base">{post.description}</p>
      </section>
      <DisplayCounters
        likeCounter={post.likeCounter}
        dislikeCounter={post.dislikeCounter}
        numberOfComments={post.commentCounter}
        redirectUser={true}
        postId={post.id}
      />
    </div>
  )
}

export default function DisplayPosts({
  initialPostData,
  search = '',
}: { initialPostData: CustomPostType[]; search?: string }) {
  const [posts, setPosts] = useState(initialPostData)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    setPosts(initialPostData)
  }, [initialPostData])

  return (
    <div className="mx-2 border-b-2 max-h-screen border-base-100 flex flex-col gap-2 relative">
      <div className="overflow-auto no-scrollbar">
        <InfiniteScroll
          className="no-scrollbar flex flex-col gap-2"
          dataLength={posts.length}
          hasMore={hasMore}
          next={async () => {
            const cursor = posts[posts.length - 1]?.id
            const { status, message } = await getListOfPosts(cursor, search)

            if (status !== 200) {
              setHasMore(false)
              // toast.error('Unable to fetch more posts')
            }
            if (JSON.stringify(posts) !== JSON.stringify(message)) {
              setPosts([...posts, ...(message as CustomPostType[])])
            } else {
              setHasMore(false)
            }
          }}
          loader={
            <div className="flex flex-col gap-4 mx-4">
              <div className="flex flex-row gap-4">
                <div className="skeleton h-11 w-11 shrink-0 rounded-full"></div>
                <div className="flex flex-col gap-4">
                  <div className="skeleton h-4 w-20"></div>
                  <div className="skeleton h-3 w-28"></div>
                </div>
              </div>
              <div className="skeleton h-72 w-full shrink-0 rounded-md"></div>
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
