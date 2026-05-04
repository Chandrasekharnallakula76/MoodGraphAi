import { useRef, useState } from "react"
import {
  User,
  Settings,
  BarChart3,
  Calendar,
  Mail,
  Database,
  Cloud,
  Monitor,
  Sparkles,
  Puzzle,
  Plug,
  Wrench,
  HelpCircle,
  ChevronsUpDown,
  Check,
  Plus,
} from "lucide-react"
import { NavLink } from "react-router-dom"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import CreateAccount from "./createaccount"
import { cn } from "@/lib/utils"

const menuItems = [
  { label: "Cuenta", icon: User, path: "/settings/cuenta" },
  { label: "Configuración", icon: Settings, path: "/settings/configuracion" },
  { label: "Uso", icon: BarChart3, path: "/settings/uso" },
  { label: "Tareas programadas", icon: Calendar, path: "/settings/tareas-programadas" },
  { label: "Correo MoodGraph", icon: Mail, path: "/settings/correo-moodgraph" },
  { label: "Controles de datos", icon: Database, path: "/settings/controles-datos" },
  { label: "Navegador en la nube", icon: Cloud, path: "/settings/navegador-nube" },
  { label: "Mi computadora", icon: Monitor, path: "/settings/mi-computadora" },
  { label: "Personalización", icon: Sparkles, path: "/settings/personalizacion" },
  { label: "Habilidades", icon: Puzzle, path: "/settings/habilidades" },
  { label: "Conectores", icon: Plug, path: "/settings/conectores" },
  { label: "Integraciones", icon: Wrench, path: "/settings/integraciones" },
]

interface SidebarProps {
  className?: string
  onNavigate?: () => void
}

const Sidebar = ({ className, onNavigate }: SidebarProps) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isTeamDialogOpen, setIsTeamDialogOpen] = useState(false)

  const closeTimerRef = useRef<number | null>(null)

  const handlePopoverOpen = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
    setIsProfileOpen(true)
  }

  const handlePopoverClose = () => {
    closeTimerRef.current = window.setTimeout(() => {
      setIsProfileOpen(false)
    }, 120)
  }

  const openTeamDialog = () => {
    setIsProfileOpen(false)
    setIsTeamDialogOpen(true)
  }

  return (
    <div
      className={cn(
        "flex h-full w-full shrink-0 flex-col justify-between overflow-y-auto border-r border-border bg-background p-3 text-foreground md:w-64",
        className
      )}
    >
      <div>
        <Popover open={isProfileOpen} onOpenChange={setIsProfileOpen}>
          <PopoverTrigger asChild>
            <button
              onMouseEnter={handlePopoverOpen}
              onMouseLeave={handlePopoverClose}
              className="flex w-full items-center justify-between rounded-xl px-1.5 py-1.5 transition-colors hover:bg-accent"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-sm font-semibold text-white">
                  C
                </div>
                <div className="text-left">
                  <p className="max-w-[8.5rem] truncate text-sm font-medium">
                    Chandrasekhar
                  </p>
                  <p className="text-xs text-muted-foreground">Personal</p>
                </div>
              </div>
              <ChevronsUpDown className="size-4 text-muted-foreground" />
            </button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            sideOffset={8}
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
            className="w-[220px] rounded-2xl border border-border bg-popover p-2"
          >
            <div className="space-y-1.5">
              <button className="flex w-full items-center justify-between rounded-xl bg-muted px-2 py-1.5">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-xs font-semibold text-white">
                    C
                  </div>
                  <div className="text-left">
                    <p className="max-w-[6.5rem] truncate text-xs font-medium">
                      Chandrasekhar
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      Personal
                    </p>
                  </div>
                </div>
                <Check className="size-3.5 text-muted-foreground" />
              </button>

              <div className="h-px bg-border" />

              <button
                onClick={openTeamDialog}
                className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Plus className="size-3.5" />
                Create a team
              </button>
            </div>
          </PopoverContent>
        </Popover>

        <div className="my-2 border-t border-border" />

        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onNavigate}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-xs transition-colors ${
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`
                }
              >
                <Icon size={15} />
                <span>{item.label}</span>
              </NavLink>
            )
          })}
        </div>
      </div>

      <div>
        <div className="my-2 border-t border-border" />
        <button className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
          <HelpCircle size={15} />
          <span>Obtener ayuda</span>
        </button>
      </div>

      <Dialog open={isTeamDialogOpen} onOpenChange={setIsTeamDialogOpen}>
        <DialogContent className="h-[90vh] overflow-hidden p-0 sm:max-w-3xl">
          <CreateAccount />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Sidebar
