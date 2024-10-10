'use client'

import { toast } from 'sonner'
import { MAXIMUM_NUMBER_OF_FILES } from './data'

export default function FileInput() {
  return (
    <section className="m-4">
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-800 bg-gray-700  border-gray-600 hover:border-gray-500"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-400">
              SVG, PNG, or JPG (MAX. {MAXIMUM_NUMBER_OF_FILES} Image)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            multiple
            accept="image/png, image/jpeg, image/svg+xml"
            // allow a maximum of 5 images
            onChange={(e) => {
              const files = e.target.files
              if (files && files.length > MAXIMUM_NUMBER_OF_FILES) {
                toast.warning(
                  `Too Many Images: Maximum ${MAXIMUM_NUMBER_OF_FILES} images allowed`,
                )
                return
              }
            }}
          />
        </label>
      </div>
    </section>
  )
}
