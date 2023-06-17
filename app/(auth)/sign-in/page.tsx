import Link from "next/link"

import { LoginForm } from "@/components/auth/login-form"

export default function SignInPage() {
  return (
    <div>
      <div className="prose mx-auto mb-4 dark:prose-invert md:mb-12 md:max-w-[420px] md:border-b md:pb-4 md:text-center">
        <h2>Sign in to your account</h2>
        <p>
          Don&apos;t have an account? <Link href="/sign-up">Sign Up</Link>
        </p>
      </div>
      <div className="mx-auto md:max-w-[420px]">
        <LoginForm />
      </div>
    </div>
  )
}
