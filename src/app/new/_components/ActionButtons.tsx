'use client'

import { useAtom } from 'jotai'
import { openEditor } from 'react-profile'
import { UploadedFiles } from './data'

import 'react-profile/themes/dark.min.css'

function DeleteButton({ currentIndex }: { currentIndex: number }) {
  const [uploadedFiles, setUploadedFiles] = useAtom(UploadedFiles)

  const removeImage = () => {
    uploadedFiles.splice(currentIndex, 1)
    setUploadedFiles([...uploadedFiles])
  }

  return (
    <button
      className="btn rounded-lg btn-error text-white"
      onClick={() => removeImage()}
    >
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
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        <line x1="10" y1="11" x2="10" y2="17"></line>
        <line x1="14" y1="11" x2="14" y2="17"></line>
      </svg>
    </button>
  )
}

function EditButton({ currentIndex }: { currentIndex: number }) {
  const [uploadedFiles, setUploadedFiles] = useAtom(UploadedFiles)

  const openImageEditor = async () => {
    const { cancel, done, editedImage } = await openEditor({
      src: URL.createObjectURL(uploadedFiles[currentIndex] ?? new Blob()),
    })

    if (cancel || !done) return

    const file = new File([(await editedImage?.getBlob()) ?? ''], 'edited.png')
    uploadedFiles[currentIndex] = file
    setUploadedFiles([...uploadedFiles])
  }

  return (
    <button
      className="btn rounded-lg btn-info"
      onClick={() => openImageEditor()}
    >
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
        <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
        <path d="M2 2l7.586 7.586"></path>
        <circle cx="11" cy="11" r="2"></circle>
      </svg>
    </button>
  )
}

export default function ActionButtons({
  currentIndex,
}: { currentIndex: number }) {
  return (
    <div className="flex flex-row gap-4 justify-center">
      <EditButton currentIndex={currentIndex} />
      <DeleteButton currentIndex={currentIndex} />
    </div>
  )
}
