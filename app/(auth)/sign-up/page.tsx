import Link from "next/link"

import { RegisterForm } from "@/components/auth/register-form"

export default function SignUpPage() {
  return (
    <div>
      <div className="prose mx-auto mb-4 dark:prose-invert md:mb-12 md:max-w-[420px] md:border-b md:pb-4 md:text-center">
        <h2>Register a New Account</h2>
        <p>
          Already have an account? <Link href="/sign-in">Sign In</Link>
        </p>
      </div>
      <div className="mx-auto md:max-w-[420px]">
        <RegisterForm />
      </div>
    </div>
  )
}
