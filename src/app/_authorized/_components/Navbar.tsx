'use client'

import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'

export default function NavbarComponent() {
  return (
    <section className="sticky top-0 z-50 opacity-90">
      <div className="navbar bg-base-200">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link href="/new">New Post</Link>
              </li>
              <li>
                <Link href="/search">Search Post</Link>
              </li>
            </ul>
          </div>
          <Link className="btn btn-ghost text-xl" href="/">
            Rateify
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/new">New Post</Link>
            </li>
            <li>
              <Link href="/search">Search Post</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <UserButton />
        </div>
      </div>
    </section>
  )
}
