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
