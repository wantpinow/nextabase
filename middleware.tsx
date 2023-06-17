import { NextResponse, type NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

import { Database } from "@/types/database"
import { Session } from "@/types/supabase"

// this middleware refreshes the user's session and must be run
// for any Server Component route that uses `createServerComponentSupabaseClient`
export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  // what is this doing?
  const supabase = createMiddlewareClient<Database>({ req, res })
  const { data } = await supabase.auth.getSession()
  if (!data.session && req.nextUrl.pathname === "/static") {
    return NextResponse.redirect(new URL("/", req.url))
  }

  // do auth redirects
  const session = data.session as Session | null

  // dashboard (only accessible to authenticated users)
  if (req.nextUrl.pathname.startsWith("/dashboard") && !session) {
    const redirectUrl = new URL("/sign-in", req.url)
    redirectUrl.searchParams.set("redirect_to", req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // admin (only accessible to admins)
  if (
    req.nextUrl.pathname.startsWith("/admin") &&
    !session?.user.app_metadata.claims_admin
  ) {
    if (!session) {
      const redirectUrl = new URL("/sign-in", req.url)
      redirectUrl.searchParams.set("redirect_to", req.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    } else {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }
  }

  // sign in (only accessible to unauthenticated users)
  if (req.nextUrl.pathname.startsWith("/sign-in") && session) {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  // sign up (only accessible to unauthenticated users)
  if (req.nextUrl.pathname.startsWith("/sign-up") && session) {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  return res
}
