import { useMemo, useState } from "react"
import { CircleHelp, Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

type TabKey = "perfil" | "conocimiento"

const Personalization = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("perfil")
  const [about, setAbout] = useState("")
  const [instructions, setInstructions] = useState("")

  const aboutCount = useMemo(() => about.length, [about])
  const instructionCount = useMemo(() => instructions.length, [instructions])

  return (
    <div className="mx-auto w-full max-w-4xl space-y-5 text-foreground">
      {/* Header */}
      <section className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Personalización
        </h1>
        <p className="text-xs text-muted-foreground">
          Administra quién eres y qué recuerda Daisy AI Studio
        </p>
      </section>

      <Separator />

      {/* Tabs */}
      <section className="space-y-4">
        <div className="flex items-end gap-5 border-b">
          <button
            onClick={() => setActiveTab("perfil")}
            className={`-mb-px border-b-2 pb-1.5 text-xs transition ${
              activeTab === "perfil"
                ? "border-foreground font-medium text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Perfil
          </button>

          <button
            onClick={() => setActiveTab("conocimiento")}
            className={`-mb-px flex items-center gap-1 border-b-2 pb-1.5 text-xs transition ${
              activeTab === "conocimiento"
                ? "border-foreground font-medium text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Conocimiento
            <CircleHelp className="size-3" />
          </button>
        </div>

        {/* PERFIL */}
        {activeTab === "perfil" ? (
          <div className="space-y-5">
            {/* Inputs */}
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div className="space-y-1">
                <label className="text-xs font-medium">Apodo</label>
                <Input
                  placeholder="¿Cómo debería llamarte?"
                  className="h-9 bg-muted/40 text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium">Ocupación</label>
                <Input
                  placeholder="Ej: Software Engineer"
                  className="h-9 bg-muted/40 text-sm"
                />
              </div>
            </div>

            {/* About */}
            <div className="space-y-1">
              <label className="text-xs font-medium">Más sobre ti</label>

              <div className="relative">
                <Textarea
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className="min-h-40 resize-none bg-muted/40 pr-16 text-sm"
                  maxLength={2000}
                  placeholder="Información, preferencias o contexto..."
                />
                <span className="absolute right-3 bottom-2 text-[10px] text-muted-foreground">
                  {aboutCount}/2000
                </span>
              </div>

              <p className="text-[10px] text-muted-foreground">
                Esto ayuda a personalizar respuestas.
              </p>
            </div>

            <Separator />

            {/* Instructions */}
            <div className="space-y-1">
              <label className="text-xs font-medium">
                Instrucciones personalizadas
              </label>

              <div className="relative">
                <Textarea
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  className="min-h-36 resize-none bg-muted/40 pr-16 text-sm"
                  maxLength={3000}
                  placeholder="Ej: Mantener tono profesional, dar ejemplos claros..."
                />
                <span className="absolute right-3 bottom-2 text-[10px] text-muted-foreground">
                  {instructionCount}/3000
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2 pt-1">
              <Button size="sm" variant="outline">
                Cancelar
              </Button>
              <Button size="sm">Guardar</Button>
            </div>
          </div>
        ) : (
          /* CONOCIMIENTO */
          <div className="space-y-5">
            <div className="flex items-center justify-between gap-3">
              <div className="relative w-full max-w-xs">
                <Search className="absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar..."
                  className="h-9 bg-muted/40 pl-8 text-sm"
                />
              </div>

              <Button size="sm" className="gap-1">
                <Plus className="size-3.5" />
                Agregar
              </Button>
            </div>

            <div className="flex min-h-[260px] flex-col items-center justify-center gap-2 text-center text-muted-foreground">
              <Search className="size-8" />
              <p className="text-xs">No hay conocimiento aún</p>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

export default Personalization
