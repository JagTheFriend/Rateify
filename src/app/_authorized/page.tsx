'use client'

import Footer from '~/components/footer'
import NavbarComponent from './_components/Navbar'

export default function LandingPageAuthorized() {
  return (
    <main className="flex flex-col h-screen">
      <div className="flex-grow">
        <NavbarComponent />
      </div>
      <Footer />
    </main>
  )
}
