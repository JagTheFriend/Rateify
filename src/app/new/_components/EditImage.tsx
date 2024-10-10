'use client'

import { useAtomValue } from 'jotai'
import { Carousel } from 'react-responsive-carousel'
import { UploadedFiles } from './data'

import 'react-responsive-carousel/lib/styles/carousel.min.css'

export default function EditImage() {
  const uploadedFiles = useAtomValue(UploadedFiles)

  return (
    <section className="mx-4">
      <Carousel
        showArrows={true}
        // onChange={onChange}
        // onClickItem={onClickItem}
        // onClickThumb={onClickThumb}
      >
        <div>
          <img src={URL.createObjectURL(uploadedFiles?.[0] ?? new Blob())} />
        </div>
        <div>
          <img src={URL.createObjectURL(uploadedFiles?.[1] ?? new Blob())} />
        </div>
      </Carousel>
    </section>
  )
}
