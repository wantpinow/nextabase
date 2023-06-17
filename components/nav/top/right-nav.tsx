import { createClient } from "@/lib/supabase-server"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"

import LoginButton from "./login-button"

export async function RightNav() {
  const supabase = await createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return (
    <div className="flex flex-1 items-center justify-end space-x-4">
      <nav className="flex items-center space-x-4">
        <LoginButton session={session} />
      </nav>
    </div>
  )
}
