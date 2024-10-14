'use client'

import { useRef, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader

export default function ImageCarousel({ imageUrls }: { imageUrls: string[] }) {
  const [isLoading, setIsLoading] = useState(true)
  const counter = useRef(0)

  const isImageLoaded = () => {
    counter.current += 1
    if (counter.current >= imageUrls.length) {
      setIsLoading(false)
    }
  }

  return (
    <section>
      <Carousel
        autoPlay
        infiniteLoop
        // dynamicHeight
        showArrows={true}
        showStatus={false}
        showThumbs={false}
      >
        {imageUrls.map((url) => (
          <div key={Math.random()}>
            <img
              src={url}
              onLoad={() => isImageLoaded()}
              className={`${isLoading ? 'hidden' : ''}`}
            />
            {isLoading && (
              <div className="flex flex-col gap-4 mx-4">
                <div className="skeleton h-72 w-full shrink-0 rounded-md"></div>
              </div>
            )}
          </div>
        ))}
      </Carousel>
    </section>
  )
}
