import type { Metadata } from 'next'
import Footer from '~/components/footer'

export const metadata: Metadata = {
  title: 'About Rateify',
  description: 'Created by JagTheFriend',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <main className="flex flex-col">{children}</main>
      <Footer />
    </>
  )
}
