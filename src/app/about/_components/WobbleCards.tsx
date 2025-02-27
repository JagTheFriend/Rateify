import { WobbleCard } from '~/components/ui/wobble-card'

export default function WobbleCardComponent() {
  return (
    <section className="px-4 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
        <WobbleCard
          containerClassName="col-span-1 lg:col-span-2 bg-pink-800 min-h-[310px]"
          className=""
        >
          <div className="max-w-xs">
            <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              Instant Ratings
            </h2>
            <p className="mt-4 text-left  text-base/6 text-neutral-200">
              Rateify enables users to post photos and receive real-time ratings
              from the community, providing immediate feedback to gauge appeal.
              The fast-paced system keeps engagement high and motivates users to
              enhance their photography skills.
            </p>
          </div>
        </WobbleCard>
        <WobbleCard containerClassName="col-span-1 min-h-[340px]">
          <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Engaging Community
          </h2>
          <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
            Join a vibrant community of photography enthusiasts where you can
            rate and comment on others' images. Connect with fellow users,
            participate in challenges, and find inspiration from shared
            creativity.
          </p>
        </WobbleCard>
        <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[330px]">
          <div className="max-w-sm">
            <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              Competitive Fun
            </h2>
            <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
              Experience the thrill of climbing the ranks with Rateify's ranking
              system, which highlights top-rated photos. Engage in rating
              battles and daily challenges to showcase your skills while
              competing for the top spot.
            </p>
          </div>
        </WobbleCard>
      </div>
    </section>
  )
}
