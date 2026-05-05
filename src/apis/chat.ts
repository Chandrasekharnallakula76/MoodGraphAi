import axios from "axios"
import { getStoredToken } from "@/lib/auth"

const apiBaseUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, "") ?? ""

export type ChatApiResponse = unknown

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

function extractChatContent(data: ChatApiResponse): string {
  if (typeof data === "string") {
    return data
  }

  if (!data || typeof data !== "object") {
    return "No response received."
  }

  const response = data as Record<string, unknown>
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
      return candidate
    }
  }

  return JSON.stringify(data)
}

export async function sendChatMessage(message: string) {
  const { data } = await chatClient.post<ChatApiResponse>("/agent/chat", null, {
    params: { message },
  })

  return extractChatContent(data)
}

