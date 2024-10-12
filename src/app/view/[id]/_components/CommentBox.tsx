'use client'

import { toast } from 'sonner'
import { postComment } from '~/server/comment-actions'

export default function CommentBox() {
  return (
    <section className="flex flex-row gap-2 mt-5">
      <form
        action={async (formData) => {
          formData.append('postId', '')
          const { status } = await postComment(formData)
          if (status === 401) {
            toast.error('Unauthenticated')
            return
          }

          if (status === 503) {
            toast.error('Post not found!')
            return
          }

          if (status === 200) {
            toast.success('Comment Posted!')
            return
          }
        }}
      >
        <input
          name="commentContent"
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full"
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
