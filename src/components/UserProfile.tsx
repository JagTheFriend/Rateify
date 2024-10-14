'use client'

import Link from 'next/link'
import type { CustomUserType } from '~/lib/types'

export default function UserProfile({
  userData,
}: { userData: CustomUserType }) {
  return (
    <section className="mb-2">
      <Link
        href={`/profile/${userData.id}`}
        className="flex flex-row items-center gap-2 cursor-pointer"
      >
        <div className="avatar">
          <div className="w-9 rounded-full">
            <img src={userData.image} />
          </div>
        </div>
        <p className="text-lg border-b font-semibold">{userData.username}</p>
      </Link>
    </section>
  )
}
