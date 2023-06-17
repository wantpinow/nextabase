"use client"

import * as React from "react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { useToast } from "@/components/ui/use-toast"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const { toast } = useToast()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
    toast({
      title: "Theme changed",
      description: `Switched to ${theme === "dark" ? "light" : "dark"} mode`,
    })
  }

  return (
    <Button variant="ghost" size="sm" onClick={toggleTheme}>
      <Icons.sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Icons.moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
