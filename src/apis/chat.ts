import axios from "axios"
import { getStoredToken } from "@/lib/auth"

const apiBaseUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, "") ?? ""

export type ChatEmailItem = {
  index: number
  id: string
  subject: string
  from: string
  date: string
  snippet: string
}

export type ChatGitHubRepoItem = {
  name: string
  full_name: string
  private: boolean
  description: string | null
  language: string | null
  stars: number
  forks: number
  open_issues: number
  updated_at: string
  url: string
}

export type ChatGitHubProfile = {
  login: string
  name: string | null
  email: string | null
  public_repos: number
  private_gists: number
  followers: number
  following: number
  profile_url: string
}

export type ChatCalendarEvent = {
  event_id: string
  title: string
  start: {
    dateTime: string
    timeZone?: string | null
  }
}

export type ChatCalendarSlot = {
  start: string
  end: string
}

type RawChatObject = Record<string, unknown>

export type ChatAssistantResponse =
  | {
      kind: "text"
      text: string
    }
  | {
      kind: "email_list"
      emails: ChatEmailItem[]
    }
  | {
      kind: "email_reply"
      reply: string
      approvalRequired?: boolean
      nextStep?: string
    }
  | {
      kind: "github_repo_list"
      action?: string
      repositories: ChatGitHubRepoItem[]
    }
  | {
      kind: "github_profile"
      action?: string
      profile: ChatGitHubProfile
    }
  | {
      kind: "calendar_event"
      action?: string
      event: ChatCalendarEvent
    }
  | {
      kind: "calendar_slots"
      action?: string
      slots: ChatCalendarSlot[]
    }

const chatClient = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
})

