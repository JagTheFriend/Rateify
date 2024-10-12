'use client'

import type { Comment } from '@prisma/client'
import { toast } from 'sonner'
import { formatNumber } from '~/lib/utils'
import { likeComment } from '~/server/comment-actions'

function Comment({ comment }: { comment: Comment }) {
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-row gap-2">
        <div className="avatar">
          <div className="w-11 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">SampleUserName</p>
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

          if (status === 503) {
            toast.error('Server Error Occurred. Try again later')
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

export default function ViewComments({ comments }: { comments: Comment[] }) {
  return (
    <section className="mt-5 border-b-2 border-base-100 flex flex-col gap-2">
      {comments.map((comment) => (
        <Comment comment={comment} key={Math.random()} />
      ))}
    </section>
  )
}
