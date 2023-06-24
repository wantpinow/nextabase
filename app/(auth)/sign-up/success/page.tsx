import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Account Registered!",
}

export default function SignUpSuccessPage() {
  return (
    <div>
      <div className="prose mx-auto mb-4 dark:prose-invert md:mb-12 md:max-w-[420px] md:border-b md:pb-4 md:text-center">
        <h2>Account Registered!</h2>
        <p>Check your inbox to confirm your email address.</p>
      </div>
    </div>
  )
}
