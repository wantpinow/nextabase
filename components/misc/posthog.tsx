"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import posthog from "posthog-js"
import { PostHogProvider } from "posthog-js/react"

import usePosthog from "@/hooks/use-posthog"

if (process.env.NEXT_PUBLIC_POSTHOG_ENABLE?.toLowerCase() === "true") {
  if (typeof window !== "undefined") {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY ?? "", {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    })
  }
}

export default function PHProvider({
  children,
}: {
  children: React.ReactNode
}) {
  // get the current pathname and search params
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { capture } = usePosthog()

  // track pageviews on route change
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_POSTHOG_ENABLE?.toLowerCase() !== "true") {
      return
    }
    if (pathname) {
      let url = window.origin + pathname
      if (searchParams.toString()) {
        url = url + `?${searchParams.toString()}`
      }
      capture("$pageview", {
        $current_url: url,
      })
    }
  }, [pathname, searchParams, capture])

  // if PostHog is disabled, just render the children
  if (process.env.NEXT_PUBLIC_POSTHOG_ENABLE?.toLowerCase() !== "true") {
    return <>{children}</>
  }

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
