const AUTH_EMAIL_KEY = "daisy-ai-studio-auth-email"
const AUTH_TOKEN_KEY = "daisy-ai-studio-auth-token"
const AUTH_TOAST_KEY = "daisy-ai-studio-auth-toast"
const AUTH_TOAST_EVENT = "daisy-ai-studio-auth-toast"

const LEGACY_AUTH_KEY_PREFIX = ["mood", "graph"].join("")
const LEGACY_AUTH_EMAIL_KEY = `${LEGACY_AUTH_KEY_PREFIX}-auth-email`
const LEGACY_AUTH_TOKEN_KEY = `${LEGACY_AUTH_KEY_PREFIX}-auth-token`
const LEGACY_AUTH_TOAST_KEY = `${LEGACY_AUTH_KEY_PREFIX}-auth-toast`

const canUseStorage = () => typeof window !== "undefined"

export const getStoredEmail = () => {
  if (!canUseStorage()) return null

  const currentValue = window.localStorage.getItem(AUTH_EMAIL_KEY)
  if (currentValue) return currentValue

  const legacyValue = window.localStorage.getItem(LEGACY_AUTH_EMAIL_KEY)
  if (legacyValue) {
    window.localStorage.setItem(AUTH_EMAIL_KEY, legacyValue)
    window.localStorage.removeItem(LEGACY_AUTH_EMAIL_KEY)
  }

  return legacyValue
}

export const setStoredEmail = (email: string) => {
  if (!canUseStorage()) return
  window.localStorage.setItem(AUTH_EMAIL_KEY, email)
}

export const getStoredToken = () => {
  if (!canUseStorage()) return null

  const currentValue = window.localStorage.getItem(AUTH_TOKEN_KEY)
  if (currentValue) return currentValue

  const legacyValue = window.localStorage.getItem(LEGACY_AUTH_TOKEN_KEY)
  if (legacyValue) {
    window.localStorage.setItem(AUTH_TOKEN_KEY, legacyValue)
    window.localStorage.removeItem(LEGACY_AUTH_TOKEN_KEY)
  }

  return legacyValue
}

export const setStoredToken = (token: string) => {
  if (!canUseStorage()) return
  window.localStorage.setItem(AUTH_TOKEN_KEY, token)
}

export const clearStoredEmail = () => {
  if (!canUseStorage()) return
  window.localStorage.removeItem(AUTH_EMAIL_KEY)
  window.localStorage.removeItem(LEGACY_AUTH_EMAIL_KEY)
}

export const clearStoredToken = () => {
  if (!canUseStorage()) return
  window.localStorage.removeItem(AUTH_TOKEN_KEY)
  window.localStorage.removeItem(LEGACY_AUTH_TOKEN_KEY)
}

export const clearAuthStorage = () => {
  clearStoredEmail()
  clearStoredToken()
}

export const isAuthenticated = () => Boolean(getStoredToken() ?? getStoredEmail())

export type AuthToastKind = "success" | "error"

export type AuthToastPayload = {
  kind: AuthToastKind
  message: string
}

export const setAuthFlashToast = (payload: AuthToastPayload) => {
  if (!canUseStorage()) return

  window.sessionStorage.setItem(AUTH_TOAST_KEY, JSON.stringify(payload))
  window.sessionStorage.removeItem(LEGACY_AUTH_TOAST_KEY)
  window.dispatchEvent(new CustomEvent(AUTH_TOAST_EVENT))
}

export const consumeAuthFlashToast = () => {
  if (!canUseStorage()) return null

  const value =
    window.sessionStorage.getItem(AUTH_TOAST_KEY) ??
    window.sessionStorage.getItem(LEGACY_AUTH_TOAST_KEY)
  if (!value) return null

  window.sessionStorage.removeItem(AUTH_TOAST_KEY)
  window.sessionStorage.removeItem(LEGACY_AUTH_TOAST_KEY)

  try {
    return JSON.parse(value) as AuthToastPayload
  } catch {
    return null
  }
}

export const authFlashToastEventName = AUTH_TOAST_EVENT
