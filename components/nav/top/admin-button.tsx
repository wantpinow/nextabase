"use client"

import Link from "next/link"

import { Session } from "@/types/supabase"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth/auth-provider"

export default function AdminButton({ session }: { session: Session | null }) {
  const { user, initial } = useAuth()

  const adminButtonElement = (
    <Button asChild={true}>
      <Link href="/admin">Admin Panel</Link>
    </Button>
  )
  if (initial) {
    if (session?.user.app_metadata.claims_admin) {
      return adminButtonElement
    }
  }
  if (user?.app_metadata.claims_admin) {
    return adminButtonElement
  }
  return null
}
