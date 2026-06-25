import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: { unoptimized: true },
}

if (process.env.STATIC_EXPORT === "true") {
  nextConfig.output = "export"
}

export default nextConfig
