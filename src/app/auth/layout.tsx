import type { Metadata } from 'next'
import Footer from '~/components/footer'
import Navbar from '../_components/Navbar'

export const metadata: Metadata = {
  title: 'Sign-in/Register for Rateify',
  description: 'Authentication page for Rateify',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <main className="flex flex-col h-screen">
        <Navbar />
        {children}
      </main>
      <Footer />
    </>
  )
}
