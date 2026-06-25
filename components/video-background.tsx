"use client"

import { useState, useRef, useEffect } from "react"

interface VideoBackgroundProps {
  videos: string[]
  transitionDuration?: number
  className?: string
}

export default function VideoBackground({ videos, transitionDuration = 1500, className }: VideoBackgroundProps) {
  if (videos.length === 1) {
    return <SingleVideo src={videos[0]} className={className} />
  }

  return <MultiVideo videos={videos} transitionDuration={transitionDuration} className={className} />
}

function SingleVideo({ src, className }: { src: string; className?: string }) {
  return (
    <div className={className}>
      <video
        src={src}
        autoPlay
        muted
        playsInline
        loop
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  )
}

function MultiVideo({ videos, transitionDuration, className }: { videos: string[]; transitionDuration: number; className?: string }) {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [nextIdx, setNextIdx] = useState<number | null>(1)
  const [fading, setFading] = useState(false)
  const currentRef = useRef<HTMLVideoElement>(null)
  const nextRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = currentRef.current
    if (!video) return

    const handleEnded = () => {
      const next = (currentIdx + 1) % videos.length
      setNextIdx(next)
      setFading(true)

      setTimeout(() => {
        setCurrentIdx(next)
        setFading(false)
      }, transitionDuration)
    }

    video.addEventListener("ended", handleEnded)
    return () => video.removeEventListener("ended", handleEnded)
  }, [currentIdx, videos.length, transitionDuration])

  useEffect(() => {
    if (fading && nextRef.current) {
      nextRef.current.currentTime = 0
      nextRef.current.play()
    }
  }, [fading])

  return (
    <div className={className}>
      <video
        ref={currentRef}
        src={videos[currentIdx]}
        autoPlay
        muted
        playsInline
        loop={false}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          opacity: fading ? 0 : 1,
          transition: `opacity ${transitionDuration}ms ease-in-out`,
        }}
      />
      {nextIdx !== null && (
        <video
          ref={nextRef}
          src={videos[nextIdx]}
          muted
          playsInline
          loop={false}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: fading ? 1 : 0,
            transition: `opacity ${transitionDuration}ms ease-in-out`,
          }}
        />
      )}
    </div>
  )
}