"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth/auth-provider"

export default function AdminButton() {
  const { user } = useAuth()

  if (user?.app_metadata.claims_admin) {
    return (
      <Button asChild={true}>
        <Link href="/admin">Admin Panel</Link>
      </Button>
    )
  }
  return null
}
