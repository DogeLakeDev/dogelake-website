"use client"

import { useEffect, useState } from "react"

const PROXY = "/api/map-proxy"

interface Landmark { name: string; x: number; z: number; desc?: string; image?: string }

interface ServerStatus {
  online: boolean
  players?: { online: number; max: number }
  version?: string
  motd?: { clean: string[] }
}

interface ChatMsg { t: number; m: string }

interface PlaceMarker {
  x: number; z: number; text?: string; image?: string; imageScale?: number
  imageAnchor?: [number, number]; font?: string; textColor?: string
  offsetX?: number; offsetY?: number
}

interface Props {
  open: boolean
  onToggle: (v: boolean) => void
  onCenterOn: (x: number, z: number) => void
  fullscreen?: boolean
}

// SVG icons
const Icons = {
  server: () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" /><rect x="2" y="14" width="20" height="8" rx="2" ry="2" /><path d="M6 6h.01M6 18h.01" />
    </svg>
  ),
  chat: () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  landmark: () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  ),
  target: () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
    </svg>
  ),
  player: () => (
    <svg className="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  ),
  chevronDown: () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  ),
  chevronRight: () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6" />
    </svg>
  ),
}

// Category label by image type
function categorize(image?: string): { label: string; color: string } {
  const f = image?.toLowerCase() ?? ""
  if (!f) return { label: "其他", color: "text-zinc-400" }
  if (f.endsWith("official.png")) return { label: "官方地标", color: "text-amber-400" }
  if (f.endsWith("public.png")) return { label: "公共设施", color: "text-sky-400" }
  if (f.endsWith("resource.png")) return { label: "资源点", color: "text-green-400" }
  if (f.endsWith("coops.png")) return { label: "商店", color: "text-rose-400" }
  if (f.endsWith("steve.png") || f.endsWith("player.png")) return { label: "玩家", color: "text-purple-400" }
  return { label: "建筑", color: "text-cyan-400" }
}

