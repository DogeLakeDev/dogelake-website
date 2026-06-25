import Navigation from "@/components/layouts/navigation";
import Footer from "@/components/layouts/footer";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <header className="sticky top-0 z-50 relative py-3 px-6">
        <Navigation />
      </header>
      <div className="flex-1">
        {children}
      </div>
      <Footer />
    </>
  )
}
