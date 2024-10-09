'use client'

import { TypewriterEffectSmooth } from '~/components/ui/typewriter-effect'

const words = [
  {
    text: 'About',
  },
  {
    text: 'Rateify.',
    className: 'text-blue-500 dark:text-blue-500',
  },
]

export default function TypewriterHeading() {
  return (
    <section>
      <div className="flex flex-col items-center text-xl">
        <TypewriterEffectSmooth
          words={words}
          className="border-b-2 border-violet-500"
        />
      </div>
    </section>
  )
}
