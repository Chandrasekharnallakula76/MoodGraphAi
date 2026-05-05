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

function decodeHtmlEntities(value: string) {
  if (typeof document === "undefined") {
    return value
  }

  const textarea = document.createElement("textarea")
  textarea.innerHTML = value
  return textarea.value
}

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

function extractChatContent(data: unknown): ChatAssistantResponse {
  if (typeof data === "string") {
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
        subject: decodeHtmlEntities(item.subject),
        from: decodeHtmlEntities(item.from),
        snippet: decodeHtmlEntities(item.snippet),
      })),
    }
  }

  const candidates = [
    response.response,
    response.message,
    response.reply,
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
