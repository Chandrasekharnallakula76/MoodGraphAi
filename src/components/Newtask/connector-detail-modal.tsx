import { useEffect, useRef, useState } from "react"
import { X, Plus, ChevronDown, Loader2, Copy, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ConnectorLogo } from "./connector-logo"

interface Connector {
  id: string
  name: string
  icon: string
  status: "connected" | "disconnected" | "install"
  beta?: boolean
}

interface ConnectorDetailModalProps {
  connector: Connector | null
  isOpen: boolean
  onClose: () => void
  onConnect: (id: string) => void
}

const connectorDescriptions: Record<string, string> = {
  github:
    "Access, search, and organize repos, track issues, review pull requests, and automate workflows directly in MoodGraph.",
  gmail:
    "Send, read, and manage emails from your Gmail account directly in MoodGraph.",
  browser:
    "Access your browser data, bookmarks, and history to enhance your workflow.",
  "google-tasks":
    "Create, organize, and manage Google Tasks directly from MoodGraph.",
  meta: "Manage Meta Ads campaigns, view analytics, and optimize your advertising directly in MoodGraph.",
  instagram:
    "Schedule posts, view insights, and manage your Instagram presence from MoodGraph.",
  outlook:
    "Send, read, and manage emails from your Outlook account directly in MoodGraph.",
  "google-calendar":
    "View, create, and manage events in your Google Calendar from MoodGraph.",
  ocalendar:
    "View, create, and manage events in your Outlook Calendar from MoodGraph.",
}

const connectorMetadata: Record<
  string,
  {
    type: string
    author: string
    uuid: string
    website: string
    privacyPolicy: string
  }
> = {
  github: {
    type: "App",
    author: "MoodGraph",
    uuid: "github-conn-001",
    website: "https://github.com",
    privacyPolicy: "https://github.com/privacy",
  },
  gmail: {
    type: "App",
    author: "MoodGraph",
    uuid: "gmail-conn-001",
    website: "https://gmail.com",
    privacyPolicy: "https://policies.google.com/privacy",
  },
  browser: {
    type: "Extension",
    author: "MoodGraph",
    uuid: "browser-conn-001",
    website: "https://manus.im",
    privacyPolicy: "https://manus.im/privacy",
  },
  meta: {
    type: "App",
    author: "MoodGraph",
    uuid: "meta-conn-001",
    website: "https://business.facebook.com",
    privacyPolicy: "https://www.facebook.com/privacy/policy",
  },
  instagram: {
    type: "App",
    author: "MoodGraph",
    uuid: "instagram-conn-001",
    website: "https://instagram.com",
    privacyPolicy: "https://help.instagram.com/519522125107875",
  },
  outlook: {
    type: "App",
    author: "MoodGraph",
    uuid: "outlook-conn-001",
    website: "https://outlook.com",
    privacyPolicy: "https://privacy.microsoft.com",
  },
  "google-calendar": {
    type: "App",
    author: "MoodGraph",
    uuid: "gcal-conn-001",
    website: "https://calendar.google.com",
    privacyPolicy: "https://policies.google.com/privacy",
  },
  "google-tasks": {
    type: "App",
    author: "MoodGraph",
    uuid: "gtasks-conn-001",
    website: "https://tasks.google.com",
    privacyPolicy: "https://policies.google.com/privacy",
  },
  ocalendar: {
    type: "App",
    author: "MoodGraph",
    uuid: "ocal-conn-001",
    website: "https://outlook.com/calendar",
    privacyPolicy: "https://privacy.microsoft.com",
  },
}

export function ConnectorDetailModal({
  connector,
  isOpen,
  onClose,
  onConnect,
}: ConnectorDetailModalProps) {
  if (!isOpen || !connector) return null

  return (
    <ConnectorDetailModalContent
      key={connector.id}
      connector={connector}
      onClose={onClose}
      onConnect={onConnect}
    />
  )
}

interface ConnectorDetailModalContentProps {
  connector: Connector
  onClose: () => void
  onConnect: (id: string) => void
}

