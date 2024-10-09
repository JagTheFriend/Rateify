import type { Metadata } from 'next'
import Footer from '~/components/footer'
import Navbar from '../_components/Navbar'

export const metadata: Metadata = {
  title: 'Contact Developers of Rateify',
  description: 'Contact Developers of Rateify. Created by JagTheFriend',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <main className="flex flex-col">
        <Navbar />
        {children}
      </main>
      <Footer />
    </>
  )
}
