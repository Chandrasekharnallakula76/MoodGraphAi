const AUTH_EMAIL_KEY = "moodgraph-auth-email"
const AUTH_TOKEN_KEY = "moodgraph-auth-token"
const AUTH_TOAST_KEY = "moodgraph-auth-toast"
const AUTH_TOAST_EVENT = "moodgraph-auth-toast"

const canUseStorage = () => typeof window !== "undefined"

export const getStoredEmail = () => {
  if (!canUseStorage()) return null
  return window.localStorage.getItem(AUTH_EMAIL_KEY)
}

export const setStoredEmail = (email: string) => {
  if (!canUseStorage()) return
  window.localStorage.setItem(AUTH_EMAIL_KEY, email)
}

export const getStoredToken = () => {
  if (!canUseStorage()) return null
  return window.localStorage.getItem(AUTH_TOKEN_KEY)
}

export const setStoredToken = (token: string) => {
  if (!canUseStorage()) return
  window.localStorage.setItem(AUTH_TOKEN_KEY, token)
}

export const clearStoredEmail = () => {
  if (!canUseStorage()) return
  window.localStorage.removeItem(AUTH_EMAIL_KEY)
}

export const clearStoredToken = () => {
  if (!canUseStorage()) return
  window.localStorage.removeItem(AUTH_TOKEN_KEY)
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
  window.dispatchEvent(new CustomEvent(AUTH_TOAST_EVENT))
}

export const consumeAuthFlashToast = () => {
  if (!canUseStorage()) return null

  const value = window.sessionStorage.getItem(AUTH_TOAST_KEY)
  if (!value) return null

  window.sessionStorage.removeItem(AUTH_TOAST_KEY)

  try {
    return JSON.parse(value) as AuthToastPayload
  } catch {
    return null
  }
}

export const authFlashToastEventName = AUTH_TOAST_EVENT
