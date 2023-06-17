"use client"

import Link from "next/link"

import { Session } from "@/types/supabase"
import { useSupabaseAuth } from "@/hooks/supabase/use-auth"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth/auth-provider"

export default function LoginButton({ session }: { session: Session | null }) {
  const { user, initial } = useAuth()
  const { signOut } = useSupabaseAuth()

  const signOutElement = (
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
  const signInElement = (
    <Button variant="ghost" asChild={true}>
      <Link href="/sign-in">Sign In</Link>
    </Button>
  )

  if (initial) {
    if (session) {
      return signOutElement
    } else {
      return signInElement
    }
  } else {
    if (user) {
      return signOutElement
    } else {
      return signInElement
    }
  }
}
