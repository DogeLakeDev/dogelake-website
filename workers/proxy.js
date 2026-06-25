// Cloudflare Worker — 代理 BDS 服务器 API 请求
// 部署后处理 dogelake.cn/api/* 路径
// 前端无需改动，fetch 路径保持不变

const MAP_BACKEND = "http://play.dogelake.cn:21309"

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)
    const path = url.pathname

    // ==================== 路由分发 ====================

    // GET /api/unmined-data — 获取地图配置 + 区块数据
    if (path === "/api/unmined-data" && request.method === "GET") {
      return handleUnminedData()
    }

    // GET /api/map-proxy/* — 代理到 BDS 服务器
    if (path.startsWith("/api/map-proxy/") && request.method === "GET") {
      return handleProxy(path, url.search)
    }

    // 其他路径返回 404
    return new Response("Not Found", { status: 404 })
  },
}

// ==================== 通用代理 ====================

async function handleProxy(path, search) {
  const proxyPath = path.replace("/api/map-proxy/", "")
  const targetUrl = `${MAP_BACKEND}/${proxyPath}${search}`

  try {
    const response = await fetch(targetUrl, {
      headers: { "User-Agent": "DogeLake-Web/1.0" },
    })

    if (!response.ok) {
      return new Response(null, { status: response.status })
    }

    const contentType =
      response.headers.get("content-type") || guessContentType(proxyPath)

    const buffer = await response.arrayBuffer()

    return new Response(buffer, {
      status: response.status,
      headers: {
        "Content-Type": contentType,
        "Cache-Control":
          proxyPath.endsWith(".js") || proxyPath.endsWith(".json")
            ? "no-cache"
            : "public, max-age=3600",
        "Access-Control-Allow-Origin": "*",
      },
    })
  } catch {
    return new Response("Proxy error", { status: 502 })
  }
}

function guessContentType(path) {
  if (path.endsWith(".js")) return "application/javascript"
  if (path.endsWith(".json")) return "application/json"
  if (path.endsWith(".png")) return "image/png"
  if (path.endsWith(".jpg") || path.endsWith(".jpeg")) return "image/jpeg"
  if (path.endsWith(".gif")) return "image/gif"
  if (path.endsWith(".webp")) return "image/webp"
  if (path.endsWith(".svg")) return "image/svg+xml"
  if (path.endsWith(".css")) return "text/css"
  if (path.endsWith(".html")) return "text/html"
  if (path.endsWith(".ico")) return "image/x-icon"
  return "application/octet-stream"
}

// ==================== unmined-data — JS → JSON 解析 ====================

async function handleUnminedData() {
  try {
    const [propsJs, regionsJs] = await Promise.all([
      fetchSafe(`${MAP_BACKEND}/unmined.map.properties.js`),
      fetchSafe(`${MAP_BACKEND}/unmined.map.regions.js`),
    ])

    const mapProperties = extractJson(propsJs)
    const regions = extractJson(regionsJs)

    return new Response(JSON.stringify({ properties: mapProperties, regions }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-cache",
      },
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error"
    return new Response(JSON.stringify({ error: message }), {
      status: 502,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
  }
}

async function fetchSafe(url) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 5000)
  try {
    const res = await fetch(url, { signal: controller.signal })
    if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`)
    return res.text()
  } finally {
    clearTimeout(timer)
  }
}

function extractJson(js) {
  // Strip leading JS block comment (added by uNmINeD)
  const stripped = js.replace(/^\/\*[\s\S]*?\*\/\s*/, "")
  const match = stripped.match(/^\s*(?:let|var|const)\s+\w+\s*=\s*(\{[\s\S]*?\});\s*$/)
  if (!match) throw new Error("Unrecognized JS format")
  const raw = match[1]

  try {
    return JSON.parse(raw)
  } catch {
    const cleaned = raw
      .replace(/,\s*([}\]])/g, "$1")
      .replace(/,\s*$/, "")
    return JSON.parse(cleaned)
  }
}
