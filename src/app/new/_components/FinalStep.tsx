'use client'

import { useAtomValue } from 'jotai'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { newPost } from '~/server/post-actions'
import { UploadedFiles } from './data'

function MetadataForm() {
  const uploadedFiles = useAtomValue(UploadedFiles)
  const { push } = useRouter()

  return (
    <form
      action={async (formData: FormData) => {
        uploadedFiles.forEach((file) => {
          formData.append('image', file)
        })
        const { message, status } = await newPost(formData)

        if (status !== 200) {
          toast.error('Server Error Occurred. Try again after sometime')
        } else {
          toast.success('Created new post!')
          push(`/view/${message}`)
        }
      }}
    >
      <div className="flex flex-col gap-5">
        <label className="input input-bordered flex items-center gap-2">
          Title
          <input
            required
            name="post-title"
            type="text"
            className="grow"
            placeholder="Title of this post"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Description
          <input
            required
            name="post-description"
            type="text"
            className="grow"
            placeholder="Short Description of this post"
          />
        </label>
      </div>
      <div className="flex flex-row gap-5 justify-center mt-5">
        <button type="submit" className="btn btn-info rounded-lg">
          Post
        </button>
      </div>
    </form>
  )
}

function Dialog() {
  return (
    <dialog id="post_details" className="modal">
      <div className="modal-box w-full">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg mb-5">Details About This Post:</h3>
        <MetadataForm />
      </div>
    </dialog>
  )
}

export default function FinalStep() {
  const uploadedFiles = useAtomValue(UploadedFiles)

  return (
    <>
      <section className="flex justify-center mt-4">
        <div className="w-[80%] flex-col justify-center items-center">
          <div
            className={`border-b-2 mb-4 ${uploadedFiles.length === 0 ? 'border-b-gray-500' : 'border-b-violet-500'}`}
          />
          <div className="flex justify-center">
            <button
              disabled={uploadedFiles.length === 0}
              onClick={() =>
                (
                  document.getElementById('post_details') as HTMLDialogElement
                ).showModal()
              }
              className={`px-8 py-2 rounded-md
                ${
                  uploadedFiles.length !== 0
                    ? 'bg-teal-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-teal-500'
                    : 'btn'
                }
                `}
            >
              Continue →
            </button>
          </div>
        </div>
        <Dialog />
      </section>
    </>
  )
}
