import type { Metadata } from 'next'
import Footer from '~/components/footer'
import Navbar from '../_unauthorized/_components/Navbar'

export const metadata: Metadata = {
  title: 'Post a new image on Rateify',
  description: 'Post a new image on Rateify',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="flex flex-col h-screen">
      <div className="flex-grow">
        <Navbar />
        {children}
      </div>
      <Footer />
    </main>
  )
}
