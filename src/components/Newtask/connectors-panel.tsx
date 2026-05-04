import { useEffect, useRef, useState } from "react"
import {
  Link2,
  X,
  Plus,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { ConnectorDetailModal } from "./connector-detail-modal"
import { ConnectorsDialog } from "./connectors-dialog"
import { ConnectorLogo } from "./connector-logo"

export interface Connector {
  id: string
  name: string
  icon: string
  status: "connected" | "disconnected" | "install"
  beta?: boolean
}

export const availableConnectors: Connector[] = [
  { id: "github", name: "GitHub", icon: "github", status: "disconnected" },
  { id: "gmail", name: "Gmail", icon: "gmail", status: "disconnected" },
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
    id: "gcalendar",
    name: "Google Calendar",
    icon: "calendar",
    status: "disconnected",
  },
  {
    id: "ocalendar",
    name: "Outlook Calendar",
    icon: "calendar",
    status: "disconnected",
  },
]

interface ConnectorsPanelProps {
  selectedConnectors: string[]
}

export function ConnectorsPanel({
  selectedConnectors,
}: ConnectorsPanelProps) {
  const [open, setOpen] = useState(false)
  const [isConnectorsDialogOpen, setIsConnectorsDialogOpen] = useState(false)
  const [selectedConnector, setSelectedConnector] = useState<Connector | null>(
    null
  )
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [pendingConnectorId, setPendingConnectorId] = useState<string | null>(
    null
  )
  const connectTimerRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (connectTimerRef.current) {
        window.clearTimeout(connectTimerRef.current)
      }
    }
  }, [])

  const handleConnectorClick = (connector: Connector) => {
    if (connector.status !== "install") {
      setSelectedConnector(connector)
      setIsModalOpen(true)
      setOpen(false)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedConnector(null)
  }

  const handleConnect = (id: string) => {
    if (pendingConnectorId) return

    if (connectTimerRef.current) {
      window.clearTimeout(connectTimerRef.current)
    }

    setPendingConnectorId(id)
    connectTimerRef.current = window.setTimeout(() => {
      const connector = availableConnectors.find((item) => item.id === id) ?? null

      if (connector) {
        setSelectedConnector(connector)
        setIsModalOpen(true)
      }

      setPendingConnectorId(null)
      setOpen(false)
      connectTimerRef.current = null
    }, 650)
  }

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon-xs"
                className="cursor-pointer rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <Link2 className="size-3" />
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent side="top">Connectors</TooltipContent>
        </Tooltip>
        <PopoverContent
          className="w-72 border-border bg-card p-0 shadow-xl"
          align="start"
          side="bottom"
          sideOffset={8}
          avoidCollisions={true}
          collisionPadding={8}
        >
          <div className="flex items-center justify-between border-b border-border px-3 py-1.5">
            <span className="text-xs font-semibold">Connectors</span>
            <Button
              variant="ghost"
              size="icon-xs"
              className="rounded-md"
              onClick={() => setOpen(false)}
            >
              <X className="size-3" />
            </Button>
          </div>
          <div className="scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent max-h-64 overflow-y-auto py-0.5">
            {availableConnectors.map((connector) => (
              <div
                key={connector.id}
                className="flex items-center justify-between px-3 py-1.5 transition-colors hover:bg-accent/40"
              >
                <button
                  type="button"
                  onClick={() => handleConnectorClick(connector)}
                  className="flex min-w-0 items-center gap-1.5 text-left"
                >
                  <div className="flex size-5 items-center justify-center overflow-hidden rounded-md bg-muted">
                    <ConnectorLogo icon={connector.icon} className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="truncate text-[12px] font-medium leading-none">
                        {connector.name}
                      </span>
                      {connector.beta ? (
                        <span className="rounded bg-muted px-1 py-0.5 text-[7px] text-muted-foreground">
                          Beta
                        </span>
                      ) : null}
                    </div>
                  </div>
                </button>

                <Button
                  type="button"
                  variant={
                    selectedConnectors.includes(connector.id)
                      ? "secondary"
                      : "ghost"
                  }
                  size="xs"
                  className={cn(
                    "h-6 rounded-full px-2 text-[8px] font-medium",
                    connector.status === "install"
                      ? "text-chart-4"
                      : selectedConnectors.includes(connector.id)
                        ? "bg-primary/10 text-primary hover:bg-primary/15"
                        : "text-muted-foreground"
                  )}
                  disabled={
                    connector.status === "install" ||
                    selectedConnectors.includes(connector.id) ||
                    pendingConnectorId === connector.id
                  }
                  onClick={() =>
                    connector.status === "disconnected" &&
                    handleConnect(connector.id)
                  }
                >
                  {pendingConnectorId === connector.id ? (
                    <>
                      <Loader2 className="mr-1 size-2 animate-spin" />
                      Loading
                    </>
                  ) : connector.status === "install" ? (
                    "Install"
                  ) : selectedConnectors.includes(connector.id) ? (
                    "Connected"
                  ) : (
                    "Connect"
                  )}
                </Button>
              </div>
            ))}
          </div>
          <div className="border-t border-border px-3 py-1.5">
            <button
              type="button"
              onClick={() => {
                setOpen(false)
                setIsConnectorsDialogOpen(true)
              }}
              className="flex items-center gap-2 text-[11px] text-muted-foreground transition-colors hover:text-foreground"
            >
              <Plus className="size-2.5 cursor-pointer" />
              <span>Add connectors</span>
              <span className="ml-auto flex items-center gap-1">
                <span className="rounded bg-muted px-1.5 py-0.5 text-[9px]">
                  +70
                </span>
              </span>
            </button>
          </div>
        </PopoverContent>
      </Popover>

      <ConnectorsDialog
        open={isConnectorsDialogOpen}
        onOpenChange={setIsConnectorsDialogOpen}
      />

      <ConnectorDetailModal
        connector={selectedConnector}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConnect={handleConnect}
      />
    </>
  )
}
