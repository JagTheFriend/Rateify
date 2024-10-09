'use client'

import { SignedOut } from '@clerk/nextjs'
import LandingPage from './_unauthorized/page'

export default function Page() {
  return (
    <>
      <SignedOut>
        <LandingPage />
      </SignedOut>
    </>
  )
}
