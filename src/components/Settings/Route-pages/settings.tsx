import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useTheme } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const appearanceOptions = [
  { key: "light", label: "Light" },
  { key: "dark", label: "Dark" },
  // { key: "system", label: "Follow System" },
] as const

const Settings = () => {
  const { theme, setTheme } = useTheme()
  const [language, setLanguage] = useState("en")
  const [productUpdates, setProductUpdates] = useState(true)
  const [queueEmail, setQueueEmail] = useState(true)

  return (
    <div className="bg-background p-6 text-foreground">
      <section className="mb-8 space-y-2">
        <p className="text-xs font-semibold text-muted-foreground">General</p>
        <h2 className="text-lg font-semibold">Idioma</h2>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="h-9 w-[220px] rounded-lg border border-input bg-card px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
        >
          <option value="en">English</option>
        </select>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-lg font-semibold">Apariencia</h2>

        <div className="flex flex-wrap gap-4">
          {appearanceOptions.map((option) => {
            const isSelected = theme === option.key

            return (
              <button
                key={option.key}
                type="button"
                onClick={() => setTheme(option.key)}
                className="group text-left"
              >
                <div
                  className={cn(
                    "mb-2 h-[60px] w-[95px] rounded-xl border p-1 transition-all",
                    isSelected
                      ? "border-primary ring-2 ring-primary/25"
                      : "border-border hover:border-primary/40"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-full w-full overflow-hidden rounded-lg",
                      option.key === "light"
                        ? "bg-zinc-100"
                        : "border border-zinc-700 bg-zinc-900"
                    )}
                  >
                    <div
                      className={cn(
                        "h-full w-3/4",
                        option.key === "light" ? "bg-zinc-200" : "bg-zinc-800"
                      )}
                    />
                    <div
                      className={cn(
                        "h-full w-1/4",
                        option.key === "light" ? "bg-zinc-50" : "bg-zinc-950"
                      )}
                    />
                  </div>
                </div>

                <p
                  className={cn(
                    "text-xs",
                    isSelected
                      ? "font-semibold text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {option.label}
                </p>
              </button>
            )
          })}
        </div>
      </section>

      <Separator className="my-6" />

      <section className="mb-8 space-y-5">
        <h3 className="text-sm font-semibold text-muted-foreground">
          Preferencias de comunicacion
        </h3>

        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold">
              Recibir actualizaciones del producto
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Acceso anticipado a nuevas funciones.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setProductUpdates((prev) => !prev)}
            className={cn(
              "relative mt-0.5 h-5 w-9 rounded-full transition-colors",
              productUpdates ? "bg-primary" : "bg-muted"
            )}
          >
            <span
              className={cn(
                "absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all",
                productUpdates ? "left-4.5" : "left-0.5"
              )}
            />
          </button>
        </div>

        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold">Notificacion por correo</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Te avisamos cuando tu tarea comience.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setQueueEmail((prev) => !prev)}
            className={cn(
              "relative mt-0.5 h-5 w-9 rounded-full transition-colors",
              queueEmail ? "bg-primary" : "bg-muted"
            )}
          >
            <span
              className={cn(
                "absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all",
                queueEmail ? "left-4.5" : "left-0.5"
              )}
            />
          </button>
        </div>
      </section>

      <Separator className="my-6" />

      <section className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Gestionar Cookies</h3>

        <Button
          variant="outline"
          size="sm"
          className="h-8 rounded-lg px-4 text-xs"
        >
          Gestionar
        </Button>
      </section>
    </div>
  )
}

export default Settings
