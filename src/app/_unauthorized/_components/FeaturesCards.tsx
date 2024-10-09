'use client'

import { HoverEffect } from '~/components/ui/card-hover-effect'

const projects = [
  {
    title: 'Easy Interaction',
    description:
      "It's simple and fun to rate others' photos, creating a fast and enjoyable way to engage with the community.",
  },
  {
    title: 'Discover Popular Trends',
    description:
      'By viewing top-rated photos, you can stay on top of trends and gain inspiration for their next post.',
  },
  {
    title: 'Personalized Insights',
    description:
      'Get tailored feedback on your photos based on user preferences and trends.',
  },
]

export default function FeaturesCards() {
  return (
    <section className="max-w-5xl mx-auto px-8">
      <HoverEffect items={projects} />
    </section>
  )
}
