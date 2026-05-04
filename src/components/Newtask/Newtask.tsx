import { lazy, Suspense, useState } from "react"
import { Layers } from "lucide-react"
import { useLocation, useNavigate, Navigate } from "react-router-dom"
import { Sidebar } from "./sidebar"
import { Header } from "./header"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import RouteLoader from "@/components/ui/route-loader"

const ChatArea = lazy(() =>
  import("./chat-area").then((module) => ({ default: module.ChatArea }))
)
const AgentsChatArea = lazy(() => import("./agents-chatarea"))
const Biblioteca = lazy(() => import("./biblioteca"))
const SearchScreen = lazy(() => import("./search-screen"))
const Notifications = lazy(() => import("./notifications"))
const Settingslayout = lazy(
  () => import("@/components/Settings/settings-layout")
)

type NavKey = "newtask" | "agents" | "search" | "library"

const navToPath: Record<NavKey, string> = {
  newtask: "/newtask",
  agents: "/agents",
  search: "/buscar",
  library: "/biblioteca",
}

const pathToNav = (pathname: string): NavKey | null => {
  if (pathname.startsWith("/agents")) return "agents"
  if (pathname.startsWith("/buscar")) return "search"
  if (pathname.startsWith("/biblioteca")) return "library"
  if (pathname.startsWith("/newtask") || pathname === "/") return "newtask"
  if (pathname.startsWith("/settings/")) return null
  return "newtask"
}

const Newtask = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  const locationState = location.state as { returnTo?: string } | null

  if (location.pathname === "/") {
    return <Navigate replace to="/newtask" />
  }

  const activeNav = location.pathname.startsWith("/settings/")
    ? (pathToNav(locationState?.returnTo ?? "/newtask") ?? "newtask")
    : (pathToNav(location.pathname) ?? "newtask")

  const handleSetActiveNav = (nav: string) => {
    const nextPath = navToPath[nav as NavKey] ?? "/newtask"
    navigate(nextPath)
  }

  const handleOpenSettings = (route: string) => {
    const normalizedRoute = route.replace(/^\/+/, "")
    navigate(`/settings/${normalizedRoute}`, {
      state: { returnTo: location.pathname },
    })
  }

  const handleCloseSettings = (open: boolean) => {
    if (!open) {
      navigate("/", { replace: true })
    }
  }

  const handleCloseSearch = () => {
    navigate("/newtask", { replace: true })
  }

  const isNotificationPage = location.pathname.startsWith("/notificaciones")

  const contentLoader = (
    <RouteLoader
      label={
        isNotificationPage
          ? "Loading notifications"
          : activeNav === "agents"
            ? "Loading agents"
            : activeNav === "search"
              ? "Loading search"
              : activeNav === "library"
                ? "Loading library"
                : "Loading chat"
      }
    />
  )

  return (
    <div className="flex h-[100dvh] w-full overflow-hidden">
      {/* Sidebar */}
      <div className="hidden md:flex">
        <Sidebar
          activeNav={activeNav}
          setActiveNav={handleSetActiveNav}
          onOpenSettings={handleOpenSettings}
          onOpenPersonalization={handleOpenSettings}
        />
      </div>

      {/* Main Content */}
      <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-background">
        {/* Header (fixed height, no scroll) */}
        <Header onOpenSidebar={() => setIsMobileSidebarOpen(true)} />

        {/* Content Area (SCROLLABLE) */}
        <div className="flex min-h-0 flex-1 overflow-hidden">
          {/* Scroll wrapper */}
          <div className="flex-1 overflow-y-auto">
            <Suspense fallback={contentLoader}>
              {isNotificationPage && <Notifications />}
              {!isNotificationPage && activeNav === "newtask" && (
                <div className="flex h-full min-h-0">
                  <ChatArea />
                </div>
              )}
              {!isNotificationPage && activeNav === "agents" && (
                <AgentsChatArea />
              )}
              {!isNotificationPage && activeNav === "search" && (
                <SearchScreen onClose={handleCloseSearch} />
              )}
              {!isNotificationPage && activeNav === "library" && (
                <Biblioteca />
              )}
            </Suspense>
          </div>
        </div>
      </div>

      <Dialog
        open={isMobileSidebarOpen}
        onOpenChange={setIsMobileSidebarOpen}
      >
        <DialogContent
          showCloseButton={false}
          className="left-0 top-0 h-dvh max-h-dvh w-[82vw] max-w-[320px] translate-x-0 translate-y-0 rounded-r-3xl rounded-l-none border-r border-border/80 p-0 shadow-2xl data-open:animate-in data-open:slide-in-from-left-3 data-closed:animate-out data-closed:slide-out-to-left-3"
        >
          <div className="flex h-dvh flex-col bg-background">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-xl bg-white">
                  <Layers className="size-4 text-black" />
                </div>
                <div>
                  <p className="text-sm font-semibold">MoodGraph AI</p>
                  <p className="text-[11px] text-muted-foreground">
                    Workspace menu
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsMobileSidebarOpen(false)}
                className="inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label="Close sidebar"
              >
                <span className="text-lg leading-none">×</span>
              </button>
            </div>

            <Sidebar
              activeNav={activeNav}
              setActiveNav={handleSetActiveNav}
              onOpenSettings={handleOpenSettings}
              onOpenPersonalization={handleOpenSettings}
              onNavigate={() => setIsMobileSidebarOpen(false)}
              className="h-[calc(100dvh-57px)] w-full border-r-0"
              showHeader={false}
            />
          </div>
        </DialogContent>
      </Dialog>

      <Suspense fallback={<RouteLoader label="Loading settings" />}>
        <Dialog
          open={location.pathname.startsWith("/settings/")}
          onOpenChange={handleCloseSettings}
        >
          <DialogContent className="h-[90vh] overflow-hidden rounded-2xl p-0 sm:max-w-7xl">
            <Settingslayout />
          </DialogContent>
        </Dialog>
      </Suspense>
    </div>
  )
}

export default Newtask
