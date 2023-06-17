import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { Database } from "@/types/database"

export const createClient = () =>
  createServerComponentClient<Database>({
    cookies,
  })

export const fetchServerSession = async () => {
  const supabase = createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return session
}
