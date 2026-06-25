import { FocusCards } from "@/components/ui/focus-cards"

const videos = [
  { title: "服务器宣传片", src: "/videos/trailer-1.mp4" },
  { title: "建筑巡礼", src: "/videos/tour-1.mp4" },
]

const focusCards = [
  { title: "主城俯瞰", src: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80" },
  { title: "红石机器", src: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80" },
  { title: "建筑作品", src: "https://images.unsplash.com/photo-1552820728-8b83bb6b2f1b?w=800&q=80" },
  { title: "集体活动", src: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80" },
  { title: "服务器庆典", src: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&q=80" },
  { title: "自然风光", src: "https://images.unsplash.com/photo-1494500764479-0c8f07f2b6b9?w=800&q=80" }
]

export default function Gallery() {
  return (
    <section className="bg-black">
      {/* 宣传视频 */}
      <div className="px-6 pt-16 md:pt-24 md:px-14 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-white font-bold text-[clamp(1.5rem,4vw,3rem)] leading-[0.9] tracking-tighter">
            宣传视频
          </h2>
          <a
            href="/videos"
            className="mt-1 inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-white transition-colors"
          >
            查看所有视频
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
          </a>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {videos.map((video) => (
              <div
                key={video.title}
                className="relative aspect-video overflow-hidden rounded-xl bg-zinc-900"
              >
                <video
                  src={video.src}
                  controls
                  playsInline
                  preload="none"
                  className="h-full w-full object-cover"
                >
                  您的浏览器不支持视频播放。
                </video>
                <div className="absolute bottom-3 left-3 rounded-md bg-black/60 px-2.5 py-1 text-xs text-white backdrop-blur-sm">
                  {video.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 画廊 */}
      <div className="px-6 pt-16 pb-16 md:pt-24 md:pb-24 md:px-14 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-white font-bold text-[clamp(1.5rem,4vw,3rem)] leading-[0.9] tracking-tighter">
            画廊
          </h2>
          <a
            href="/gallery"
            className="mt-1 inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-white transition-colors"
          >
            查看完整画廊
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
          </a>

          <div className="mt-6">
            <FocusCards cards={focusCards} />
          </div>
        </div>
      </div>
    </section>
  )
}