export default function MapSidebar({ open, onToggle, onCenterOn, fullscreen }: Props) {
  const [tab, setTab] = useState<"server" | "landmarks" | "coords">("server")

  // --- Server status ---
  const [status, setStatus] = useState<ServerStatus | null>(null)
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch("https://api.mcsrvstat.us/bedrock/2/play.dogelake.cn:21303")
        const data = await res.json()
        setStatus(data)
      } catch { /* ignore */ }
    }
    fetchStatus()
    const id = setInterval(fetchStatus, 30000)
    return () => clearInterval(id)
  }, [])

  // --- Chat messages ---
  const [chatMsgs, setChatMsgs] = useState<ChatMsg[]>([])
  useEffect(() => {
    let lastTs: number | undefined
    const poll = async () => {
      try {
        const res = await fetch(`${PROXY}/doge/getRecentMsgs`)
        const data = await res.json()
        if (!data?.t?.length) return
        if (lastTs === undefined) { lastTs = data.t.pop(); return }
        const idx = data.t.lastIndexOf(lastTs)
        const newMsgs: ChatMsg[] = []
        for (let i = idx + 1; i < data.t.length; i++)
          newMsgs.push({ t: data.t[i], m: data.m[i] })
        if (newMsgs.length) setChatMsgs(prev => [...prev, ...newMsgs].slice(-50))
        lastTs = data.t[data.t.length - 1]
      } catch { /* ignore */ }
    }
    poll()
    const id = setInterval(poll, 2000)
    return () => clearInterval(id)
  }, [])

  // --- Real-time landmarks ---
  const [landmarks, setLandmarks] = useState<Landmark[]>([])
  const [search, setSearch] = useState("")
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})
  useEffect(() => {
    const fetchLandmarks = async () => {
      try {
        const res = await fetch(`${PROXY}/doge/getPlaceMarkers`)
        const data: PlaceMarker[] = await res.json()
        if (data?.length) {
          setLandmarks(data.map(m => ({
            name: m.text || `(${m.x}, ${m.z})`,
            x: m.x, z: m.z,
            desc: m.image ? undefined : undefined,
            image: m.image,
          })))
        }
      } catch { /* ignore */ }
    }
    fetchLandmarks()
    const id = setInterval(fetchLandmarks, 15000)
    return () => clearInterval(id)
  }, [])

  // Group landmarks by category
  const filtered = search
    ? landmarks.filter(l => l.name.toLowerCase().includes(search.toLowerCase()))
    : landmarks
  const groups: Record<string, Landmark[]> = {}
  for (const l of filtered) {
    const cat = categorize(l.image).label
    if (!groups[cat]) groups[cat] = []
    groups[cat].push(l)
  }

  // --- Coordinate jump ---
  const [cx, setCx] = useState("")
  const [cz, setCz] = useState("")

  const tabs = [
    { key: "server" as const, label: "服务器", icon: Icons.server },
    { key: "landmarks" as const, label: "地标", icon: Icons.landmark },
    { key: "coords" as const, label: "坐标", icon: Icons.target },
  ]

  return (
    <aside
      className={`fixed right-0 h-full z-40 w-80 bg-zinc-900/90 backdrop-blur-lg
                   border-l border-zinc-800/50 flex flex-col transition-transform duration-300
                   ${open ? "translate-x-0" : "translate-x-full"}`}
      style={{ top: fullscreen ? 0 : "4rem" }}
    >
      {/* Tab bar */}
      <div className="flex border-b border-zinc-800 shrink-0 relative pr-8">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex-1 py-2.5 text-xs font-medium transition-colors cursor-pointer
                       flex items-center justify-center gap-1.5
                       ${tab === t.key
                         ? "text-white bg-zinc-800/50 border-b-2 border-white"
                         : "text-zinc-500 hover:text-zinc-300"}`}
          >
            <t.icon />
            {t.label}
          </button>
        ))}
        <button
          onClick={() => onToggle(false)}
          className="absolute right-1 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center
                     text-zinc-500 hover:text-white transition-colors cursor-pointer rounded"
          aria-label="关闭"
        >
          ✕
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
        {/* === SERVER TAB === */}
        {tab === "server" && (
          <div className="space-y-3">
            {/* Server status */}
            <div>
              <h3 className="text-zinc-400 text-xs uppercase tracking-wider font-medium flex items-center gap-1.5">
                <Icons.server />
                服务器状态
              </h3>
              {status ? (
                <div className="mt-2 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${status.online ? "bg-green-500" : "bg-red-500"}`} />
                    <span className="text-white font-medium text-sm">{status.online ? "在线" : "离线"}</span>
                    <span className="text-zinc-600 text-[10px] ml-auto">30s 更新</span>
                  </div>
                  {status.players && (
                    <p className="text-zinc-300 text-xs flex items-center gap-1.5">
                      <Icons.player />
                      <b className="text-white">{status.players.online}</b> / {status.players.max} 在线
                    </p>
                  )}
                  {status.version && <p className="text-zinc-500 text-[11px]">v{status.version}</p>}
                  {status.motd?.clean?.length && (
                    <div className="p-2 bg-zinc-800/50 rounded text-[11px] text-zinc-300 leading-relaxed">
                      {status.motd.clean.map((l, i) => <p key={i}>{l}</p>)}
                    </div>
                  )}
                </div>
              ) : (
                <p className="mt-2 text-zinc-600 text-xs flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 animate-pulse" />
                  获取中...
                </p>
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-zinc-800/50" />

            {/* Chat messages */}
            <div>
              <h3 className="text-zinc-400 text-xs uppercase tracking-wider font-medium flex items-center gap-1.5">
                <Icons.chat />
                聊天消息
              </h3>
              <div className="mt-2 space-y-0.5 max-h-48 overflow-y-auto">
                {chatMsgs.length === 0 ? (
                  <p className="text-zinc-600 text-xs">暂无消息</p>
                ) : (
                  chatMsgs.map((msg, i) => (
                    <div
                      key={msg.t + "-" + i}
                      className="text-[11px] text-zinc-300 leading-relaxed py-1 px-1.5 rounded
                                 even:bg-zinc-800/20 border-b border-zinc-800/10 last:border-0"
                      dangerouslySetInnerHTML={{ __html: msg.m }}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* === LANDMARKS TAB === */}
        {tab === "landmarks" && (
          <div className="space-y-2">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="搜索地标..."
              className="w-full px-3 py-2 bg-zinc-800/80 border border-zinc-700/50 rounded-lg
                         text-sm text-white placeholder-zinc-500 outline-none focus:border-zinc-500 transition-colors"
            />
            {landmarks.length > 0 && !search && (
              <p className="text-zinc-600 text-[10px] px-1">共 {landmarks.length} 个地标</p>
            )}
            <div className="space-y-1 max-h-[calc(100vh-18rem)] overflow-y-auto">
              {Object.entries(groups).length === 0 ? (
                <p className="text-zinc-600 text-xs pt-2 text-center">
                  {landmarks.length === 0 ? "暂无地标数据" : "未找到匹配的地标"}
                </p>
              ) : (
                Object.entries(groups).map(([cat, items]) => {
                  const isCollapsed = collapsed[cat] ?? false
                  return (
                    <div key={cat}>
                      <button
                        onClick={() => setCollapsed(prev => ({ ...prev, [cat]: !prev[cat] }))}
                        className="w-full flex items-center gap-1.5 py-1.5 px-1 text-xs font-medium
                                   text-zinc-400 hover:text-white transition-colors cursor-pointer"
                      >
                        <span className={isCollapsed ? "text-zinc-500" : "text-zinc-300"}>
                          {isCollapsed ? <Icons.chevronRight /> : <Icons.chevronDown />}
                        </span>
                        <span className={categorize(items[0]?.image).color}>{cat}</span>
                        <span className="text-zinc-600 ml-auto">{items.length}</span>
                      </button>
                      {!isCollapsed && (
                        <div className="space-y-0.5 ml-4">
                          {items.map((lm, i) => (
                            <button
                              key={lm.name + i}
                              onClick={() => { onCenterOn(lm.x, lm.z); onToggle(false) }}
                              className="w-full text-left p-2 rounded-lg bg-zinc-800/30 hover:bg-zinc-700/40
                                         transition-colors cursor-pointer border border-transparent hover:border-zinc-600/40"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-white text-xs truncate mr-2">{lm.name}</span>
                                <span className="text-zinc-500 text-[10px] font-mono shrink-0">{lm.x}, {lm.z}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })
              )}
            </div>
          </div>
        )}

        {/* === COORDS TAB === */}
        {tab === "coords" && (
          <div className="space-y-3">
            <h3 className="text-zinc-400 text-xs uppercase tracking-wider font-medium flex items-center gap-1.5">
              <Icons.target />
              跳转到坐标
            </h3>
            <div className="flex gap-2">
              {(["X", "Z"] as const).map(label => (
                <div key={label} className="flex-1">
                  <label className="text-zinc-500 text-xs block mb-1">{label}</label>
                  <input
                    type="number"
                    value={label === "X" ? cx : cz}
                    onChange={e => label === "X" ? setCx(e.target.value) : setCz(e.target.value)}
                    placeholder="0"
                    className="w-full px-3 py-2 bg-zinc-800/80 border border-zinc-700/50 rounded-lg
                               text-sm text-white placeholder-zinc-500 outline-none focus:border-zinc-500
                               [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none
                               [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                const x = parseInt(cx), z = parseInt(cz)
                if (isNaN(x) || isNaN(z)) return
                onCenterOn(x, z)
                onToggle(false)
              }}
              className="w-full py-2 bg-zinc-700 hover:bg-zinc-600 text-white text-sm font-medium
                         rounded-lg transition-colors cursor-pointer"
            >
              跳转
            </button>
          </div>
        )}
      </div>

      <div className="shrink-0 px-3 py-2 border-t border-zinc-800/50">
        <p className="text-[10px] text-zinc-700 text-center">DogeLake Map</p>
      </div>
    </aside>
  )
}
