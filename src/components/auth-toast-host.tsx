import { useEffect, useState } from "react"
import { CheckCircle2, X, XCircle } from "lucide-react"

import {
  authFlashToastEventName,
  consumeAuthFlashToast,
  type AuthToastPayload,
} from "@/lib/auth"

const AuthToastHost = () => {
  const [toast, setToast] = useState<AuthToastPayload | null>(null)

  useEffect(() => {
    const loadToast = () => {
      const nextToast = consumeAuthFlashToast()
      if (nextToast) {
        setToast(nextToast)
      }
    }

    loadToast()

    const handleToastEvent = () => {
      loadToast()
    }

    window.addEventListener(authFlashToastEventName, handleToastEvent)

    return () => {
      window.removeEventListener(authFlashToastEventName, handleToastEvent)
    }
  }, [])

  useEffect(() => {
    if (!toast) return undefined

    const timeoutId = window.setTimeout(() => {
      setToast(null)
    }, 3000)

    return () => window.clearTimeout(timeoutId)
  }, [toast])

  if (!toast) {
    return null
  }

  return (
    <div className="pointer-events-none fixed bottom-4 left-4 z-50 w-[calc(100%-2rem)] max-w-sm">
      <div
        className={`pointer-events-auto flex w-full items-center gap-3 rounded-[1.5rem] border bg-card/95 px-4 py-3 text-card-foreground shadow-xl shadow-black/10 backdrop-blur dark:shadow-black/30 ${
          toast.kind === "success"
            ? "border-emerald-200 dark:border-emerald-500/30"
            : "border-destructive/20"
        }`}
      >
        <div
          className={`flex size-10 shrink-0 items-center justify-center rounded-full border ${
            toast.kind === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300"
              : "border-destructive/15 bg-destructive/10 text-destructive"
          }`}
        >
          {toast.kind === "success" ? (
            <CheckCircle2 className="size-4" />
          ) : (
            <XCircle className="size-4" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium leading-5 sm:text-base">
            {toast.message}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setToast(null)}
          className={`pointer-events-auto inline-flex size-8 shrink-0 items-center justify-center rounded-full transition-colors ${
            toast.kind === "success"
              ? "text-emerald-600 hover:bg-emerald-500/10 hover:text-emerald-700 dark:text-emerald-300 dark:hover:text-emerald-200"
              : "text-destructive/80 hover:bg-destructive/10 hover:text-destructive"
          }`}
          aria-label="Dismiss toast"
        >
          <X className="size-3.5" />
        </button>
      </div>
    </div>
  )
}

export default AuthToastHost
