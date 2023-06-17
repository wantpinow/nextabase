import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { Database, Session } from "@/types/supabase"

export const createClient = () =>
  createServerComponentClient<Database>({
    cookies,
  })

export const fetchServerSession = async () => {
  const supabase = createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return session as Session
}
