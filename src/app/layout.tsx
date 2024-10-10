import '~/styles/globals.css'

import { ClerkProvider } from '@clerk/nextjs'
import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: 'Rateify',
  description:
    'A photo-sharing app where users post images and get instant ratings from the community to see who ranks on top. Created by JagTheFriend.',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable}`}>
        <body>
          <Toaster />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
