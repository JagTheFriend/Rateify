'use client'

import FeaturesCards from './_components/FeaturesCards'
import IntroSection from './_components/Intro'
import NavbarComponent from './_components/Navbar'

export default function HomePage() {
  return (
    <main className="flex flex-col">
      <NavbarComponent />
      <IntroSection />
      <FeaturesCards />
    </main>
  )
}
