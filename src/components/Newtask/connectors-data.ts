export interface Connector {
  id: string
  name: string
  icon: string
  status: "connected" | "disconnected" | "install"
  beta?: boolean
}

export const availableConnectors: Connector[] = [
  { id: "gmail", name: "Gmail", icon: "gmail", status: "disconnected" },
  { id: "github", name: "GitHub", icon: "github", status: "disconnected" },
  {
    id: "google-calendar",
    name: "Google Calendar",
    icon: "calendar",
    status: "disconnected",
  },
  {
    id: "google-tasks",
    name: "Google Tasks",
    icon: "google-tasks",
    status: "disconnected",
  },
  { id: "browser", name: "My Browser", icon: "browser", status: "install" },
  {
    id: "meta",
    name: "Meta Ads Manager",
    icon: "meta",
    status: "disconnected",
    beta: true,
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: "instagram",
    status: "disconnected",
    beta: true,
  },
  {
    id: "instagram-market",
    name: "Instagram Creator Marketplace",
    icon: "instagram",
    status: "disconnected",
    beta: true,
  },
  {
    id: "outlook",
    name: "Outlook Mail",
    icon: "outlook",
    status: "disconnected",
  },
  {
    id: "ocalendar",
    name: "Outlook Calendar",
    icon: "calendar",
    status: "disconnected",
  },
]
