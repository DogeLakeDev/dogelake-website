"use client"

import { TextAnimate } from "@/components/ui/text-animate"
import VideoBackground from "@/components/video-background"

export default function Hero() {
  return (
    <section className="relative h-[calc(100vh-3rem)]">
      <div className="relative w-full h-full">
        <VideoBackground
          videos={["/videos/bg-1.mp4"]}
          className="absolute inset-0"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 via-30%" />

        <div className="absolute bottom-0 text-left px-8 py-8 md:px-14 md:py-14 lg:px-16 lg:py-20">
          <div className="mx-auto max-w-5xl">
            <TextAnimate
              animation="blurInUp"
              by="character"
              as="h3"
              once
              className="text-xs sm:text-sm md:text-base font-bold text-slate-50 select-none tracking-normal whitespace-nowrap"
            >
              Minecraft:Bedrock Edition 服务器
            </TextAnimate>
            <TextAnimate
              animation="blurInUp"
              by="character"
              as="h1"
              once
              className="mt-2 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white select-none tracking-normal whitespace-nowrap"
            >
              东方犬明湖
            </TextAnimate>
          </div>
        </div>
      </div>
    </section>
  )
}
