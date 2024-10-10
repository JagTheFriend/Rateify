import EditImage from './_components/EditImage'
import FileInput from './_components/FileInput'

export default function NewPostPage() {
  return (
    <>
      <FileInput />
      <EditImage />
      <section className="flex justify-center mt-4">
        <div className="w-[80%] flex-col justify-center items-center">
          <div className="border-b-2 mb-4 border-b-violet-500" />
          <div className="flex justify-center">
            <button className="px-8 py-2 rounded-md bg-teal-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-teal-500">
              Continue →
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
