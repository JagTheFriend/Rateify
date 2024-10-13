'use client'

import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader

export default function ImageCarousel({ imageUrls }: { imageUrls: string[] }) {
  console.log(imageUrls)
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
            <img src={url} />
          </div>
        ))}
      </Carousel>
    </section>
  )
}
