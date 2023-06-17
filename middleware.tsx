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

  return res
}
