'use client'

import { useAtomValue } from 'jotai'
import { UploadedFiles } from './data'

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
      </section>

      <dialog id="post_details" className="modal">
        <div className="modal-box w-full">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg mb-5">Details About This Post:</h3>
          <div className="flex flex-col gap-5">
            <label className="input input-bordered flex items-center gap-2">
              Title
              <input
                type="text"
                className="grow"
                placeholder="Title of this post"
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              Short Description
              <input
                type="text"
                className="grow"
                placeholder="Short Description of this post"
              />
            </label>
          </div>
          <div className="flex flex-row gap-5 justify-center mt-5">
            <button className="btn btn-info rounded-lg">Post</button>
          </div>
        </div>
      </dialog>
    </>
  )
}
