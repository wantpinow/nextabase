import Link from "next/link"

import { RegisterForm } from "@/components/auth/register-form"

export default function SignUpPage() {
  return (
    <div>
      <div className="md:max-w-[420px] prose dark:prose-invert mx-auto md:text-center mb-4 md:border-b md:pb-4 md:mb-12">
        <h2>Register a New Account</h2>
        <p>
          Already have an account? <Link href="/sign-in">Sign In</Link>
        </p>
      </div>
      <div className="md:max-w-[420px] mx-auto">
        <RegisterForm />
      </div>
    </div>
  )
}
