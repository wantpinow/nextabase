import { fetchServerSession } from "@/lib/supabase-server"
import LoginButton from "@/components/nav/top/login-button"
import { ThemeToggle } from "@/components/theme/theme-toggle"

export async function RightNav() {
  const session = await fetchServerSession()
  return (
    <div className="flex flex-1 items-center justify-end space-x-4">
      <nav className="flex items-center space-x-2">
        <LoginButton session={session} />
        <ThemeToggle />
      </nav>
    </div>
  )
}
