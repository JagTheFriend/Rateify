'use client'

import type { Comment } from '@prisma/client'
import { useEffect, useOptimistic, useState, useTransition } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { toast } from 'sonner'
import type { CustomUserType } from '~/lib/types'
import { formatNumber } from '~/lib/utils'
import {
  getCommentsOfPost,
  likeOrDislikeComment,
} from '~/server/comment-actions'

function LikeButton({ comment }: { comment: Comment }) {
  const [_isPending, startTransition] = useTransition()
  const [optimisticLikeCounter, updateOptimisticLike] = useOptimistic(
    comment.likeCounter,
    (currentState: number, optimisticValue: number) => {
      return currentState + optimisticValue
    },
  )

  return (
    <button
      className="flex flex-row gap-2"
      onClick={async () => {
        const icon = document.getElementById(comment.id + 'likeIcon')

        if (icon?.getAttribute('fill') === 'red') {
          startTransition(() => updateOptimisticLike(-1))

          const { status } = await likeOrDislikeComment(comment.id ?? '', true)
          if (status !== 200) {
            return toast.error(
              'Server Error Occurred. Try again after sometime',
            )
          }

          icon.setAttribute('fill', 'none')
          return
        }

        startTransition(() => updateOptimisticLike(1))
        const { status } = await likeOrDislikeComment(comment.id ?? '')
        if (status !== 200) {
          return toast.error('Server Error Occurred. Try again after sometime')
        }
        icon?.setAttribute('fill', 'red')
      }}
    >
      <svg
        id={comment.id + 'likeIcon'}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="red"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
      {formatNumber(optimisticLikeCounter)}
    </button>
  )
}

function Comment({
  comment,
  authorDetail,
}: { comment: Comment; authorDetail: CustomUserType }) {
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-row gap-2">
        <div className="avatar">
          <div className="w-11 rounded-full">
            <img
              src={authorDetail.image}
              alt={`${authorDetail.username}'s profile image`}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">{authorDetail.username}</p>
          {comment.content}
        </div>
      </div>
      <LikeButton comment={comment} />
    </div>
  )
}

export default function ViewComments({
  initialComments,
}: { initialComments: (Comment & { authorData: CustomUserType })[] }) {
  const [comments, setComments] = useState(initialComments)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    setComments(initialComments)
  }, [initialComments])

  return (
    <section className="mt-5 border-b-2 max-h-screen border-base-100 flex flex-col gap-2 relative">
      <div className="overflow-auto no-scrollbar">
        <InfiniteScroll
          className="no-scrollbar flex flex-col gap-2"
          dataLength={comments.length} //This is important field to render the next data
          next={async () => {
            const cursor = comments[comments.length - 1]?.id
            const { status, message } = await getCommentsOfPost(
              comments[comments.length - 1]?.postId ?? '',
              cursor,
            )

            if (status !== 200) {
              setHasMore(false)
              // toast.error('Unable to fetch more comments')
            }
            setComments([...comments, ...message])
          }}
          hasMore={hasMore}
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
          {comments.map((comment) => (
            <Comment
              comment={comment}
              key={Math.random()}
              authorDetail={comment.authorData}
            />
          ))}
        </InfiniteScroll>
      </div>
    </section>
  )
}
