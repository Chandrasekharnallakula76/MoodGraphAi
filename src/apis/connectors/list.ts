import axios from "axios"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getStoredToken } from "@/lib/auth"

const apiBaseUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, "") ?? ""

export type ConnectorKey = "gmail" | "calendar" | "tasks" | "github"

export type ConnectorStatusValue =
  | boolean
  | {
      enabled?: boolean
      connected?: boolean
    }

export type ConnectorsResponse = {
  status: "success"
  connectors: Record<ConnectorKey, ConnectorStatusValue>
}

const connectorConnectPathMap: Record<ConnectorKey, string> = {
  gmail: "/auth/google/connect/gmail",
  calendar: "/auth/google/connect/calendar",
  tasks: "/auth/google/connect/tasks",
  github: "/auth/github/connect",
}

const connectorsClient = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "ngrok-skip-browser-warning": "true",
  },
})

connectorsClient.interceptors.request.use((config) => {
  const token = getStoredToken()

  if (token) {
    config.headers = config.headers ?? {}
    config.headers.Authorization = `Bearer ${token}`
    config.headers["ngrok-skip-browser-warning"] = "true"
    config.headers.Accept = "application/json"
  }

  return config
})

export async function fetchConnectorsStatus() {
  const { data } =
    await connectorsClient.get<ConnectorsResponse>("/connectors/")
  return data
}

export function useConnectorsListQuery() {
  const token = getStoredToken()

  return useQuery({
    queryKey: ["connectors-list", token ?? "anonymous"],
    queryFn: fetchConnectorsStatus,
    enabled: false,
    staleTime: 5 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  })
}

export function useConnectorsStatusQuery() {
  return useConnectorsListQuery()
}

export function getDefaultConnectorStatuses(): Record<ConnectorKey, boolean> {
  return {
    gmail: false,
    calendar: false,
    tasks: false,
    github: false,
  }
}

export function isConnectorEnabled(status: ConnectorStatusValue | undefined) {
  if (typeof status === "boolean") {
    return status
  }

  return Boolean(status?.enabled ?? status?.connected)
}

export function isConnectorConnected(
  status: ConnectorStatusValue | undefined
) {
  if (typeof status === "boolean") {
    return status
  }

  return Boolean(status?.connected ?? status?.enabled)
}

export function getConnectorConnectUrl(connectorKey: ConnectorKey) {
  const token = getStoredToken()
  if (!token) return null

  const path = connectorConnectPathMap[connectorKey]
  const query = `token=${encodeURIComponent(token)}`

  return `${apiBaseUrl}${path}?${query}`
}

export function openConnectorConnectUrl(connectorKey: ConnectorKey) {
  const url = getConnectorConnectUrl(connectorKey)
  if (!url || typeof window === "undefined") return false

  window.open(url, "_blank", "noopener,noreferrer")
  return true
}

export async function disconnectConnector(connectorKey: ConnectorKey) {
  const { data } = await connectorsClient.post<ConnectorsResponse>(
    `/connectors/disable/${connectorKey}`
  )
  return data
}

export function useDisconnectConnectorMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: disconnectConnector,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["connectors-list"] })
    },
  })
}
