import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Plus,
  Bot,
  Search,
  Library,
  FolderGit2,
  LoaderCircle,
  CheckCircle2,
  Clock,
  MoreHorizontal,
  ChevronDown,
  ChevronRight,
  PanelLeft,
  Globe,
  AtSign,
  Layers,
  SlidersHorizontal,
  LayoutDashboard,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

// Reusable footer component for both sidebar states
interface SidebarFooterProps {
  isCollapsed: boolean
  onExpand: () => void
  onOpenSettings: () => void
  onOpenPersonalization: () => void
}

function SidebarFooter({
  isCollapsed,
  onExpand,
  onOpenSettings,
  onOpenPersonalization,
}: SidebarFooterProps) {
  if (isCollapsed) {
    return (
      <div className="space-y-1 border-t border-border p-2">
        <Button
          variant="ghost"
          size="icon"
          className="size-9 w-full rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
          onClick={onExpand}
        >
          <PanelLeft className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="size-9 w-full rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
          onClick={onOpenSettings}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="flex size-full items-center justify-center">
                <SlidersHorizontal className="size-4" />
              </span>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="size-9 w-full rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
          onClick={onOpenPersonalization}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="flex size-full items-center justify-center">
                <LayoutDashboard className="size-4" />
              </span>
            </TooltipTrigger>
            <TooltipContent side="right">Personalization</TooltipContent>
          </Tooltip>
        </Button>
      </div>
    )
  }

  return (
    <div className="border-t border-border p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Button
            variant="ghost"
            size="icon"
            className="size-7 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
            onClick={onOpenSettings}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="flex size-full items-center justify-center">
                  <SlidersHorizontal className="size-4" />
                </span>
              </TooltipTrigger>
              <TooltipContent side="top">Settings</TooltipContent>
            </Tooltip>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-7 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
            onClick={onOpenPersonalization}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="flex size-full items-center justify-center">
                  <LayoutDashboard className="size-4" />
                </span>
              </TooltipTrigger>
              <TooltipContent side="top">Personalization</TooltipContent>
            </Tooltip>
          </Button>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Globe className="size-4" />
          <span className="text-[11px]">from</span>
          <AtSign className="size-4" />
        </div>
      </div>
    </div>
  )
}

interface Task {
  id: string
  title: string
  status: "completed" | "in_progress" | "pending"
  time?: string
}

interface TaskGroup {
  id: string
  title: string
  tasks: Task[]
}

const taskGroups: TaskGroup[] = [
  {
    id: "today",
    title: "Today",
    tasks: [
      {
        id: "1",
        title: "UI design mockups",
        status: "completed",
        time: "2h ago",
      },
      {
        id: "2",
        title: "Component library setup",
        status: "in_progress",
        time: "4h ago",
      },
    ],
  },
]

const allTasks: Task[] = []

interface SidebarProps {
  activeNav: string
  setActiveNav: (nav: string) => void
  onOpenSettings: (route: string) => void
  onOpenPersonalization: (route: string) => void
  onNavigate?: () => void
  className?: string
  showHeader?: boolean
}

