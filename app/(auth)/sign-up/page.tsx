import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TypographyH3, TypographyMuted } from "@/components/ui/typography"

export default function SignUpPage() {
  return (
    <div>
      <div className="md:text-center mb-6">
        <TypographyH3>Sign up to NSS Flashcards</TypographyH3>
        <TypographyMuted>
          Already have an account? <Link href="/sign-in">Sign In</Link>
        </TypographyMuted>
      </div>
      <div className="lg:max-w-[380px] mx-auto space-y-2">
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Input type="password" placeholder="Confirm Password" />
        <Button className="w-full">Sign Up with Email</Button>
      </div>
    </div>
  )
}
