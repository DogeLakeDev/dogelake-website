import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
      {
        source: "/api/map-proxy/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
        ],
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: "/assets/:path*",
        destination: "/map-assets/:path*",
      },
    ]
  },
}

export default nextConfig
