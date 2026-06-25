import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";
import { Figtree, Outfit } from "next/font/google"

const outfitHeading = Outfit({subsets:['latin'],variable:'--font-heading'});
const figtree = Figtree({subsets:['latin'],variable:'--font-sans'})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="zh-cn"
      suppressHydrationWarning
      className={cn("antialiased", "font-sans", figtree.variable, outfitHeading.variable)}
    >
      <head>
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "710a9e1d192a4184a5e66d4764ad5f1f"}'
        />
      </head>
      <body>
        <ThemeProvider>
          <div className="flex min-h-svh flex-col">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
