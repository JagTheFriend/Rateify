'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import type { CustomPostType } from '~/lib/types'
import { getListOfPosts } from '~/server/post-actions'
import DisplayPosts from '../_authorized/_components/DisplayPosts'

export default function SearchForPost() {
  const [currentPosts, setCurrentPosts] = useState<CustomPostType[]>([])

  return (
    <>
      <section className="mx-5 mt-2 justify-center items-center">
        <form
          className="flex flex-row gap-2 "
          action={async (formData: FormData) => {
            const { status, message } = await getListOfPosts(
              undefined,
              formData.get('search-content') as string,
            )
            if (status !== 200) {
              toast.error('Server Error Occurred. Try again after sometime')
              return
            }
            setCurrentPosts(message as CustomPostType[])
          }}
        >
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="Search"
              name="search-content"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
          <button
            type="submit"
            className="px-4 py-2 rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
          >
            Search
          </button>
        </form>
      </section>
      <section>
        <DisplayPosts initialPostData={currentPosts} />
      </section>
    </>
  )
}
