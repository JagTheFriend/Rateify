'use client'

import { useAtomValue } from 'jotai'
import { Carousel } from 'react-responsive-carousel'
import { UploadedFiles } from './data'

import { useState } from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

export default function EditImage() {
  const uploadedFiles = useAtomValue(UploadedFiles)
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <section className="mx-4">
      {uploadedFiles?.length && uploadedFiles.length >= 1 ? (
        <>
          <Carousel showArrows={true} onChange={(e) => setCurrentIndex(e)}>
            {Array.from(uploadedFiles).map((file, index) => (
              <div key={index + Math.random()}>
                <img src={URL.createObjectURL(file as File)} />
              </div>
            ))}
          </Carousel>
          <div className="flex flex-row gap-4 justify-center">
            <button className="btn rounded-lg btn-info">
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
                <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                <path d="M2 2l7.586 7.586"></path>
                <circle cx="11" cy="11" r="2"></circle>
              </svg>
            </button>
            <button className="btn rounded-lg btn-error text-white">
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
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
            </button>
          </div>
        </>
      ) : (
        <div className="card bg-base-100 text-neutral-content">
          <div className="card-body items-center text-center">
            <p className="text-gray-500">Select an Image to Preview it</p>
          </div>
        </div>
      )}
    </section>
  )
}
