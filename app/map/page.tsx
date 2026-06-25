"use client"

import { useEffect, useRef, useState } from "react"
import Navigation from "@/components/layouts/navigation"
import MapView, { type MapViewHandle } from "@/components/map/map-view"
import MapSidebar from "@/components/map/map-sidebar"

const ASSETS = "/map/assets"

export default function MapPage() {
  const mapRef = useRef<MapViewHandle>(null)
  const [fs, setFs] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showMarkers, setShowMarkers] = useState(true)

  useEffect(() => {
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href =
      "https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
    document.head.appendChild(link)
    return () => link.remove()
  }, [])

  useEffect(() => {
    const onFs = () => setFs(!!document.fullscreenElement)
    document.addEventListener("fullscreenchange", onFs)
    return () => document.removeEventListener("fullscreenchange", onFs)
  }, [])

  const toggleFullscreen = () => {
    document.fullscreenElement
      ? document.exitFullscreen()
      : document.documentElement.requestFullscreen()
  }

  const centerOn = (x: number, z: number) => {
    mapRef.current?.centerOn(x, z)
  }

  const toggleMarkers = () => {
    const vis = mapRef.current?.toggleMarkers()
    if (vis !== undefined) setShowMarkers(vis)
  }

  return (
    <>
      <style>{`
        @font-face {
          font-family: "Epcxt";
          src: url("${ASSETS}/font/epcxt.ttf");
        }
        @font-face {
          font-family: "Minecraft";
          src: url("${ASSETS}/font/minecraft_font.ttf");
        }
        @font-face {
          font-family: "SmileySans";
          src: url("${ASSETS}/font/SmileySans-Oblique.ttf");
        }
        @font-face {
          font-family: "Unifont";
          src: url("${ASSETS}/font/unifont-15.1.04.otf");
        }
      `}</style>

      <div className="flex flex-col min-h-svh bg-[#1e1f22]" style={{ imageRendering: "pixelated" }}>
        {/* Navigation bar */}
        {!fs && (
          <header className="sticky top-0 z-50 py-3 px-6 bg-black/40 backdrop-blur-md">
            <Navigation />
          </header>
        )}

        {/* Title */}
        {!fs && (
          <div className="flex flex-col items-center pt-8 pb-6 md:pt-10 md:pb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl text-center select-none font-[Epcxt,system-ui] font-normal text-white tracking-wide">
              犬明湖地图站
            </h1>
            <p className="mt-2 text-sm text-zinc-500 font-mono">map.dogelake.cn</p>
          </div>
        )}

        {/* Map area */}
        <div className={`flex-1 flex ${fs ? "" : "justify-center px-4 pb-8"}`}>
          <div
            id="map-container"
            className={`relative ${fs ? "flex-1 m-3" : "w-full max-w-[min(85vh,85vw)] aspect-square"}`}
            style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
          >
            <div
              className="w-full h-full bg-[length:100%_100%] p-[4.5%]"
              style={{ backgroundImage: `url(${ASSETS}/img/map/map_background.png)` }}
            >
              <div className="w-full h-full relative overflow-hidden rounded-sm">
                {/* Sidebar toggle — aligned with zoom - */}
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="absolute top-[50px] right-3 z-20 w-9 h-9 bg-black/50 hover:bg-black/70
                             border border-white/10 rounded-md flex items-center justify-center
                             text-white text-base transition-colors cursor-pointer backdrop-blur-sm"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 12h18M3 6h18M3 18h18" />
                  </svg>
                </button>

                {/* Markers toggle */}
                <button
                  onClick={toggleMarkers}
                  className="absolute top-[88px] right-3 z-10 w-9 h-9 bg-black/50 hover:bg-black/70
                             border border-white/10 rounded-md flex items-center justify-center
                             text-white transition-colors cursor-pointer backdrop-blur-sm"
                  title={showMarkers ? "隐藏标记" : "显示标记"}
                >
                  {showMarkers ? (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                      <path d="M4 4l16 16" />
                    </svg>
                  )}
                </button>

                {/* Fullscreen toggle — aligned with zoom + */}
                <button
                  onClick={toggleFullscreen}
                  className="absolute top-3 right-3 z-10 w-9 h-9 bg-black/50 hover:bg-black/70
                             border border-white/10 rounded-md flex items-center justify-center
                             text-white transition-colors cursor-pointer backdrop-blur-sm"
                >
                  {fs ? (
                    <svg className="text-white w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M8 3v3a2 2 0 0 1-2 2H3m0 0h18M3 8v13m18-13v13" />
                      <path d="M3 3l4 4m14-4l-4 4" />
                      <path d="M8 21v-3a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3" />
                    </svg>
                  ) : (
                    <svg className="text-white w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                    </svg>
                  )}
                </button>

                <MapView ref={mapRef} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <MapSidebar open={sidebarOpen} onToggle={setSidebarOpen} onCenterOn={centerOn} fullscreen={fs} />
    </>
  )
}
