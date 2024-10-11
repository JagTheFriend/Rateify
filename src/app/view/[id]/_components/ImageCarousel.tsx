'use client'

import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader

export default function ImageCarousel({ imageUrls }: { imageUrls: string[] }) {
  return (
    <section>
      <Carousel>
        {imageUrls.map((url) => (
          <div key={Math.random()}>
            <img src={url} />
          </div>
        ))}
      </Carousel>
    </section>
  )
}
