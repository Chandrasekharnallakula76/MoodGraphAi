import type { ConnectorKey } from "@/apis/connectors/list"

export type ConnectorStatus = "connected" | "disconnected" | "install"

export interface Connector {
  id: string
  name: string
  icon: string
  beta?: boolean
  status?: ConnectorStatus
}

export const availableConnectors: Connector[] = [
  { id: "gmail", name: "Gmail", icon: "gmail" },
  { id: "github", name: "GitHub", icon: "github" },
  {
    id: "google-calendar",
    name: "Google Calendar",
    icon: "calendar",
  },
  {
    id: "google-tasks",
    name: "Google Tasks",
    icon: "google-tasks",
  },
]

export const connectorApiKeyMap: Record<string, ConnectorKey> = {
  gmail: "gmail",
  github: "github",
  "google-calendar": "calendar",
  "google-tasks": "tasks",
}
