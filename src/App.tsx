import { lazy, Suspense } from "react"
import { HashRouter, Navigate, Route, Routes } from "react-router-dom"
import { ThemeToggle } from "@/components/theme-toggle"
import RouteLoader from "@/components/ui/route-loader"

const Newtask = lazy(() => import("@/components/Newtask/Newtask"))
const RegisterPage = lazy(() => import("@/components/Auth/register-page"))

export function App() {
  return (
    <HashRouter>
      <div className="flex h-screen w-full overflow-hidden bg-background">
        <Suspense fallback={<RouteLoader label="Loading workspace" />}>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route
              path="/register"
              element={<RegisterPage defaultTab="register" />}
            />
            <Route
              path="/login"
              element={<RegisterPage defaultTab="login" />}
            />
            <Route path="/newtask" element={<Newtask />} />
            <Route path="/agents" element={<Newtask />} />
            <Route path="/buscar" element={<Newtask />} />
            <Route path="/biblioteca" element={<Newtask />} />
            <Route path="*" element={<Newtask />} />
          </Routes>
        </Suspense>
        <ThemeToggle />
      </div>
    </HashRouter>
  )
}

export default App
