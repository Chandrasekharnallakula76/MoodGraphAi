import { useState } from "react"
import type { ReactNode } from "react"
import {
  ArrowLeft,
  MessageCircle,
  Plug,
  Send,
  MessageSquare,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

type ViewType = "list" | "api" | "zapier" | "slack" | "telegram" | "line"

type IntegrationCardProps = {
  icon: ReactNode
  title: string
  desc: string
  onClick: () => void
}

type IntegrationHeaderProps = {
  title: string
  onBack: () => void
}

const integrationCards: IntegrationCardProps[] = [
  {
    icon: <Plug className="size-4 text-cyan-200" />,
    title: "Construye con la API de Daisy AI Studio",
    desc: "Usa la API de Daisy AI Studio para crear integraciones personalizadas",
    onClick: () => {},
  },
  {
    icon: <Zap className="size-4 text-orange-400" />,
    title: "Usa Daisy AI Studio en Zapier",
    desc: "Conecta Daisy AI Studio con miles de aplicaciones",
    onClick: () => {},
  },
  {
    icon: <MessageSquare className="size-4 text-violet-400" />,
    title: "Usar Daisy AI Studio en Slack",
    desc: "Asigna tareas desde Slack",
    onClick: () => {},
  },
  {
    icon: <Send className="size-4 text-blue-400" />,
    title: "Telegram",
    desc: "Envia tareas por mensaje",
    onClick: () => {},
  },
  {
    icon: <MessageCircle className="size-4 text-emerald-400" />,
    title: "Line",
    desc: "Recibe resultados al instante",
    onClick: () => {},
  },
]

const IntegrationTile = ({
  icon,
  title,
  desc,
  onClick,
}: IntegrationCardProps) => (
  <Card
    className="cursor-pointer rounded-2xl border border-border/70 bg-muted/25 py-0 text-foreground ring-0 transition hover:bg-muted/35"
    onClick={onClick}
  >
    <CardContent className="min-h-[126px] px-4 py-4 sm:px-5">
      <div className="flex min-w-0 items-start gap-3 sm:gap-4">
        <div className="mt-0.5 flex size-12 shrink-0 items-center justify-center rounded-xl border border-border/80 bg-background/40">
          {icon}
        </div>
        <div className="min-w-0 space-y-1">
          <p className="text-xs leading-tight font-semibold text-foreground sm:text-base">
            {title}
          </p>
          <p className="text-[10px] leading-snug text-muted-foreground sm:text-xs">
            {desc}
          </p>

          <Button
            type="button"
            variant="ghost"
            className="mt-1 h-auto p-0 text-[10px] font-normal text-muted-foreground hover:bg-transparent hover:text-foreground sm:text-sm"
            onClick={(e) => {
              e.stopPropagation()
              onClick()
            }}
          >
            Ir a configurar &rarr;
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
)

const Header = ({ title, onBack }: IntegrationHeaderProps) => (
  <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={onBack}
      aria-label="Volver"
      className="size-7 rounded-md text-muted-foreground"
    >
      <ArrowLeft className="size-4" />
    </Button>
    <h2 className="text-xs font-semibold sm:text-xs">{title}</h2>
  </div>
)

const Integrations = () => {
  const [view, setView] = useState<ViewType>("list")

  return (
    <div className="mx-auto w-full max-w-5xl space-y-5 px-4 py-4 text-foreground sm:px-5 lg:px-6">
      {view === "list" && (
        <>
          <div>
            <h1 className="text-lg font-semibold tracking-tight sm:text-lg">
              Integraciones
            </h1>
            <p className="text-[11px] text-muted-foreground sm:text-xs">
              Crea flujos de trabajo en tus aplicaciones favoritas
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {integrationCards.map((item) => {
              const targetView: ViewType =
                item.title === "Construye con la API de Daisy AI Studio"
                  ? "api"
                  : item.title === "Usa Daisy AI Studio en Zapier"
                    ? "zapier"
                    : item.title === "Usar Daisy AI Studio en Slack"
                      ? "slack"
                      : item.title === "Telegram"
                        ? "telegram"
                        : "line"

              return (
                <IntegrationTile
                  key={item.title}
                  icon={item.icon}
                  title={item.title}
                  desc={item.desc}
                  onClick={() => setView(targetView)}
                />
              )
            })}
          </div>
        </>
      )}

      {view === "api" && (
        <div>
          <Header title="API" onBack={() => setView("list")} />

          <div className="space-y-4">
            <div className="rounded-xl border border-border p-4">
              <p className="text-xs font-medium sm:text-xs">Claves API</p>
              <p className="text-[10px] text-muted-foreground sm:text-xs">
                Gestiona claves API para acceder a Daisy AI Studio
              </p>
            </div>

            <div className="flex flex-col gap-3 rounded-xl border border-border p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-medium sm:text-xs">
                  Crea tu primera clave API
                </p>
                <p className="text-[10px] text-muted-foreground sm:text-xs">
                  Usa la API para crear tareas
                </p>
              </div>

              <Button
                size="sm"
                className="h-8 w-full rounded-lg px-3 text-xs sm:h-6 sm:w-auto sm:px-2.5 sm:text-[11px]"
              >
                + Crear nuevo
              </Button>
            </div>

            <div className="rounded-xl border border-border p-4">
              <p className="text-xs font-medium sm:text-xs">Webhooks</p>
              <p className="text-[10px] text-muted-foreground sm:text-xs">
                Integra con otros servicios usando webhooks
              </p>
            </div>
          </div>
        </div>
      )}

      {view === "zapier" && (
        <div>
          <Header title="Zapier" onBack={() => setView("list")} />

          <div className="space-y-4">
            <div className="flex flex-col gap-3 rounded-xl border border-border p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-medium sm:text-xs">
                  Usa Daisy AI Studio en Zapier
                </p>
                <p className="text-[10px] text-muted-foreground sm:text-xs">
                  Conecta con miles de apps
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="h-8 w-full rounded-lg px-3 text-xs sm:h-6 sm:w-auto sm:px-2.5 sm:text-[11px]"
              >
                Pruebalo &rarr;
              </Button>
            </div>

            <div className="rounded-xl border border-border p-4 text-[10px] text-muted-foreground sm:text-xs">
              Automatiza tareas, sincroniza datos y elimina procesos manuales.
            </div>
          </div>
        </div>
      )}

      {view === "slack" && (
        <div>
          <Header title="Slack" onBack={() => setView("list")} />

          <div className="space-y-4">
            <div className="flex flex-col gap-3 rounded-xl border border-border p-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs sm:text-xs">Usar Daisy AI Studio en Slack</p>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-full rounded-lg px-3 text-xs sm:h-6 sm:w-auto sm:px-2.5 sm:text-[11px]"
              >
                Conectar &rarr;
              </Button>
            </div>

            <div className="rounded-xl border border-border p-4 text-[10px] text-muted-foreground sm:text-xs">
              Etiqueta @manus para crear tareas automaticamente.
            </div>
          </div>
        </div>
      )}

      {view === "telegram" && (
        <div>
          <Header title="Telegram" onBack={() => setView("list")} />

          <div className="flex flex-col gap-3 rounded-xl border border-border p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs sm:text-xs">Telegram</p>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-full rounded-lg px-3 text-xs sm:h-6 sm:w-auto sm:px-2.5 sm:text-[11px]"
            >
              Conectar &rarr;
            </Button>
          </div>
        </div>
      )}

      {view === "line" && (
        <div>
          <Header title="LINE" onBack={() => setView("list")} />

          <div className="flex flex-col gap-3 rounded-xl border border-border p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs sm:text-xs">LINE</p>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-full rounded-lg px-3 text-xs sm:h-6 sm:w-auto sm:px-2.5 sm:text-[11px]"
            >
              Conectar &rarr;
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Integrations
