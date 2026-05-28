import { lazy, Suspense } from "react"
import { Routes, Route, Navigate } from "react-router-dom"

import RouteLoader from "@/components/ui/route-loader"

const Accounts = lazy(() => import("../Settings/Route-pages/Accounts"))
const Settings = lazy(() => import("../Settings/Route-pages/settings"))
const Usage = lazy(() => import("../Settings/Route-pages/usage"))
const TareasProgramadas = lazy(
  () => import("../Settings/Route-pages/tareas-programadas")
)
const MailManus = lazy(() => import("../Settings/Route-pages/Mail-Manus"))
const CorreoManus = lazy(() => import("../Settings/Route-pages/Correo-Manus"))
const MyComputer = lazy(() => import("../Settings/Route-pages/my-computer"))
const CloudBrowser = lazy(() => import("../Settings/Route-pages/cloud-browser"))
const Integrations = lazy(() => import("../Settings/Route-pages/Integrations"))
const Personalization = lazy(
  () => import("../Settings/Route-pages/personalization")
)
const Habilidades = lazy(() => import("../Settings/Route-pages/Habilidades"))
const Conectores = lazy(() => import("../Settings/Route-pages/conectores"))

const Settingsroutes = () => {
  return (
    <Suspense fallback={<RouteLoader label="Loading settings" />}>
      <Routes>
        {/* Default */}
        <Route path="/" element={<Navigate to="/settings/profile" replace />} />

        {/* Sidebar Routes */}
        <Route path="/settings/profile" element={<Accounts />} />
        <Route path="/settings/preferences" element={<Settings />} />
        <Route path="/settings/usage" element={<Usage />} />
        <Route
          path="/settings/scheduled-tasks"
          element={<TareasProgramadas />}
        />
        <Route
          path="/settings/mail"
          element={<MailManus />}
        />
        <Route path="/settings/data-controls" element={<CorreoManus />} />
        <Route path="/settings/cloud-browser" element={<CloudBrowser />} />
        <Route path="/settings/my-computer" element={<MyComputer />} />
        <Route path="/settings/personalization" element={<Personalization />} />
        <Route path="/settings/skills" element={<Habilidades />} />
        <Route path="/settings/connectors" element={<Conectores />} />
        <Route path="/settings/integrations" element={<Integrations />} />
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/settings/profile" replace />} />
      </Routes>
    </Suspense>
  )
}

export default Settingsroutes
