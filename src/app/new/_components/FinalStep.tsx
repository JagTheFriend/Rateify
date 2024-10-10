'use client'

import { useAtomValue } from 'jotai'
import { UploadedFiles } from './data'

export default function FinalStep() {
  const uploadedFiles = useAtomValue(UploadedFiles)

  //   if (!uploadedFiles.length === 0) return null

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
                document.getElementById('post_details')!.showModal()
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
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click on ✕ button to close</p>
        </div>
      </dialog>
    </>
  )
}
