import { NextResponse } from "next/server"

const MAP_BACKEND = "http://play.dogelake.cn:21309"

async function fetchSafe(url: string): Promise<string> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`)
  return res.text()
}

/**
 * Safely extract JSON from a JS file like:
 *   let/var VariableName = <json>;
 * Uses regex to isolate the JSON portion and JSON.parse it.
 */
function extractJson(js: string): unknown {
  // Match `let/var NAME = ... ;`  capturing the value part
  const match = js.match(/^\s*(?:let|var|const)\s+\w+\s*=\s*(\{[\s\S]*?\});\s*$/)
  if (!match) throw new Error("Unrecognized JS format")
  const raw = match[1]

  // Try parsing directly; if fails, attempt common fixes (trailing commas)
  try {
    return JSON.parse(raw)
  } catch {
    // Strip trailing commas before ] or } and retry
    const cleaned = raw
      .replace(/,\s*([}\]])/g, "$1")      // {...,} or [...,]
      .replace(/,\s*$/, "")                // trailing comma at end
    return JSON.parse(cleaned)
  }
}

export async function GET() {
  try {
    const [propsJs, regionsJs] = await Promise.all([
      fetchSafe(`${MAP_BACKEND}/unmined.map.properties.js`),
      fetchSafe(`${MAP_BACKEND}/unmined.map.regions.js`),
    ])

    const mapProperties = extractJson(propsJs)
    const regions = extractJson(regionsJs)

    return NextResponse.json({
      properties: mapProperties,
      regions,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error"
    return NextResponse.json({ error: message }, { status: 502 })
  }
}
