'use client'

import { BackgroundLines } from '~/components/ui/background-lines'

export default function IntroSection() {
  return (
    <section className="flex flex-col items-center justify-center -z-10">
      <BackgroundLines className="flex items-center justify-center w-full flex-col">
        <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-400 to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
          Rateify
        </h2>
        <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-300 text-center">
          Get your pictures rated in seconds!
        </p>
      </BackgroundLines>
    </section>
  )
}
