import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"

const CloudBrowser = () => {
  const [enabled, setEnabled] = useState(false)

  return (
    <section className="mx-auto w-full max-w-4xl space-y-5 text-foreground">
      <header className="space-y-1">
        <h2 className="text-lg font-semibold">Navegador en la nube</h2>
        <p className="text-sm text-muted-foreground">
          Configura como Daisy AI Studio conserva sesiones y datos del navegador entre
          tareas.
        </p>
      </header>

      <div className="h-px bg-border" />

      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-sm font-medium">
            Mantener el estado de inicio de sesion entre tareas
          </p>
          <p className="cursor-pointer text-xs text-muted-foreground underline underline-offset-2">
            Aprende mas
          </p>
        </div>

        <Switch checked={enabled} onCheckedChange={setEnabled} />
      </div>

      <div className="h-px bg-border" />

      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-medium">
          Cookies y otros datos del sitio web
        </p>

        <Button variant="outline" size="sm" className="rounded-lg">
          Gestionar
        </Button>
      </div>
    </section>
  )
}

export default CloudBrowser
