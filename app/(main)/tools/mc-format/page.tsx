"use client"

import { useState, useRef, useCallback, useEffect } from "react"

interface PreviewSegment {
  text: string
  style: React.CSSProperties
  obfuscated: boolean
}

function parsePreview(text: string): PreviewSegment[] {
  const parts: PreviewSegment[] = []
  const segments = text.split(/(§[0-9a-fklmnor])/g)
  let currentStyle: React.CSSProperties = { color: "#FFFFFF" }
  let obfuscated = false

  for (const seg of segments) {
    if (!seg) continue
    const match = seg.match(/^§([0-9a-fklmnor])$/)
    if (match) {
      const code = match[1]
      if (code >= "0" && code <= "9" || code >= "a" && code <= "f") {
        const color = COLORS.find((c) => c.code === code)
        currentStyle = { ...currentStyle, color: color?.hex ?? "#FFFFFF", fontWeight: "normal", fontStyle: "normal", textDecoration: "none" }
      } else if (code === "l") {
        currentStyle = { ...currentStyle, fontWeight: "bold" }
      } else if (code === "o") {
        currentStyle = { ...currentStyle, fontStyle: "italic" }
      } else if (code === "n") {
        currentStyle = { ...currentStyle, textDecoration: "underline" }
      } else if (code === "m") {
        currentStyle = { ...currentStyle, textDecoration: "line-through" }
      } else if (code === "k") {
        obfuscated = true
        currentStyle = { ...currentStyle, color: "#FFFFFF" }
      } else if (code === "r") {
        obfuscated = false
        currentStyle = { color: "#FFFFFF", fontWeight: "normal", fontStyle: "normal", textDecoration: "none" }
      }
      continue
    }
    parts.push({ text: seg, style: { ...currentStyle }, obfuscated })
  }

  return parts
}

const OBFUSCATED_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

function obfuscate(length: number): string {
  let result = ""
  for (let i = 0; i < length; i++) {
    result += OBFUSCATED_CHARS[Math.floor(Math.random() * OBFUSCATED_CHARS.length)]
  }
  return result
}
interface ColorCode {
  code: string
  name: string
  hex: string
}

const COLORS: ColorCode[] = [
  { code: "0", name: "黑色", hex: "#000000" },
  { code: "1", name: "深蓝", hex: "#0000AA" },
  { code: "2", name: "深绿", hex: "#00AA00" },
  { code: "3", name: "深青", hex: "#00AAAA" },
  { code: "4", name: "深红", hex: "#AA0000" },
  { code: "5", name: "深紫", hex: "#AA00AA" },
  { code: "6", name: "金色", hex: "#FFAA00" },
  { code: "7", name: "灰色", hex: "#AAAAAA" },
  { code: "8", name: "深灰", hex: "#555555" },
  { code: "9", name: "蓝色", hex: "#5555FF" },
  { code: "a", name: "绿色", hex: "#55FF55" },
  { code: "b", name: "青色", hex: "#55FFFF" },
  { code: "c", name: "红色", hex: "#FF5555" },
  { code: "d", name: "浅紫", hex: "#FF55FF" },
  { code: "e", name: "黄色", hex: "#FFFF55" },
  { code: "f", name: "白色", hex: "#FFFFFF" },
]

interface FormatCode {
  code: string
  label: string
  preview: string
}

const FORMATS: FormatCode[] = [
  { code: "l", label: "粗体", preview: "B" },
  { code: "o", label: "斜体", preview: "I" },
  { code: "n", label: "下划线", preview: "U" },
  { code: "m", label: "删除线", preview: "S" },
  { code: "k", label: "随机", preview: "?" },
  { code: "r", label: "重置", preview: "R" },
]

