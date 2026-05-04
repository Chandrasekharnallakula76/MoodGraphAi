import { useState } from "react"
import { Menu } from "lucide-react"

import Settingsroutes from "@/components/Routes/settings-routes"
import Sidebar from "./side-bar"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"

const Settingslayout = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      <div className="min-w-0 flex-1 overflow-y-auto">
        <div className="flex items-center gap-3 border-b border-border bg-background px-4 py-3 md:hidden">
          <button
            type="button"
            onClick={() => setIsMobileSidebarOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:bg-accent"
            aria-label="Open sidebar"
          >
            <Menu className="size-5" />
          </button>
          <div>
            <p className="text-sm font-medium">Settings</p>
            <p className="text-xs text-muted-foreground">Choose a section</p>
          </div>
        </div>

        <div className="p-4 md:p-6">
          <Settingsroutes />
        </div>
      </div>

      <Dialog open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
        <DialogContent
          showCloseButton={false}
          className="left-0 top-0 h-dvh max-h-dvh w-[280px] max-w-[85vw] translate-x-0 translate-y-0 rounded-none border-r p-0"
        >
          <Sidebar
            className="h-dvh border-r-0"
            onNavigate={() => setIsMobileSidebarOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Settingslayout
