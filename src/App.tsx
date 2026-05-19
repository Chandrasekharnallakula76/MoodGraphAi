import { lazy, Suspense, type ReactNode } from "react"
import { HashRouter, Navigate, Route, Routes } from "react-router-dom"
import { ThemeToggle } from "@/components/theme-toggle"
import RouteLoader from "@/components/ui/route-loader"
import { isAuthenticated } from "@/lib/auth"
import AuthToastHost from "@/components/auth-toast-host"

const Newtask = lazy(() => import("@/components/Newtask/Newtask"))
const NewProjectPage = lazy(
  () => import("@/components/Newtask/new-project-page")
)
const RegisterPage = lazy(() => import("@/components/Auth/register-page"))

function RequireAuth({ children }: { children: ReactNode }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />
  }

  return children
}

function RedirectByAuth() {
  return <Navigate to={isAuthenticated() ? "/newtask" : "/login"} replace />
}

function PublicRoute({ children }: { children: ReactNode }) {
  if (isAuthenticated()) {
    return <Navigate to="/newtask" replace />
  }

  return children
}

export function App() {
  return (
    <HashRouter>
      <div className="flex h-screen w-full overflow-hidden bg-background">
        <Suspense fallback={<RouteLoader label="Loading workspace" />}>
          <Routes>
            <Route path="/" element={<RedirectByAuth />} />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <RegisterPage defaultTab="register" />
                </PublicRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <RegisterPage defaultTab="login" />
                </PublicRoute>
              }
            />
            <Route
              path="/newtask"
              element={
                <RequireAuth>
                  <Newtask />
                </RequireAuth>
              }
            />
            <Route
              path="/agents"
              element={
                <RequireAuth>
                  <Newtask />
                </RequireAuth>
              }
            />
            <Route
              path="/search"
              element={
                <RequireAuth>
                  <Newtask />
                </RequireAuth>
              }
            />
            <Route
              path="/library"
              element={
                <RequireAuth>
                  <Newtask />
                </RequireAuth>
              }
            />
            <Route
              path="/project/new"
              element={
                <RequireAuth>
                  <NewProjectPage />
                </RequireAuth>
              }
            />
            <Route
              path="*"
              element={
                <RequireAuth>
                  <Newtask />
                </RequireAuth>
              }
            />
          </Routes>
        </Suspense>
        <ThemeToggle />
        <AuthToastHost />
      </div>
    </HashRouter>
  )
}

export default App
