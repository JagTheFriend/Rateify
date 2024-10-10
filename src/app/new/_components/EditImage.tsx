'use client'

import { useAtomValue } from 'jotai'
import { Carousel } from 'react-responsive-carousel'
import { UploadedFiles } from './data'

import { useState } from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import ActionButtons from './ActionButtons'

export default function EditImage() {
  const uploadedFiles = useAtomValue(UploadedFiles)
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <section className="mx-4">
      {uploadedFiles?.length && uploadedFiles.length >= 1 ? (
        <>
          <Carousel showArrows={true} onChange={(e) => setCurrentIndex(e)}>
            {uploadedFiles.map((file) => (
              <div key={Math.random()}>
                <img src={URL.createObjectURL(file as File)} />
              </div>
            ))}
          </Carousel>
          <ActionButtons currentIndex={currentIndex} />
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
