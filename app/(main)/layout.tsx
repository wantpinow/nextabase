import { SiteHeader } from "@/components/nav/top/site-header"

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <SiteHeader />
      <main className="container py-4 lg:py-6">{children}</main>
    </>
  )
}
