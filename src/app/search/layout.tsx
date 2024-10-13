import type { Metadata } from 'next'
import Navbar from '~/app/_authorized/_components/Navbar'
import Footer from '~/components/footer'

export const metadata: Metadata = {
  title: 'Search for post created by user on Rateify',
  description: 'View post created by user on Rateify',
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