chatClient.interceptors.request.use((config) => {
  const token = getStoredToken()

  if (token) {
    config.headers = config.headers ?? {}
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

function isEmailItem(value: unknown): value is ChatEmailItem {
  if (!value || typeof value !== "object") return false

  const item = value as RawChatObject
  return (
    typeof item.index === "number" &&
    typeof item.id === "string" &&
    typeof item.subject === "string" &&
    typeof item.from === "string" &&
    typeof item.date === "string" &&
    typeof item.snippet === "string"
  )
}

function isGitHubRepoItem(value: unknown): value is ChatGitHubRepoItem {
  if (!value || typeof value !== "object") return false

  const item = value as RawChatObject
  return (
    typeof item.name === "string" &&
    typeof item.full_name === "string" &&
    typeof item.private === "boolean" &&
    (typeof item.description === "string" || item.description === null) &&
    (typeof item.language === "string" || item.language === null) &&
    typeof item.stars === "number" &&
    typeof item.forks === "number" &&
    typeof item.open_issues === "number" &&
    typeof item.updated_at === "string" &&
    typeof item.url === "string"
  )
}

function isGitHubProfile(value: unknown): value is ChatGitHubProfile {
  if (!value || typeof value !== "object") return false

  const item = value as RawChatObject
  return (
    typeof item.login === "string" &&
    (typeof item.name === "string" || item.name === null) &&
    (typeof item.email === "string" || item.email === null) &&
    typeof item.public_repos === "number" &&
    typeof item.private_gists === "number" &&
    typeof item.followers === "number" &&
    typeof item.following === "number" &&
    typeof item.profile_url === "string"
  )
}

function isCalendarEvent(value: unknown): value is ChatCalendarEvent {
  if (!value || typeof value !== "object") return false

  const item = value as RawChatObject
  const start = item.start as RawChatObject | undefined

  return (
    typeof item.event_id === "string" &&
    typeof item.title === "string" &&
    !!start &&
    typeof start.dateTime === "string" &&
    (typeof start.timeZone === "string" || start.timeZone === null || typeof start.timeZone === "undefined")
  )
}

function isCalendarSlot(value: unknown): value is ChatCalendarSlot {
  if (!value || typeof value !== "object") return false

  const item = value as RawChatObject
  return typeof item.start === "string" && typeof item.end === "string"
}

function tryParseJson(value: string): unknown {
  const trimmed = value.trim()
  if (
    !trimmed ||
    (trimmed[0] !== "{" && trimmed[0] !== "[") ||
    (!trimmed.endsWith("}") && !trimmed.endsWith("]"))
  ) {
    return value
  }

  try {
    return JSON.parse(trimmed) as unknown
  } catch {
    return value
  }
}

function decodeText(value: string) {
  if (typeof document === "undefined") {
    return value
  }

  const textarea = document.createElement("textarea")
  textarea.innerHTML = value
  return textarea.value
}

function normalizeString(value: string) {
  return decodeText(value)
}

function extractChatContent(data: unknown): ChatAssistantResponse {
  if (typeof data === "string") {
    const parsed = tryParseJson(data)

    if (parsed !== data) {
      return extractChatContent(parsed)
    }

    return { kind: "text", text: data }
  }

  if (!data || typeof data !== "object") {
    return { kind: "text", text: "No response received." }
  }

  const response = data as RawChatObject

  if (
    response.type === "email_list" &&
    Array.isArray(response.data) &&
    response.data.every(isEmailItem)
  ) {
    return {
      kind: "email_list",
      emails: response.data.map((item) => ({
        ...item,
        subject: normalizeString(item.subject),
        from: normalizeString(item.from),
        snippet: normalizeString(item.snippet),
      })),
    }
  }

  if (
    response.type === "github" &&
    response.action === "get_profile" &&
    isGitHubProfile(response.data)
  ) {
    return {
      kind: "github_profile",
      action:
        typeof response.action === "string" && response.action.trim()
          ? response.action
          : undefined,
      profile: {
        ...response.data,
        login: normalizeString(response.data.login),
        name:
          typeof response.data.name === "string"
            ? normalizeString(response.data.name)
            : response.data.name,
        email:
          typeof response.data.email === "string"
            ? normalizeString(response.data.email)
            : response.data.email,
        profile_url: normalizeString(response.data.profile_url),
      },
    }
  }

  if (
    response.type === "github" &&
    Array.isArray(response.data) &&
    response.data.every(isGitHubRepoItem)
  ) {
    return {
      kind: "github_repo_list",
      action:
        typeof response.action === "string" && response.action.trim()
          ? response.action
          : undefined,
      repositories: response.data.map((item) => ({
        ...item,
        name: normalizeString(item.name),
        full_name: normalizeString(item.full_name),
        description:
          typeof item.description === "string"
            ? normalizeString(item.description)
            : item.description,
        language:
          typeof item.language === "string"
            ? normalizeString(item.language)
            : item.language,
      })),
    }
  }

  if (
    response.type === "calendar" &&
    isCalendarEvent(response.data)
  ) {
    return {
      kind: "calendar_event",
      action:
        typeof response.action === "string" && response.action.trim()
          ? response.action
          : undefined,
      event: {
        ...response.data,
        title: normalizeString(response.data.title),
        event_id: normalizeString(response.data.event_id),
        start: {
          dateTime: normalizeString(response.data.start.dateTime),
          timeZone:
            typeof response.data.start.timeZone === "string"
              ? normalizeString(response.data.start.timeZone)
              : response.data.start.timeZone ?? undefined,
        },
      },
    }
  }

  if (
    response.type === "calendar" &&
    Array.isArray(response.data) &&
    response.data.every(isCalendarSlot)
  ) {
    return {
      kind: "calendar_slots",
      action:
        typeof response.action === "string" && response.action.trim()
          ? response.action
          : undefined,
      slots: response.data.map((item) => ({
        start: normalizeString(item.start),
        end: normalizeString(item.end),
      })),
    }
  }

  if (typeof response.reply === "string" && response.reply.trim()) {
    return {
      kind: "email_reply",
      reply: response.reply,
      approvalRequired:
        typeof response.approval_required === "boolean"
          ? response.approval_required
          : undefined,
      nextStep:
        typeof response.next_step === "string" && response.next_step.trim()
          ? response.next_step
          : undefined,
    }
  }

  const candidates = [
    response.response,
    response.message,
    response.answer,
    response.output,
    response.data,
  ]

  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.trim()) {
      return { kind: "text", text: candidate }
    }
  }

  return { kind: "text", text: JSON.stringify(data) }
}

export async function sendChatMessage(message: string) {
  const { data } = await chatClient.post<unknown>("/agent/chat", null, {
    params: { message },
  })

  return extractChatContent(data)
}
