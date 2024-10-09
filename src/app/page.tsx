'use client'

import { SignedOut } from '@clerk/nextjs'
import Footer from '~/components/footer'
import FeaturesCards from './_components/FeaturesCards'
import IntroSection from './_components/Intro'
import NavbarComponent from './_components/Navbar'
import SignUpSection from './_components/SignUp'

export default function HomePage() {
  return (
    <>
      <SignedOut>
        <main className="flex flex-col">
          <NavbarComponent />
          <IntroSection />
          <FeaturesCards />
          <SignUpSection />
        </main>
        <Footer />
      </SignedOut>
    </>
  )
}
