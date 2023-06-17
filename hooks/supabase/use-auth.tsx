import { useRouter } from "next/navigation"

import supabase from "@/lib/supabase-browser"

import { useToast } from "../../components/ui/use-toast"

export function useSupabaseAuth() {
  // get required hooks
  const { toast } = useToast()
  const router = useRouter()

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

    // handle success
    if (doToast) {
      toast({
        title: "Welcome!",
        description: "Signed in successfully",
      })
    }
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
        title: "Welcome!",
        description: "Email invite sent",
      })
    }
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
    const { error } = await supabase.auth.signOut()
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
    if (doToast) {
      toast({
        title: "Signed out",
        description: "See you soon!",
      })
    }
    if (redirect) router.push(redirect)
    return true
  }

  return { signInWithPassword, signUpWithPassword, signOut }
}
