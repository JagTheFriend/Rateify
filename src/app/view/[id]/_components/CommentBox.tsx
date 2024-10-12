'use client'

import { useRef } from 'react'
import { toast } from 'sonner'
import { postComment } from '~/server/comment-actions'

export default function CommentBox({ postId }: { postId: string }) {
  const formRef = useRef<HTMLFormElement>(null)
  return (
    <section className="mt-5">
      <form
        ref={formRef}
        className="w-full flex flex-row gap-2"
        action={async (formData) => {
          formData.append('postId', postId)
          const { status } = await postComment(formData)

          if (status === 503) {
            toast.error('Server Error')
            return
          }

          if (status === 200) {
            toast.success('Comment Posted')
            formRef.current?.reset()
            return
          }
        }}
      >
        <input
          name="commentContent"
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          required
        />
        <button className="btn btn-ghost" type="submit">
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
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>
    </section>
  )
}
