"use client"

import Link from "next/link"

import { useSupabaseAuth } from "@/hooks/supabase/use-auth"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth/auth-provider"

export default function LoginButton() {
  const { user } = useAuth()
  const { signOut } = useSupabaseAuth()

  if (user) {
    return (
      <Button
        variant="ghost"
        onClick={() =>
          signOut({
            redirect: "/",
            doToast: true,
          })
        }
      >
        Sign Out
      </Button>
    )
  } else {
    return (
      <Button variant="ghost" asChild={true}>
        <Link href="/sign-in">Sign In</Link>
      </Button>
    )
  }
}
