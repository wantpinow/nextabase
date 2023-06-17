import Image from "next/image"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Icons } from "@/components/ui/icons"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative h-48 md:h-screen">
          <Image
            src="/auth-photo.avif"
            width={1280}
            height={843}
            alt="Authentication"
            className="h-full w-full border-b object-cover md:border-b-0"
          />
          <div className="absolute bottom-0 p-4 text-white md:top-0">
            <Link href="/">
              <div className="relative z-20 flex items-center font-bold">
                <Icons.logo className="mr-2 h-6 w-6" /> {siteConfig.name}
              </div>
            </Link>
          </div>
        </div>
        <div className="px-4 py-6 md:h-screen">
          <div className="md:px-6 md:pt-32">{children}</div>
        </div>
      </div>
    </>
  )
}
