'use client'

type Props = {
  likeCounter: number
  dislikeCounter: number
  numberOfComments: number
}

function LikeButton({ likeCounter }: Partial<Props>) {
  return (
    <button className="shadow-[0_0_0_3px_#000000_inset] px-2 py-2 bg-transparent border border-white text-white rounded-lg transform hover:-translate-y-1 transition duration-400 flex flex-row gap-2 items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
      </svg>
      {likeCounter}
    </button>
  )
}

function DislikeButton({ dislikeCounter }: Partial<Props>) {
  return (
    <button className="shadow-[0_0_0_3px_#000000_inset] px-2 py-2 bg-transparent border border-white text-white rounded-lg transform hover:-translate-y-1 transition duration-400 flex flex-row gap-2 items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path>
      </svg>
      {dislikeCounter}
    </button>
  )
}

function NumberOfComments({ numberOfComments }: Partial<Props>) {
  return (
    <button className="shadow-[0_0_0_3px_#000000_inset] px-2 py-2 bg-transparent border border-white text-white rounded-lg transform hover:-translate-y-1 transition duration-400 flex flex-row gap-2 items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
      </svg>
      {numberOfComments}
    </button>
  )
}

export default function DisplayCounters(propData: Props) {
  return (
    <section className="flex flex-row gap-4 mt-4">
      <LikeButton likeCounter={propData.likeCounter} />
      <DislikeButton dislikeCounter={propData.dislikeCounter} />
      <NumberOfComments numberOfComments={propData.numberOfComments} />
    </section>
  )
}
