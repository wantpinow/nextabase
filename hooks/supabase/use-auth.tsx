import { useRouter } from "next/navigation"

import supabase from "@/lib/supabase-browser"
import usePosthog from "@/hooks/use-posthog"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/components/auth/auth-provider"

export function useSupabaseAuth() {
  // get required hooks
  const { toast } = useToast()
  const router = useRouter()
  const { user } = useAuth()
  const { capture, identify, reset } = usePosthog()

  // sign in function
  async function signInWithPassword({
    email,
    password,
    redirect = null,
    doToast = true,
  }: {
    email: string
    password: string
    redirect: string | null
    doToast: boolean
  }) {
    // attempt to sign in
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    // handle errors
    if (error) {
      if (doToast) {
        toast({
          title: "Could not sign in",
          description: error.message,
          variant: "destructive",
        })
      }
      return false
    }

    // get the updated session
    const {
      data: { session: currentSession },
    } = await supabase.auth.getSession()

    // handle success
    if (doToast) {
      toast({
        title: "Welcome!",
        description: "Signed in successfully",
      })
    }
    if (currentSession?.user) {
      capture("SIGN_IN", {
        email: currentSession.user.email,
      })
      identify(currentSession.user.id, {
        email: currentSession.user.email,
      })
    }

    // redirect if necessary
    if (redirect) router.push(redirect)
    return true
  }

  // sign up function
  async function signUpWithPassword({
    email,
    password,
    redirect = null,
    doToast = true,
  }: {
    email: string
    password: string
    redirect: string | null
    doToast: boolean
  }) {
    // attempt to sign up
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    // handle errors
    if (error) {
      if (doToast) {
        toast({
          title: "Could not sign up",
          description: error.message,
          variant: "destructive",
        })
      }
      return false
    }

    // handle success
    if (doToast) {
      toast({
        title: "Email invite sent",
        description: "Check your inbox for a link to sign in",
      })
    }
    capture("SIGN_UP", {
      email: email,
    })

    // redirect if necessary
    if (redirect) router.push(redirect)
    return true
  }

  // sign out function
  const signOut = async ({
    redirect = null,
    doToast = true,
  }: {
    redirect: string | null
    doToast: boolean
  }) => {
    // attempt to sign out
    const { error } = await supabase.auth.signOut()

    // handle errors
    if (error) {
      if (doToast) {
        toast({
          title: "Could not sign out",
          description: error.message,
          variant: "destructive",
        })
      }
      return false
    }

    // handle success
    if (doToast) {
      toast({
        title: "Signed out",
        description: "See you soon!",
      })
    }
    if (user) {
      capture("SIGN_OUT", {
        email: user.email,
      })
      reset()
    }

    // redirect if necessary
    if (redirect) router.push(redirect)
    return true
  }

  return { signInWithPassword, signUpWithPassword, signOut }
}
