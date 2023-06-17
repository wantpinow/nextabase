"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Session } from "@supabase/supabase-js"

import supabase from "@/lib/supabase-browser"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/components/auth/auth-provider"

export default function LoginButton({ session }: { session: Session | null }) {
  const { user, initial } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      toast({
        title: "Could not sign out",
        description: error.message,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Goodbye",
        description: "Signed out successfully",
      })
    }
    // window.location.href = `${window.location.origin}`
    router.push("/")
  }

  const signOutElement = (
    <Button variant="ghost" onClick={signOut}>
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