export function Sidebar({
  activeNav,
  setActiveNav,
  onOpenSettings,
  onOpenPersonalization,
  onNavigate,
  className,
  showHeader = true,
}: SidebarProps) {
  const navigate = useNavigate()
  const [expandedGroups, setExpandedGroups] = useState<string[]>(["today"])
  const [selectedTask, setSelectedTask] = useState("1")
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isLogoHovered, setIsLogoHovered] = useState(false)
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false)
  const [isCreatingProject, setIsCreatingProject] = useState(false)
  const [projectName, setProjectName] = useState("")
  const [projectInstructions, setProjectInstructions] = useState("")

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId]
    )
  }

  const isExpanded = !isCollapsed

  const handleNavigate = (nav: string) => {
    setActiveNav(nav)
    onNavigate?.()
  }

  const handleOpenSettings = (route: string) => {
    onOpenSettings(route)
    onNavigate?.()
  }

  const handleOpenPersonalization = (route: string) => {
    onOpenPersonalization(route)
    onNavigate?.()
  }

  const handleOpenNewProject = () => {
    setIsCreateProjectOpen(true)
  }

  const handleCreateProject = () => {
    const normalizedProjectName = projectName.trim()
    if (!normalizedProjectName || isCreatingProject) return

    setIsCreatingProject(true)
    window.setTimeout(() => {
      setIsCreatingProject(false)
      setIsCreateProjectOpen(false)
      navigate("/project/new", {
        state: {
          projectName: normalizedProjectName,
          projectInstructions: projectInstructions.trim(),
        },
      })
      setProjectName("")
      setProjectInstructions("")
      onNavigate?.()
    }, 450)
  }

  if (!isExpanded) {
    // Collapsed sidebar - only icons
    return (
      <div
        className={cn(
          "flex h-full w-14 flex-col border-r border-border bg-background",
          className
        )}
      >
        {showHeader ? (
          <div
            className="relative flex items-center justify-center p-3"
            onMouseEnter={() => setIsLogoHovered(true)}
            onMouseLeave={() => setIsLogoHovered(false)}
          >
            {isLogoHovered ? (
              <Button
                variant="ghost"
                size="icon"
                className="size-8 rounded-lg bg-muted text-foreground hover:bg-accent"
                onClick={() => {
                  setIsCollapsed(false)
                  setIsLogoHovered(false)
                }}
              >
                <PanelLeft className="size-4" />
              </Button>
            ) : (
              <div className="flex size-7 items-center justify-center rounded-lg bg-white">
                <Layers className="size-4 text-black" />
              </div>
            )}
          </div>
        ) : null}

        {/* Navigation Icons */}
        <div className="space-y-1 px-2 py-2">
          <button
            onClick={() => handleNavigate("newtask")}
            className={cn(
              "flex w-full items-center justify-center rounded-lg p-2 transition-colors",
              activeNav === "newtask"
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
            )}
          >
            <Plus className="size-4" />
          </button>
          <button
            onClick={() => handleNavigate("agents")}
            className={cn(
              "flex w-full items-center justify-center rounded-lg p-2 transition-colors",
              activeNav === "agents"
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
            )}
          >
            <Bot className="size-4" />
          </button>
          <button
            onClick={() => handleNavigate("search")}
            className={cn(
              "flex w-full items-center justify-center rounded-lg p-2 transition-colors",
              activeNav === "search"
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
            )}
          >
            <Search className="size-4" />
          </button>
          <button
            onClick={() => handleNavigate("library")}
            className={cn(
              "flex w-full items-center justify-center rounded-lg p-2 transition-colors",
              activeNav === "library"
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
            )}
          >
            <Library className="size-4" />
          </button>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        <SidebarFooter
          isCollapsed={true}
          onExpand={() => setIsCollapsed(false)}
          onOpenSettings={() => handleOpenSettings("configuracion")}
          onOpenPersonalization={() =>
            handleOpenPersonalization("personalizacion")
          }
        />
      </div>
    )
  }

  return (
    <>
      <div
        className={cn(
          "flex h-full w-65 flex-col border-r border-border bg-background",
          className
        )}
      >
        {showHeader ? (
          <div className="flex items-center justify-between p-3">
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-lg bg-white">
                <Layers className="size-4 text-black" />
              </div>
              <span className="text-base font-semibold text-foreground">
                Daisy AI Studio
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="size-7 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
              onClick={() => setIsCollapsed(true)}
            >
              <PanelLeft className="size-4" />
            </Button>
          </div>
        ) : null}

        {!showHeader && <div className="h-3" />}

        {/* Navigation */}
        <div className="space-y-0.5 px-3 py-2">
          <button
            onClick={() => handleNavigate("newtask")}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-xs transition-colors",
              activeNav === "newtask"
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
            )}
          >
            <Plus className="size-4" />
            New task
          </button>
          <button
            onClick={() => handleNavigate("agents")}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-xs transition-colors",
              activeNav === "agents"
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
            )}
          >
            <Bot className="size-4" />
            Agents
          </button>
          <button
            onClick={() => handleNavigate("search")}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-xs transition-colors",
              activeNav === "search"
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
            )}
          >
            <Search className="size-4" />
            Search
          </button>
          <button
            onClick={() => handleNavigate("library")}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-xs transition-colors",
              activeNav === "library"
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
            )}
          >
            <Library className="size-4" />
            Library
          </button>
        </div>

        {/* Projects Section */}
        <div className="px-3 py-2">
          <div className="mb-1 flex items-center justify-between px-2">
            <span className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
              Projects
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="size-6 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
              onClick={handleOpenNewProject}
            >
              <Plus className="size-3.5" />
            </Button>
          </div>
          <button
            onClick={handleOpenNewProject}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-xs text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
          >
            <FolderGit2 className="size-4" />
            New project
          </button>
        </div>

        {/* Task Groups */}
        <ScrollArea className="h-full flex-1 overflow-hidden px-3">
          <div className="space-y-1 py-2">
            {/* All tasks header */}
            <div className="mb-1 flex items-center justify-between px-2">
              <span className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
                All tasks
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="size-6 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <MoreHorizontal className="size-3.5" />
              </Button>
            </div>

            {taskGroups.map((group) => (
              <div key={group.id}>
                <button
                  onClick={() => toggleGroup(group.id)}
                  className="flex w-full items-center gap-2 px-2 py-1.5 text-[11px] text-muted-foreground transition-colors hover:text-foreground"
                >
                  {expandedGroups.includes(group.id) ? (
                    <ChevronDown className="size-3" />
                  ) : (
                    <ChevronRight className="size-3" />
                  )}
                  {group.title}
                </button>

                {expandedGroups.includes(group.id) && (
                  <div className="mt-0.5 space-y-0.5">
                    {group.tasks.map((task) => (
                      <button
                        key={task.id}
                        onClick={() => setSelectedTask(task.id)}
                        className={cn(
                          "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left transition-colors",
                          selectedTask === task.id
                            ? "bg-muted"
                            : "hover:bg-muted/50"
                        )}
                      >
                        {selectedTask === task.id ? (
                          <CheckCircle2 className="size-4 shrink-0 text-primary" />
                        ) : (
                          <div className="size-4 shrink-0 rounded-full border-2 border-border" />
                        )}
                        <div className="min-w-0 flex-1">
                          <p
                            className={cn(
                              "truncate text-xs",
                              selectedTask === task.id
                                ? "text-foreground"
                                : "text-muted-foreground"
                            )}
                          >
                            {task.title}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Recent tasks list */}
            <div className="mt-2 space-y-0.5">
              {allTasks.map((task) => (
                <button
                  key={task.id}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left transition-colors hover:bg-muted/50"
                >
                  {task.status === "completed" ? (
                    <CheckCircle2 className="size-4 shrink-0 text-primary" />
                  ) : (
                    <Clock className="size-4 shrink-0 text-chart-3" />
                  )}
                  <span
                    className={cn(
                      "text-xs",
                      task.status === "completed"
                        ? "text-muted-foreground/70"
                        : "text-muted-foreground"
                    )}
                  >
                    {task.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </ScrollArea>

        <SidebarFooter
          isCollapsed={false}
          onExpand={() => setIsCollapsed(false)}
          onOpenSettings={() => handleOpenSettings("configuracion")}
          onOpenPersonalization={() =>
            handleOpenPersonalization("personalizacion")
          }
        />
      </div>

      <Dialog open={isCreateProjectOpen} onOpenChange={setIsCreateProjectOpen}>
        <DialogContent className="max-w-[560px] gap-6 rounded-2xl border border-border bg-popover p-5 shadow-2xl sm:max-w-[560px]">
          <DialogHeader>
            <DialogTitle className="text-base font-semibold">
              Create project
            </DialogTitle>
          </DialogHeader>

          <form
            className="space-y-7"
            onSubmit={(event) => {
              event.preventDefault()
              handleCreateProject()
            }}
          >
            <div className="flex justify-center">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-muted">
                <FolderGit2 className="size-8 text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-foreground">
                  Project name
                </label>

                <Input
                  value={projectName}
                  onChange={(event) => setProjectName(event.target.value)}
                  placeholder="Enter the name"
                  className="h-9"
                  autoFocus
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-foreground">
                  Instructions{" "}
                  <span className="font-normal text-muted-foreground">
                    (optional)
                  </span>
                </label>

                <Textarea
                  value={projectInstructions}
                  onChange={(event) =>
                    setProjectInstructions(event.target.value)
                  }
                  placeholder='e.g. "Focus on Python best practices", "Maintain a professional tone", or "Always provide sources for important conclusions".'
                  className="min-h-36 resize-none bg-muted/50"
                />
              </div>
            </div>

            <DialogFooter className="mx-0 mb-0 border-t-0 bg-transparent p-0">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  disabled={isCreatingProject}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={!projectName.trim() || isCreatingProject}
              >
                {isCreatingProject ? (
                  <LoaderCircle className="size-4 animate-spin" />
                ) : null}
                {isCreatingProject ? "Creating" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
