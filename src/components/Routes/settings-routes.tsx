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
        <Route path="/" element={<Navigate to="/settings/cuenta" replace />} />

        {/* Sidebar Routes */}
        <Route path="/settings/cuenta" element={<Accounts />} />
        <Route path="/settings/configuracion" element={<Settings />} />
        <Route path="/settings/uso" element={<Usage />} />
        <Route
          path="/settings/tareas-programadas"
          element={<TareasProgramadas />}
        />
        <Route path="/settings/correo-moodgraph" element={<MailManus />} />
        <Route path="/settings/controles-datos" element={<CorreoManus />} />
        <Route path="/settings/navegador-nube" element={<CloudBrowser />} />
        <Route path="/settings/mi-computadora" element={<MyComputer />} />
        <Route path="/settings/personalizacion" element={<Personalization />} />
        <Route path="/settings/habilidades" element={<Habilidades />} />
        <Route path="/settings/conectores" element={<Conectores />} />
        <Route path="/settings/integraciones" element={<Integrations />} />
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/settings/cuenta" replace />} />
      </Routes>
    </Suspense>
  )
}

export default Settingsroutes
