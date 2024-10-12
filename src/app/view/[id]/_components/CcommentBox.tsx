'use client'

export default function CommentBox() {
  return (
    <section className="flex flex-row gap-2 mt-5">
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered w-full"
      />
      <button className="btn btn-ghost">
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
    </section>
  )
}
