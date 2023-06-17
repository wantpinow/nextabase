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
        <div className="h-48 md:h-screen relative">
          <Image
            src="/auth-photo.avif"
            width={1280}
            height={843}
            alt="Authentication"
            className="object-cover w-full h-full border-b md:border-b-0"
          />
          <div className="absolute bottom-0 md:top-0  p-4">
            <Link href="/">
              <div className="relative z-20 flex items-center font-bold">
                <Icons.logo className="mr-2 h-6 w-6" /> {siteConfig.name}
              </div>
            </Link>
          </div>
        </div>
        <div className="md:h-screen px-4 py-6">
          <div className="md:pt-32 md:px-6">{children}</div>
        </div>
      </div>
    </>
  )
}
