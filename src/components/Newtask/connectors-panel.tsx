import { useEffect, useMemo, useState } from "react"
import { Link2, X, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
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
import {
  availableConnectors,
  connectorApiKeyMap,
  type Connector,
} from "./connectors-data"
import { ConnectorDetailModal } from "./connector-detail-modal"
import { ConnectorsDialog } from "./connectors-dialog"
import { ConnectorLogo } from "./connector-logo"
import {
  getDefaultConnectorStatuses,
  openConnectorConnectUrl,
  useConnectorsStatusQuery,
} from "@/apis/connectors/list"

export function ConnectorsPanel() {
  const [open, setOpen] = useState(false)
  const [isConnectorsDialogOpen, setIsConnectorsDialogOpen] = useState(false)
  const [selectedConnector, setSelectedConnector] = useState<Connector | null>(
    null
  )
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { data, refetch } = useConnectorsStatusQuery()

  const connectorStatuses = useMemo(
    () => ({
      ...getDefaultConnectorStatuses(),
      ...(data?.connectors ?? {}),
    }),
    [data?.connectors]
  )

  const connectors = useMemo<Connector[]>(
    () =>
      availableConnectors.map((connector) => {
        const apiKey = connectorApiKeyMap[connector.id]

        return {
          ...connector,
          status:
            apiKey && connectorStatuses[apiKey] ? "connected" : "disconnected",
        }
      }),
    [connectorStatuses]
  )

  useEffect(() => {
    if (open) {
      void refetch()
    }
  }, [open, refetch])

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
    const connector = availableConnectors.find((item) => item.id === id) ?? null
    const apiKey = connector ? connectorApiKeyMap[connector.id] : null

    if (!apiKey) return

    openConnectorConnectUrl(apiKey)
    setOpen(false)
    setIsModalOpen(false)
    setSelectedConnector(null)
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
            {connectors.map((connector) => (
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
                      <span className="truncate text-[12px] leading-none font-medium">
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

                <div className="flex items-center gap-2">
                  {/* Show BUTTON only if NOT connected */}
                  {connector.status !== "connected" && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="xs"
                      className={cn(
                        "h-6 rounded-full px-2 text-[8px] font-medium",
                        connector.status === "install"
                          ? "text-chart-4"
                          : "text-muted-foreground"
                      )}
                      disabled={connector.status === "install"}
                      onClick={() =>
                        connector.status === "disconnected" &&
                        handleConnect(connector.id)
                      }
                    >
                      {connector.status === "install" ? "Install" : "Connect"}
                    </Button>
                  )}

                  {/* Show SWITCH only if connected */}
                  {connector.status === "connected" && (
                    <Switch
                      checked
                      disabled
                      className="scale-[0.7] !opacity-100"
                    />
                  )}
                </div>
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
