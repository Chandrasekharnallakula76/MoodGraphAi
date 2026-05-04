import { useState, useRef, useEffect } from "react"
import {
  Plus,
  Paperclip,
  Sparkles,
  Database,
  Cloud,
  Frame,
  ChevronRight,
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

interface FileSourceItem {
  id: string
  label: string
  icon: React.ReactNode
  hasSubmenu?: boolean
  color?: string
}

const fileSources: FileSourceItem[] = [
  {
    id: "local",
    label: "Add from local files",
    icon: <Paperclip className="size-4" />,
  },
  {
    id: "skills",
    label: "Use Skills",
    icon: <Sparkles className="size-4" />,
    hasSubmenu: true,
  },
  {
    id: "drive",
    label: "Add from Google Drive files",
    icon: <Database className="size-4 text-green-500" />,
    color: "text-green-500",
  },
  {
    id: "onedrive",
    label: "Add from OneDrive files",
    icon: <Cloud className="size-4 text-blue-500" />,
    hasSubmenu: true,
    color: "text-blue-500",
  },
  {
    id: "figma",
    label: "Add from Figma",
    icon: <Frame className="size-4 text-purple-500" />,
    color: "text-purple-500",
  },
]

const oneDriveSubmenu = [
  { id: "personal", label: "Personal" },
  { id: "work", label: "Work / School" },
]

export function FileSources() {
  const [open, setOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleMouseEnter = (itemId: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setHoveredItem(itemId)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoveredItem(null)
    }, 100)
  }

  const handleSubmenuMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  const handleSubmenuMouseLeave = () => {
    setHoveredItem(null)
  }

  const handleItemClick = (item: FileSourceItem) => {
    if (!item.hasSubmenu) {
      console.log("Selected:", item.id)
      setOpen(false)
    }
  }

  const handleSubmenuClick = (id: string) => {
    console.log("OneDrive selected:", id)
    setHoveredItem(null)
    setOpen(false)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const showSubmenu = hoveredItem === "onedrive"

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon-xs"
              className="cursor-pointer rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <Plus className="size-3.5" />
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>
        <TooltipContent side="top">Add files</TooltipContent>
      </Tooltip>
      <PopoverContent
        className="w-64 p-0 bg-card border-border shadow-xl"
        align="start"
        side="top"
        sideOffset={8}
        avoidCollisions={true}
        collisionPadding={8}
      >
        <div className="relative">
          {/* Main menu */}
          <div className="p-2 space-y-1">
            {fileSources.map((item) => (
              <div
                key={item.id}
                onMouseEnter={() => handleMouseEnter(item.id)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => handleItemClick(item)}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs text-foreground transition-colors hover:bg-accent/50"
                >
                  <div className="flex items-center gap-3">
                    <span className={cn("text-muted-foreground", item.color)}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  {item.hasSubmenu && (
                    <ChevronRight className="size-4 text-muted-foreground" />
                  )}
                </button>
              </div>
            ))}
          </div>

          {/* OneDrive submenu - appears on hover beside the item */}
          {showSubmenu && (
            <div
              className="absolute left-full ml-1 w-48 p-2 bg-card border border-border rounded-xl shadow-xl"
              style={{ top: "calc(3 * 36px + 8px)" }}
              onMouseEnter={handleSubmenuMouseEnter}
              onMouseLeave={handleSubmenuMouseLeave}
            >
              <div className="space-y-1">
                {oneDriveSubmenu.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSubmenuClick(item.id)}
                    className="flex w-full items-center rounded-lg px-3 py-2 text-xs text-foreground transition-colors hover:bg-accent/50"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
