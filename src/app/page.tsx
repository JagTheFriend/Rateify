'use client'

import { SignedIn, SignedOut } from '@clerk/nextjs'
import LandingPageAuthorized from './_authorized/page'
import LandingPageUnauthorized from './_unauthorized/page'

export default function Page() {
  return (
    <>
      <SignedOut>
        <LandingPageUnauthorized />
      </SignedOut>
      <SignedIn>
        <LandingPageAuthorized />
      </SignedIn>
    </>
  )
}
