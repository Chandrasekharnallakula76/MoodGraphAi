import { useMemo, useState } from "react"
import { ChevronDown, Plug, Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

type TabKey = "apps" | "api" | "mcp"

type ConnectorItem = {
  id: string
  name: string
  desc: string
  badge?: string
  tone?: string
}

const recommendedApps: ConnectorItem[] = [
  {
    id: "instagram",
    name: "Instagram",
    desc: "Generate and publish Posts, Stories, or Reels to Instagram.",
    badge: "NUEVO",
    tone: "pink",
  },
  {
    id: "instagram-creator-marketplace",
    name: "Instagram Creator Marketplace",
    desc: "Discover creators that fit your brand's reach, topics, and style.",
    badge: "NUEVO",
    tone: "pink",
  },
  {
    id: "meta-ads-manager",
    name: "Meta Ads Manager",
    desc: "Automatiza ideas y la optimizacion de anuncios para ahorrar horas.",
    badge: "NUEVO",
    tone: "blue",
  },
  {
    id: "my-browser",
    name: "Mi navegador",
    desc: "Accede a la web en tu propio navegador.",
    tone: "slate",
  },
]

const appConnectors: ConnectorItem[] = [
  {
    id: "browser",
    name: "Mi navegador",
    desc: "Accede a la web en tu propio navegador.",
    tone: "slate",
  },
  {
    id: "gmail",
    name: "Gmail",
    desc: "Redacta respuestas y resume conversaciones del correo.",
    tone: "red",
  },
  {
    id: "google-calendar",
    name: "Google Calendar",
    desc: "Comprende tu horario y optimiza tu tiempo de manera efectiva.",
    tone: "blue",
  },
  {
    id: "google-drive",
    name: "Google Drive",
    desc: "Access files and let MoodGraph help you manage documents.",
    tone: "green",
  },
  {
    id: "outlook-mail",
    name: "Correo de Outlook",
    desc: "Escribe, busca y gestiona tus correos de Outlook sin problemas.",
    tone: "sky",
  },
  {
    id: "outlook-calendar",
    name: "Calendario de Outlook",
    desc: "Programa y visualiza eventos de Outlook con un solo aviso.",
    tone: "sky",
  },
]

const apiProviders: ConnectorItem[] = [
  {
    id: "openai",
    name: "OpenAI",
    desc: "Aprovecha la serie de modelos GPT para generacion y texto.",
    tone: "slate",
  },
  {
    id: "gemini",
    name: "Google Gemini",
    desc: "Procesa contenido multimodal incluyendo texto e imagenes.",
    tone: "blue",
  },
  {
    id: "anthropic",
    name: "Anthropic",
    desc: "Accede a servicios confiables de IA conversacional.",
    tone: "amber",
  },
  {
    id: "perplexity",
    name: "Perplexity",
    desc: "Busca informacion en tiempo real con citas confiables.",
    tone: "violet",
  },
  {
    id: "cohere",
    name: "Cohere",
    desc: "Construye apps empresariales con flujos de procesamiento.",
    tone: "emerald",
  },
  {
    id: "grok",
    name: "Grok",
    desc: "Accede a informacion en tiempo real y conversaciones.",
    tone: "rose",
  },
  {
    id: "openrouter",
    name: "OpenRouter",
    desc: "Gestiona llamadas API a multiples modelos desde una interfaz.",
    tone: "indigo",
  },
  {
    id: "ahrefs",
    name: "Ahrefs",
    desc: "Optimiza SEO y analiza palabras clave con seguimiento.",
    tone: "orange",
  },
  {
    id: "similarweb",
    name: "Similarweb",
    desc: "Analiza trafico web y mercado con datos comparativos.",
    tone: "cyan",
  },
  {
    id: "dropbox",
    name: "Dropbox",
    desc: "Sincroniza archivos y colabora en equipos distribuidos.",
    tone: "blue",
  },
]

const toneMap: Record<string, string> = {
  pink: "bg-pink-500/20 text-pink-300",
  blue: "bg-blue-500/20 text-blue-300",
  slate: "bg-slate-500/20 text-slate-300",
  red: "bg-red-500/20 text-red-300",
  green: "bg-green-500/20 text-green-300",
  sky: "bg-sky-500/20 text-sky-300",
  amber: "bg-amber-500/20 text-amber-300",
  violet: "bg-violet-500/20 text-violet-300",
  emerald: "bg-emerald-500/20 text-emerald-300",
  rose: "bg-rose-500/20 text-rose-300",
  indigo: "bg-indigo-500/20 text-indigo-300",
  orange: "bg-orange-500/20 text-orange-300",
  cyan: "bg-cyan-500/20 text-cyan-300",
}

const ConnectorCard = ({ item }: { item: ConnectorItem }) => (
  <Card className="rounded-2xl border-border/80 bg-muted/25 py-0 ring-0">
    <CardContent className="flex items-start gap-3 px-4 py-3.5">
      <div
        className={cn(
          "mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl border border-border/70 text-[10px] font-semibold",
          toneMap[item.tone ?? "slate"]
        )}
      >
        {item.name.slice(0, 2).toUpperCase()}
      </div>
      <div className="min-w-0">
        <p className="inline-flex items-center gap-2 text-sm leading-tight font-semibold text-foreground">
          {item.name}
          {item.badge ? (
            <span className="rounded-md bg-primary/20 px-1.5 py-0.5 text-[10px] text-primary">
              {item.badge}
            </span>
          ) : null}
        </p>
        <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
          {item.desc}
        </p>
      </div>
    </CardContent>
  </Card>
)

const Conectores = () => {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState<TabKey>("apps")
  const [query, setQuery] = useState("")

  const normalizedQuery = query.trim().toLowerCase()

  const filteredRecommended = useMemo(() => {
    if (!normalizedQuery) return recommendedApps
    return recommendedApps.filter((item) =>
      `${item.name} ${item.desc}`.toLowerCase().includes(normalizedQuery)
    )
  }, [normalizedQuery])

  const filteredApps = useMemo(() => {
    if (!normalizedQuery) return appConnectors
    return appConnectors.filter((item) =>
      `${item.name} ${item.desc}`.toLowerCase().includes(normalizedQuery)
    )
  }, [normalizedQuery])

  const filteredApiProviders = useMemo(() => {
    if (!normalizedQuery) return apiProviders
    return apiProviders.filter((item) =>
      `${item.name} ${item.desc}`.toLowerCase().includes(normalizedQuery)
    )
  }, [normalizedQuery])

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 text-foreground">
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Conectores</h1>
        <Separator />
      </section>

      <section className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-muted/30 text-muted-foreground">
          <Plug className="size-6" />
        </div>
        <p className="text-base text-muted-foreground">
          Conecta MoodGraph con tus aplicaciones diarias, APIs y MCPs
        </p>
        <Button
          variant="outline"
          className="h-10 rounded-xl border-border/80 px-4 text-sm"
          onClick={() => setOpen(true)}
        >
          <Plus className="size-4" />
          Agregar conectores
        </Button>
      </section>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="h-[88vh] max-w-[95vw] overflow-hidden rounded-[28px] border-border/80 bg-card p-0 sm:max-w-6xl">
          <div className="flex h-full min-h-0 flex-col">
            <div className="flex items-center justify-between px-5 py-4">
              <h2 className="text-xl font-semibold">Conectores</h2>
            </div>

            <div className="px-5 pb-3">
              <div className="flex flex-wrap items-end justify-between gap-3 border-b border-border pb-3">
                <div className="flex items-end gap-6">
                  <button
                    type="button"
                    onClick={() => setTab("apps")}
                    className={cn(
                      "-mb-3 border-b-2 pb-2 text-sm",
                      tab === "apps"
                        ? "border-foreground font-semibold text-foreground"
                        : "border-transparent text-muted-foreground"
                    )}
                  >
                    Aplicaciones
                  </button>
                  <button
                    type="button"
                    onClick={() => setTab("api")}
                    className={cn(
                      "-mb-3 border-b-2 pb-2 text-sm",
                      tab === "api"
                        ? "border-foreground font-semibold text-foreground"
                        : "border-transparent text-muted-foreground"
                    )}
                  >
                    API personalizada
                  </button>
                  <button
                    type="button"
                    onClick={() => setTab("mcp")}
                    className={cn(
                      "-mb-3 border-b-2 pb-2 text-sm",
                      tab === "mcp"
                        ? "border-foreground font-semibold text-foreground"
                        : "border-transparent text-muted-foreground"
                    )}
                  >
                    MCP personalizado
                  </button>
                </div>

                <div className="relative w-[240px]">
                  <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Buscar"
                    className="h-10 rounded-xl bg-muted/30 pl-9 text-sm"
                  />
                </div>
              </div>
            </div>

            <ScrollArea className="min-h-0 flex-1 overflow-hidden px-5 pb-5">
              {tab === "apps" ? (
                <div className="space-y-5 pb-4">
                  <section className="space-y-2">
                    <p className="text-sm text-muted-foreground">Recomendado</p>
                    <div className="grid gap-3 md:grid-cols-2">
                      {filteredRecommended.map((item) => (
                        <ConnectorCard key={item.id} item={item} />
                      ))}
                    </div>
                  </section>

                  <section className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Aplicaciones
                    </p>
                    <div className="grid gap-3 md:grid-cols-2">
                      {filteredApps.map((item) => (
                        <ConnectorCard key={item.id} item={item} />
                      ))}
                    </div>
                  </section>
                </div>
              ) : null}

              {tab === "api" ? (
                <div className="space-y-3 pb-4">
                  <Card className="rounded-2xl border-border/80 bg-muted/25 py-0 ring-0">
                    <CardContent className="inline-flex items-center gap-2 px-4 py-3 text-sm text-muted-foreground">
                      <Plug className="size-4" />
                      Conecte MoodGraph a cualquier servicio de terceros utilizando
                      sus propias claves API.
                    </CardContent>
                  </Card>

                  <div className="grid gap-3 md:grid-cols-2">
                    <Card className="rounded-2xl border-border/80 bg-muted/25 py-0 ring-0">
                      <CardContent className="flex min-h-[88px] items-center px-4 py-4">
                        <Button className="h-10 rounded-xl px-4 text-sm">
                          <Plus className="size-4" />
                          Agregar API personalizada
                        </Button>
                      </CardContent>
                    </Card>

                    {filteredApiProviders.map((item) => (
                      <ConnectorCard key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              ) : null}

              {tab === "mcp" ? (
                <div className="flex min-h-[55vh] flex-col items-center justify-center gap-4 text-center">
                  <div className="flex size-12 items-center justify-center rounded-full bg-muted/30 text-muted-foreground">
                    <Plug className="size-6" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    No se ha agregado ningun MCP personalizado.
                  </p>
                  <Button className="h-10 rounded-xl px-4 text-sm">
                    <Plus className="size-4" />
                    Agregar MCP personalizado
                    <ChevronDown className="size-4" />
                  </Button>
                </div>
              ) : null}
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Conectores
