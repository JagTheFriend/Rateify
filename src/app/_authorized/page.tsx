'use server'

import Footer from '~/components/footer'
import { getListOfPosts } from '~/server/post-actions'
import DisplayPosts from './_components/DisplayPosts'
import NavbarComponent from './_components/Navbar'
import type { CustomPostType } from './_components/type'

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
