import { NextRequest, NextResponse } from "next/server"

const MAP_BACKEND = "http://play.dogelake.cn:21309"

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params
  const urlPath = path.join("/")
  const targetUrl = `${MAP_BACKEND}/${urlPath}${_request.nextUrl.search}`

  try {
    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent": "DogeLake-Web/1.0",
      },
    })

    if (!response.ok) {
      return new NextResponse(null, { status: response.status })
    }

    const contentType = response.headers.get("content-type") || getContentType(urlPath)
    const buffer = await response.arrayBuffer()

    return new NextResponse(buffer, {
      status: response.status,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": urlPath.endsWith(".js") || urlPath.endsWith(".json")
          ? "no-cache"
          : "public, max-age=3600",
        "Access-Control-Allow-Origin": "*",
      },
    })
  } catch {
    return new NextResponse("Proxy error", { status: 502 })
  }
}

function getContentType(path: string): string {
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