function ConnectorDetailModalContent({
  connector,
  onClose,
  onConnect,
}: ConnectorDetailModalContentProps) {
  const [showDetails, setShowDetails] = useState(false)
  const [localStatus, setLocalStatus] = useState<
    "connected" | "disconnected" | "install"
  >(connector.status)
  const [isConnecting, setIsConnecting] = useState(false)
  const connectTimerRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (connectTimerRef.current) {
        window.clearTimeout(connectTimerRef.current)
      }
    }
  }, [])

  const description =
    connectorDescriptions[connector.id] ||
    `Connect to ${connector.name} to enhance your workflow in MoodGraph.`
  const metadata = connectorMetadata[connector.id]

  const isConnected = localStatus === "connected"

  const handleConnect = () => {
    if (isConnected || localStatus === "install" || isConnecting) return

    if (connectTimerRef.current) {
      window.clearTimeout(connectTimerRef.current)
    }

    setIsConnecting(true)
    connectTimerRef.current = window.setTimeout(() => {
      setIsConnecting(false)
      setLocalStatus("connected")
      onConnect(connector.id)
      connectTimerRef.current = null
    }, 650)
  }

  const handleCopyUUID = () => {
    if (metadata?.uuid) {
      navigator.clipboard.writeText(metadata.uuid)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-sm rounded-3xl border border-border bg-card p-5 shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="size-4" />
        </button>

        {/* Header - Icon and Name */}
        <div className="flex flex-col items-center text-center">
          <div className="flex size-16 items-center justify-center overflow-hidden rounded-3xl bg-muted/70">
            <ConnectorLogo
              icon={connector.icon}
              className="size-9 object-contain"
            />
          </div>
          <h2 className="mt-4 text-xl font-semibold text-foreground">
            {connector.name}
          </h2>
          <p className="mt-1.5 max-w-sm text-center text-xs leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>

        {/* Connect Button */}
        <div className="mt-6 flex justify-center">
          <Button
            onClick={handleConnect}
            variant="outline"
            className="h-9 gap-2 rounded-full border-border bg-background px-4 text-xs font-medium hover:bg-accent"
            disabled={localStatus === "install" || isConnected || isConnecting}
          >
            {isConnecting ? (
              <>
                <Loader2 className="size-3.5 animate-spin" />
                Loading
              </>
            ) : isConnected ? (
              <>
                <span className="size-2 rounded-full bg-emerald-400" />
                Connected
              </>
            ) : (
              <>
                <Plus className="size-3.5" />
                Connect
              </>
            )}
          </Button>
        </div>

        {/* Show Details Toggle */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="mt-4 flex w-full items-center justify-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          {showDetails ? "Hide Details" : "Show Details"}
          <ChevronDown
            className={`size-3.5 transition-transform ${showDetails ? "rotate-180" : ""}`}
          />
        </button>

        {/* Details Section */}
        {showDetails && metadata && (
          <div className="mt-3 space-y-2.5 rounded-xl bg-muted/50 p-3.5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                Connector Type
              </span>
              <span className="text-xs font-medium text-foreground">
                {metadata.type}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Author</span>
              <span className="text-xs font-medium text-foreground">
                {metadata.author}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">UUID</span>
              <div className="flex items-center gap-1">
                <span className="text-xs font-medium text-primary">
                  {metadata.uuid}
                </span>
                <button
                  onClick={handleCopyUUID}
                  className="text-primary transition-colors hover:text-primary/80"
                >
                  <Copy className="size-3" />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Website</span>
              <a
                href={metadata.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
              >
                <ExternalLink className="size-3" />
              </a>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                Privacy Policy
              </span>
              <a
                href={metadata.privacyPolicy}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
              >
                <ExternalLink className="size-3" />
              </a>
            </div>
          </div>
        )}

        {/* Feedback Link */}
        {showDetails && (
          <div className="mt-3 text-center">
            <button className="text-xs text-muted-foreground underline underline-offset-2 transition-colors hover:text-foreground">
              Provide feedback
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
