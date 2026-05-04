import { useMemo, useState } from "react"
import {
  ChevronDown,
  Ellipsis,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Wrench,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

type SkillItem = {
  id: string
  name: string
  description: string
  updatedAt: string
  enabled: boolean
  featured?: boolean
}

const initialSkills: SkillItem[] = [
  {
    id: "bgm-prompter",
    name: "bgm-prompter",
    description:
      "DEB leer esta habilidad ANTES de entrar en el modo de creacion para tareas musicales. Cubre el marco de trabajo y flujo recomendado.",
    updatedAt: "Actualizado el 1 abr 2026",
    enabled: true,
  },
  {
    id: "video-generator",
    name: "video-generator",
    description:
      "Flujo de trabajo profesional de produccion de video con IA. Usalo al crear videos, cortometrajes y comerciales.",
    updatedAt: "Actualizado el 13 mar 2026",
    enabled: false,
  },
  {
    id: "skill-creator",
    name: "skill-creator",
    description:
      "Guia para crear o actualizar habilidades que extienden MoodGraph a traves de conocimientos especializados y flujos reutilizables.",
    updatedAt: "Actualizado el 16 feb 2026",
    enabled: true,
  },
  {
    id: "stock-analysis",
    name: "stock-analysis",
    description:
      "Analice acciones y empresas utilizando datos del mercado financiero. Obtenga perfiles de empresas, informacion y contexto.",
    updatedAt: "Actualizado el 23 ene 2026",
    enabled: false,
    featured: true,
  },
  {
    id: "similarweb-analytics",
    name: "similarweb-analytics",
    description:
      "Analice sitios web y dominios utilizando datos de trafico de SimilarWeb. Obtenga metricas de trafico y estadisticas de audiencia.",
    updatedAt: "Actualizado el 23 ene 2026",
    enabled: false,
    featured: true,
  },
]

const Habilidades = () => {
  const [query, setQuery] = useState("")
  const [skills, setSkills] = useState<SkillItem[]>(initialSkills)

  const filteredSkills = useMemo(() => {
    const lower = query.trim().toLowerCase()
    if (!lower) return skills
    return skills.filter(
      (skill) =>
        skill.name.toLowerCase().includes(lower) ||
        skill.description.toLowerCase().includes(lower)
    )
  }, [query, skills])

  const toggleSkill = (id: string, checked: boolean) => {
    setSkills((prev) =>
      prev.map((skill) =>
        skill.id === id ? { ...skill, enabled: checked } : skill
      )
    )
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-4 text-foreground">
      <section className="space-y-1">
        <h1 className="text-xl font-semibold tracking-tight">Habilidades</h1>
        <p className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
          Practicas recomendadas y herramientas preempaquetadas y repetibles
          para tus agentes
          <ShieldCheck className="size-3.5" />
        </p>
      </section>

      <Separator />

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="size-10 rounded-xl border-border bg-muted/20"
            >
              <SlidersHorizontal className="size-4" />
            </Button>
            <div className="relative w-[280px]">
              <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar habilidad"
                className="h-10 rounded-xl bg-muted/20 pl-9 text-xs"
              />
            </div>
          </div>

          <Button
            variant="outline"
            className="h-10 rounded-xl border-border bg-muted/20 px-4"
          >
            <ShieldCheck className="size-4" />
            <span className="text-xs">Oficial</span>
          </Button>
        </div>

        <Card className="rounded-2xl border-border/80 bg-muted/25 py-0 shadow-sm ring-0">
          <CardContent className="flex items-center justify-between gap-4 px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl border border-border/80 bg-background/60">
                <Wrench className="size-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-semibold">
                  Anadir habilidades personalizadas
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Anade una habilidad para desbloquear nuevas capacidades para
                  ti o tu equipo.
                </p>
              </div>
            </div>
            <Button className="h-10 rounded-xl px-4 text-xs">
              <span className="text-lg leading-none">+</span>
              Agregar
              <ChevronDown className="size-4" />
            </Button>
          </CardContent>
        </Card>

        <div className="grid gap-3 md:grid-cols-2">
          {filteredSkills.map((skill) => (
            <Card
              key={skill.id}
              className="rounded-2xl border-border/80 bg-muted/25 py-0 shadow-sm ring-0"
            >
              <CardContent className="space-y-3 px-4 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="inline-flex items-center gap-1 text-sm font-semibold">
                      {skill.name}
                      {skill.featured ? (
                        <Sparkles className="size-4 text-primary" />
                      ) : null}
                    </p>
                    <p className="mt-1 line-clamp-2 text-[11px] text-muted-foreground">
                      {skill.description}
                    </p>
                  </div>
                  <Switch
                    checked={skill.enabled}
                    onCheckedChange={(checked) => toggleSkill(skill.id, checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1 text-[10px]">
                    <ShieldCheck className="size-3.5" />
                    Oficial
                    <span className="text-muted-foreground/60">•</span>
                    {skill.updatedAt}
                  </span>
                  <button
                    type="button"
                    className="rounded-md p-1 transition-colors hover:bg-muted"
                    aria-label="Opciones"
                  >
                    <Ellipsis className="size-4" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Habilidades