export default function McFormatPage() {
  const [text, setText] = useState("")
  const [copied, setCopied] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const segmentsRef = useRef<PreviewSegment[]>([])
  const [tick, setTick] = useState(0)

  const segments = parsePreview(text)
  segmentsRef.current = segments

  useEffect(() => {
    const hasObfuscated = segments.some((s) => s.obfuscated)
    if (!hasObfuscated) return
    const id = setInterval(() => setTick((t) => t + 1), 80)
    return () => clearInterval(id)
  }, [text])

  const insertCode = useCallback((code: string) => {
    const ta = textareaRef.current
    if (!ta) {
      setText((prev) => prev + `§${code}`)
      return
    }
    const start = ta.selectionStart
    const end = ta.selectionEnd
    const newText = text.slice(0, start) + `§${code}` + text.slice(end)
    setText(newText)
    requestAnimationFrame(() => {
      ta.focus()
      ta.selectionStart = ta.selectionEnd = start + 2
    })
  }, [text])

  const insertSymbol = useCallback((char: string) => {
    const ta = textareaRef.current
    if (ta) {
      const start = ta.selectionStart
      const end = ta.selectionEnd
      setText((prev) => prev.slice(0, start) + char + prev.slice(end))
      requestAnimationFrame(() => {
        ta.focus()
        ta.selectionStart = ta.selectionEnd = start + char.length
      })
    } else {
      setText((prev) => prev + char)
    }
  }, [text])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
      const ta = document.createElement("textarea")
      ta.value = text
      document.body.appendChild(ta)
      ta.select()
      document.execCommand("copy")
      document.body.removeChild(ta)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleClear = () => {
    setText("")
    textareaRef.current?.focus()
  }

  const previewParts = segments

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:py-16">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Minecraft 格式化字符工具</h1>
        <p className="mt-2 text-muted-foreground">
          点击颜色或格式按钮插入 § 代码，复制后粘贴到游戏聊天框中使用
        </p>
      </div>

      {/* 预览区域 */}
      <div className="rounded-xl border border-zinc-700 bg-black p-4 mb-4 min-h-[60px]">
        <p className="text-xs text-white/60 mb-2">预览</p>
        <p className="text-xl leading-relaxed break-all">
          {previewParts.length > 0 ? (
            previewParts.map((part, i) => (
              <span key={i} style={part.style}>{part.obfuscated ? obfuscate(part.text.length) : part.text}</span>
            ))
          ) : (
            <span className="text-white/40">输入或插入格式化代码后在此预览</span>
          )}
        </p>
      </div>

      {/* 输入区域 */}
      <div className="relative mb-4">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="在这里输入文字，或点击下方的格式化按钮插入代码..."
          className="w-full min-h-[100px] rounded-xl border bg-card p-4 pr-20 text-sm font-mono resize-y"
          rows={4}
        />
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={handleClear}
            className="rounded-lg border bg-background px-3 py-1.5 text-xs font-medium hover:bg-muted transition-colors"
          >
            清空
          </button>
          <button
            onClick={handleCopy}
            className="rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            {copied ? "已复制!" : "复制"}
          </button>
        </div>
      </div>

      {/* 颜色按钮 */}
      <div className="mb-4">
        <p className="text-xs text-muted-foreground mb-2">颜色代码</p>
        <div className="grid grid-cols-8 gap-1.5 md:gap-2">
          {COLORS.map((c) => (
            <button
              key={c.code}
              onClick={() => insertCode(c.code)}
              className="flex flex-col items-center gap-1 rounded-lg border p-2 hover:scale-105 active:scale-95 transition-transform"
              title={`§${c.code} - ${c.name}`}
            >
              <span
                className="inline-block h-6 w-6 rounded-md border"
                style={{ backgroundColor: c.hex }}
              />
              <span className="text-[10px] font-mono text-muted-foreground">§{c.code}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 格式按钮 */}
      <div className="mb-6">
        <p className="text-xs text-muted-foreground mb-2">格式代码</p>
        <div className="flex flex-wrap gap-2">
          {FORMATS.map((f) => (
            <button
              key={f.code}
              onClick={() => insertCode(f.code)}
              className="rounded-lg border bg-card px-4 py-2 text-sm font-medium hover:bg-muted active:scale-95 transition-all"
              title={`§${f.code} - ${f.label}`}
            >
              <span className="font-mono">§{f.code}</span>
              <span className="ml-1.5 text-muted-foreground">/</span>
              <span className="ml-1.5">{f.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 基岩版特殊符号 */}
      <div>
        <p className="text-xs text-muted-foreground mb-2">基岩版特殊符号（点击插入，游戏中显示为对应图标）</p>
        <div className="space-y-2">
          {BEDROCK_SYMBOLS.map((group) => (
            <div key={group.label}>
              <p className="text-[10px] text-muted-foreground/60 mb-1">{group.label}</p>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <button
                    key={item.char + item.name}
                    onClick={() => insertSymbol(item.char)}
                    className="flex items-center gap-1 rounded-lg border bg-card px-2.5 py-1.5 text-sm font-mono hover:bg-muted active:scale-95 transition-all"
                    title={item.name}
                  >
                    <span className="text-base leading-none">{item.char}</span>
                    <span className="text-[10px] text-muted-foreground">{item.name}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const BEDROCK_SYMBOLS = [
  {
    label: "手柄按键 (Xbox)",
    items: [
      { char: "\uE001", name: "A" },
      { char: "\uE002", name: "B" },
      { char: "\uE003", name: "X" },
      { char: "\uE004", name: "Y" },
      { char: "\uE040", name: "A" },
      { char: "\uE041", name: "B" },
      { char: "\uE042", name: "X" },
      { char: "\uE043", name: "Y" },
      { char: "\uE005", name: "LB" },
      { char: "\uE006", name: "RB" },
      { char: "\uE007", name: "LT" },
      { char: "\uE008", name: "RT" },
      { char: "\uE00A", name: "LS" },
      { char: "\uE00B", name: "RS" },
    ],
  },
  {
    label: "手柄按键 (PS)",
    items: [
      { char: "\uE044", name: "L" },
      { char: "\uE045", name: "R" },
      { char: "\uE046", name: "ZL" },
      { char: "\uE047", name: "ZR" },
      { char: "\uE048", name: "-" },
      { char: "\uE049", name: "+" },
    ],
  },
  {
    label: "方向按键",
    items: [
      { char: "\uE00C", name: "上" },
      { char: "\uE00D", name: "左" },
      { char: "\uE00E", name: "下" },
      { char: "\uE00F", name: "右" },
      { char: "\uE050", name: "上" },
      { char: "\uE051", name: "左" },
      { char: "\uE052", name: "下" },
      { char: "\uE053", name: "右" },
      { char: "\uE054", name: "中" },
    ],
  },
  {
    label: "鼠标按键",
    items: [
      { char: "\uE060", name: "左键" },
      { char: "\uE061", name: "右键" },
      { char: "\uE062", name: "中滑" },
    ],
  },
  {
    label: "UI / 状态图标",
    items: [
      { char: "\uE100", name: "饱食度" },
      { char: "\uE101", name: "胸甲" },
      { char: "\uE102", name: "M币" },
      { char: "\uE008", name: "双方块" },
      { char: "\uE009", name: "三横杠" },
    ],
  },
  {
    label: "工作台",
    items: [
      { char: "\uE0A0", name: "开启" },
      { char: "\uE0A1", name: "关闭" },
    ],
  },
]