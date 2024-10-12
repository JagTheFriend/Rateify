'use client'

import type { Comment } from '@prisma/client'
import { toast } from 'sonner'
import type { CustomUserType } from '~/lib/types'
import { formatNumber } from '~/lib/utils'
import { likeComment } from '~/server/comment-actions'

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
      <button
        className="flex flex-row gap-2"
        onClick={async () => {
          const { status } = await likeComment(comment.id)
          if (status === 200) {
            toast.success('Comment Liked')
          }

          if (status !== 200) {
            toast.error('Server Error Occurred. Try again after sometime')
          }
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
        {formatNumber(comment.likeCounter)}
      </button>
    </div>
  )
}

export default function ViewComments({
  comments,
}: { comments: (Comment & { authorData: CustomUserType })[] }) {
  return (
    <section className="mt-5 border-b-2 max-h-screen border-base-100 flex flex-col gap-2 relative">
      <div className="overflow-auto no-scrollbar">
        {comments.map((comment) => (
          <Comment
            comment={comment}
            key={Math.random()}
            authorDetail={comment.authorData}
          />
        ))}
      </div>
    </section>
  )
}
