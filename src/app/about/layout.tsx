import type { Metadata } from 'next'
import Footer from '~/components/footer'
import Navbar from '../_unauthorized/_components/Navbar'

export const metadata: Metadata = {
  title: 'About Rateify',
  description: 'About Rateify. Created by JagTheFriend',
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
