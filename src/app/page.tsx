'use client'

import { SignedOut } from '@clerk/nextjs'
import LandingPage from './(unauthorized)/page'

export default function Page() {
  return (
    <>
      <SignedOut>
        <LandingPage />
      </SignedOut>
    </>
  )
}
