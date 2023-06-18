import { usePostHog } from "posthog-js/react"

export default function usePosthog() {
  const posthog = usePostHog()

  const capture = (event: string, properties?: Record<string, any>) => {
    console.log
    if (!posthog) return
    posthog.capture(event, properties)
  }

  const identify = (distinctId: string, properties?: Record<string, any>) => {
    if (!posthog) return
    posthog.identify(distinctId, properties)
  }

  const reset = () => {
    if (!posthog) return
    posthog.reset()
  }

  return {
    capture,
    identify,
    reset,
  }
}
