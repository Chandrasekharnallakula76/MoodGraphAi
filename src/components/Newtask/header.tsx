import {
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  FileText,
  HelpCircle,
  Home,
  LogOut,
  Menu,
  Settings,
  Sparkles,
  User,
} from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { SubscriptionPlanDialog } from "@/components/ui/subscription-plan-dialog"

type HeaderProps = {
  onOpenSidebar?: () => void
}

type ProfileMenuProps = {
  compact?: boolean
}

type ActionClusterProps = {
  compact?: boolean
  onOpenNotifications: () => void
  onOpenSubscription: () => void
}

function ProfileMenu({ compact = false }: ProfileMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={
            compact
              ? "flex items-center gap-1.5 rounded-full border border-border/70 bg-card px-1.5 py-1 shadow-sm transition-colors hover:bg-muted"
              : "flex items-center gap-2 rounded-full border border-border/70 bg-card px-2 py-1.5 shadow-sm transition-colors hover:bg-muted"
          }
        >
          <Avatar className={compact ? "size-6" : "size-7"}>
            <AvatarFallback>C</AvatarFallback>
          </Avatar>
          <ChevronDown
            className={
              compact
                ? "size-3 text-muted-foreground"
                : "size-3.5 text-muted-foreground"
            }
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 text-xs">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span className="text-xs font-medium">Chandrasekhar</span>
            <span className="text-[11px] text-muted-foreground">
              nallakulasekhar9999@gmail.com
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex justify-between text-xs">
          <span>Gratis</span>
          <span className="text-[11px]">Actualizar</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex justify-between text-xs">
          <div className="flex items-center gap-2">
            <Sparkles className="size-3.5" />
            Creditos
          </div>
          <span>300</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-xs">
          <User className="mr-2 size-3.5" />
          Cuenta
        </DropdownMenuItem>
        <DropdownMenuItem className="text-xs">
          <Settings className="mr-2 size-3.5" />
          Configuracion
        </DropdownMenuItem>
        <DropdownMenuItem className="text-xs">
          <Home className="mr-2 size-3.5" />
          Pagina principal
        </DropdownMenuItem>
        <DropdownMenuItem className="text-xs">
          <HelpCircle className="mr-2 size-3.5" />
          Obtener ayuda
        </DropdownMenuItem>
        <DropdownMenuItem className="text-xs">
          <FileText className="mr-2 size-3.5" />
          Documentos
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-xs text-destructive focus:text-destructive">
          <LogOut className="mr-2 size-3.5" />
          Cerrar sesion
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function ActionCluster({
  compact = false,
  onOpenNotifications,
  onOpenSubscription,
}: ActionClusterProps) {
  return (
    <div
      className={
        compact ? "flex items-center gap-1.5" : "flex items-center gap-2"
      }
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className={
              compact
                ? "h-8 gap-1 rounded-full bg-primary px-3 text-[11px] font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
                : "h-9 gap-1.5 rounded-full bg-primary px-4 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
            }
          >
            <Sparkles className={compact ? "size-3" : "size-3.5"} />
            Upgrade
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          sideOffset={8}
          className="w-72 rounded-2xl p-3 text-xs"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold">Gratis</p>
              <Button
                variant="secondary"
                className="h-7 rounded-xl px-3 text-[11px] font-semibold"
                onClick={onOpenSubscription}
              >
                Actualizar
              </Button>
            </div>
            <DropdownMenuSeparator />
            <div className="space-y-0.5">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-xs font-semibold">
                  <Sparkles className="size-3.5 text-muted-foreground" />
                  Creditos
                  <CircleHelp className="size-3.5 text-muted-foreground" />
                </span>
                <span className="text-xs font-semibold">0</span>
              </div>
              <p className="text-xs text-muted-foreground">Creditos gratis</p>
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-xs font-semibold">
                  <CalendarDays className="size-3.5 text-muted-foreground" />
                  Creditos de actualizacion diaria
                  <CircleHelp className="size-3.5 text-muted-foreground" />
                </span>
                <span className="text-xs font-semibold">300</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Actualizar a 300 a las 00:30 cada dia
              </p>
            </div>
            <button
              type="button"
              className="inline-flex cursor-pointer items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
            >
              Ver uso
              <ChevronRight className="size-3.5" />
            </button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        variant="ghost"
        size="icon"
        className={
          compact
            ? "size-8 rounded-full border border-border/70 bg-card text-muted-foreground shadow-sm hover:bg-muted hover:text-foreground"
            : "size-9 rounded-full border border-border/70 bg-card text-muted-foreground shadow-sm hover:bg-muted hover:text-foreground"
        }
        aria-label="Notificaciones"
        onClick={onOpenNotifications}
      >
        <Bell className={compact ? "size-3.5" : "size-4"} />
      </Button>

      <ProfileMenu compact={compact} />
    </div>
  )
}

export function Header({ onOpenSidebar }: HeaderProps) {
  const [selectedModel, setSelectedModel] = useState("MoodGraph 1.6 Lite")
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState(false)

  const navigate = useNavigate()

  const openNotifications = () => {
    navigate("/notificaciones")
  }

  return (
    <header className="border-b border-border bg-background">
      <div className="flex h-12 items-center gap-2 px-3 md:hidden">
        <button
          type="button"
          onClick={onOpenSidebar}
          disabled={!onOpenSidebar}
          className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-border/70 bg-card text-muted-foreground shadow-sm transition-colors hover:bg-accent hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Open sidebar"
        >
          <Menu className="size-3.5" />
        </button>

        <div className="min-w-0 flex-1" />
        <ActionCluster
          compact
          onOpenNotifications={openNotifications}
          onOpenSubscription={() => setSubscriptionDialogOpen(true)}
        />
      </div>

      <div className="hidden h-11 items-center justify-between px-3 md:flex">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-md border border-border/80 bg-muted/20 px-3 py-1.5 hover:bg-muted">
              <span className="text-xs font-medium">{selectedModel}</span>
              <ChevronDown className="size-3.5 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-72 p-1.5 text-xs">
            <button
              type="button"
              onClick={() => setSelectedModel("MoodGraph 1.6 Max")}
              className={`w-full rounded-lg px-2 py-1.5 text-left hover:bg-muted/60 ${
                selectedModel === "MoodGraph 1.6 Max" ? "bg-muted/60" : ""
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="inline-flex items-center gap-1">
                    <span className="text-xs font-semibold">
                      MoodGraph 1.6 Max
                    </span>
                    <span className="rounded bg-primary/20 px-1 py-0.5 text-[10px] text-primary">
                      Pro
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    Agente de alto rendimiento disenado para tareas complejas.
                  </p>
                </div>
                {selectedModel === "MoodGraph 1.6 Max" ? (
                  <Check className="size-3.5 text-muted-foreground" />
                ) : null}
              </div>
            </button>
            <button
              type="button"
              onClick={() => setSelectedModel("MoodGraph 1.6")}
              className={`mt-1 w-full rounded-lg px-2 py-1.5 text-left hover:bg-muted/60 ${
                selectedModel === "MoodGraph 1.6" ? "bg-muted/60" : ""
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="inline-flex items-center gap-1">
                    <span className="text-xs font-semibold">MoodGraph 1.6</span>
                    <span className="rounded bg-primary/20 px-1 py-0.5 text-[10px] text-primary">
                      Pro
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    Agente versatil capaz de realizar la mayoria de las tareas.
                  </p>
                </div>
                {selectedModel === "MoodGraph 1.6" ? (
                  <Check className="size-3.5 text-muted-foreground" />
                ) : null}
              </div>
            </button>
            <button
              type="button"
              onClick={() => setSelectedModel("MoodGraph 1.6 Lite")}
              className={`mt-1 flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left hover:bg-muted ${
                selectedModel === "MoodGraph 1.6 Lite" ? "bg-muted/60" : ""
              }`}
            >
              <div>
                <p className="text-xs font-semibold">MoodGraph 1.6 Lite</p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  Un agente ligero para tareas diarias.
                </p>
              </div>
              {selectedModel === "MoodGraph 1.6 Lite" ? (
                <Check className="size-3.5 text-muted-foreground" />
              ) : null}
            </button>
          </DropdownMenuContent>
        </DropdownMenu>

        <ActionCluster
          onOpenNotifications={openNotifications}
          onOpenSubscription={() => setSubscriptionDialogOpen(true)}
        />
      </div>
      <SubscriptionPlanDialog
        open={subscriptionDialogOpen}
        onOpenChange={setSubscriptionDialogOpen}
      />
    </header>
  )
}
