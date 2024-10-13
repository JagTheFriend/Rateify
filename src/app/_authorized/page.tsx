'use server'

import Footer from '~/components/footer'
import type { CustomPostType } from '~/lib/types'
import { getListOfPosts } from '~/server/post-actions'
import DisplayPosts from './_components/DisplayPosts'
import NavbarComponent from './_components/Navbar'

export default async function LandingPageAuthorized() {
  const posts = await getListOfPosts()

  return (
    <main className="flex flex-col h-screen">
      <div className="flex-grow">
        <NavbarComponent />
        <DisplayPosts initialPostData={posts.message as CustomPostType[]} />
      </div>
      <Footer />
    </main>
  )
}
