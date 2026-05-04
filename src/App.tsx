import { lazy, Suspense } from "react"
import { HashRouter } from "react-router-dom"
import { ThemeToggle } from "@/components/theme-toggle"
import RouteLoader from "@/components/ui/route-loader"

const Newtask = lazy(() => import("@/components/Newtask/Newtask"))

export function App() {
  return (
    <HashRouter>
      <div className="flex h-screen w-full overflow-hidden bg-background">
        <Suspense fallback={<RouteLoader label="Loading workspace" />}>
          <Newtask />
        </Suspense>
        <ThemeToggle />
      </div>
    </HashRouter>
  )
}

export default App
