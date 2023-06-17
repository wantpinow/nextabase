import Link from "next/link"

import { LoginForm } from "@/components/auth/login-form"

export default function SignInPage() {
  return (
    <div>
      <div className="md:max-w-[420px] prose dark:prose-invert mx-auto md:text-center mb-4 md:border-b md:pb-4 md:mb-12">
        <h2>Sign in to your account</h2>
        <p>
          Don&apos;t have an account? <Link href="/sign-up">Sign Up</Link>
        </p>
      </div>
      <div className="md:max-w-[420px] mx-auto">
        <LoginForm />
      </div>
    </div>
  )
}
