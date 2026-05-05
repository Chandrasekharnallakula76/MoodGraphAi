const AUTH_EMAIL_KEY = "moodgraph-auth-email"

const canUseStorage = () => typeof window !== "undefined"

export const getStoredEmail = () => {
  if (!canUseStorage()) return null
  return window.localStorage.getItem(AUTH_EMAIL_KEY)
}

export const setStoredEmail = (email: string) => {
  if (!canUseStorage()) return
  window.localStorage.setItem(AUTH_EMAIL_KEY, email)
}

export const clearStoredEmail = () => {
  if (!canUseStorage()) return
  window.localStorage.removeItem(AUTH_EMAIL_KEY)
}

export const isAuthenticated = () => Boolean(getStoredEmail())
