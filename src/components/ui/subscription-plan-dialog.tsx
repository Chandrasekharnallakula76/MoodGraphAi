import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Clock,
  Sparkles,
  Globe,
  FileText,
  FlaskConical,
  Calendar,
  CheckCheck,
  Loader2,
} from "lucide-react"

interface SubscriptionPlanDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SubscriptionPlanDialog({
  open,
  onOpenChange,
}: SubscriptionPlanDialogProps) {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly")
  const [selectedPlan, setSelectedPlan] = useState("Pro")
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null)

  const handleSelectPlan = (planName: string) => {
    setLoadingPlan(planName)

    window.setTimeout(() => {
      setSelectedPlan(planName)
      setLoadingPlan(null)
    }, 900)
  }

  const plans = [
    {
      name: "Basic",
      monthly: 20,
      yearly: 17,
      desc: "Uso mensual estándar",
      highlight: false,
      features: [
        { icon: Clock, text: "300 créditos de actualización diarios" },
        { icon: Sparkles, text: "4,000 créditos por mes" },
        {
          icon: FlaskConical,
          text: "Investigación en profundidad para tareas diarias",
        },
        {
          icon: Globe,
          text: "Sitios web profesionales para resultados estándar",
        },
        {
          icon: FileText,
          text: "Presentaciones perspicaces para contenido regular",
        },
        { icon: Sparkles, text: "Escalado de tareas con investigación amplia" },
        { icon: FlaskConical, text: "Acceso anticipado a funciones beta" },
        { icon: CheckCheck, text: "20 tareas concurrentes" },
        { icon: Calendar, text: "20 tareas programadas" },
      ],
    },
    {
      name: "Pro",
      monthly: 40,
      yearly: 34,
      desc: "Uso mensual personalizable",
      highlight: true,
      dropdown: true,
      features: [
        { icon: Clock, text: "300 créditos de actualización diarios" },
        { icon: Sparkles, text: "8,000 créditos por mes" },
        {
          icon: FlaskConical,
          text: "Investigación profunda con uso autoajustado",
        },
        {
          icon: Globe,
          text: "Sitios web profesionales para necesidades cambiantes",
        },
        {
          icon: FileText,
          text: "Presentaciones perspicaces para creación constante",
        },
        {
          icon: Sparkles,
          text: "Amplia investigación adaptada a tu plan elegido",
        },
        { icon: FlaskConical, text: "Acceso anticipado a funciones beta" },
        { icon: CheckCheck, text: "20 tareas concurrentes" },
        { icon: Calendar, text: "20 tareas programadas" },
      ],
    },
    {
      name: "Enterprise",
      monthly: 200,
      yearly: 167,
      desc: "Uso extendido para la productividad",
      highlight: false,
      features: [
        { icon: Clock, text: "300 créditos de actualización diarios" },
        { icon: Sparkles, text: "40,000 créditos por mes" },
        {
          icon: FlaskConical,
          text: "Investigación profunda para tareas a gran escala",
        },
        { icon: Globe, text: "Sitios web profesionales con análisis de datos" },
        {
          icon: FileText,
          text: "Presentaciones perspicaces para producción en lote",
        },
        {
          icon: Sparkles,
          text: "Amplia investigación para uso intensivo sostenido",
        },
        { icon: FlaskConical, text: "Acceso anticipado a funciones beta" },
        { icon: CheckCheck, text: "20 tareas concurrentes" },
        { icon: Calendar, text: "20 tareas programadas" },
      ],
    },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="h-[90vh] overflow-y-auto rounded-3xl border border-border bg-background p-6 sm:max-w-6xl">
        <DialogHeader className="text-center">
          <DialogTitle className="text-lg font-semibold tracking-tight">
            Actualiza a Daisy AI Studio Pro
          </DialogTitle>
        </DialogHeader>

        {/* Toggle */}
        <div className="flex justify-center">
          <Tabs
            value={billing}
            onValueChange={(value) => setBilling(value as "monthly" | "yearly")}
            className="items-center"
          >
            <TabsList className="h-10 rounded-xl border border-border/70 bg-secondary/80 p-1 text-xs shadow-sm">
              <TabsTrigger
                value="monthly"
                className="rounded-lg px-5 text-[15px] font-medium text-muted-foreground data-[state=active]:text-foreground data-[state=active]:shadow-none"
              >
                Monthly
              </TabsTrigger>

              <TabsTrigger
                value="yearly"
                className="rounded-lg px-5 text-[15px] font-medium text-muted-foreground data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-none dark:data-[state=active]:bg-background/90"
              >
                Annually · Save 17%
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Cards */}
        <div className="mt-3 grid grid-cols-1 items-stretch gap-4 md:grid-cols-3">
          {plans.map((plan, index) => {
            const price = billing === "monthly" ? plan.monthly : plan.yearly
            const isSelected = selectedPlan === plan.name
            const isLoading = loadingPlan === plan.name

            return (
              <Card
                key={index}
                className="flex h-full flex-col justify-between rounded-3xl border border-border/70 bg-muted/5 p-4 shadow-sm transition hover:bg-muted/10"
              >
                <CardHeader className="space-y-3 px-1 pb-0">
                  <div className="flex items-center justify-between gap-2 text-xs tracking-[0.2em] text-muted-foreground uppercase">
                    <span>{plan.name}</span>
                    {plan.highlight ? <span>Popular</span> : null}
                  </div>
                  <div
                    key={`${plan.name}-${billing}`}
                    className="flex items-end gap-2"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    <span className="inline-flex animate-in items-end gap-1 text-2xl font-semibold tabular-nums duration-200 fade-in slide-in-from-bottom-1">
                      <span>$</span>
                      <span>{price}</span>
                    </span>
                    <span className="animate-in text-[11px] text-muted-foreground duration-200 fade-in slide-in-from-bottom-1">
                      {billing === "monthly" ? "/ mes" : "/ año"}
                    </span>
                  </div>
                  <p className="text-xs leading-5 text-muted-foreground">
                    {plan.desc}
                  </p>
                </CardHeader>

                <CardContent className="flex flex-1 flex-col gap-4 px-1 pt-0">
                  {isSelected || isLoading ? (
                    <Button
                      className="h-9 w-full bg-primary text-sm font-medium text-primary-foreground shadow-sm transition hover:bg-primary/90"
                      disabled
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Loading...
                        </>
                      ) : (
                        "Upgrade"
                      )}
                    </Button>
                  ) : (
                    <Button
                      className="h-9 w-full bg-secondary text-sm text-secondary-foreground transition hover:bg-secondary/80"
                      variant="secondary"
                      onClick={(event) => {
                        event.stopPropagation()
                        handleSelectPlan(plan.name)
                      }}
                    >
                      Upgrade
                    </Button>
                  )}

                  {/* Dropdown only for Pro */}
                  {plan.dropdown && (
                    <div className="rounded-xl border border-border/80 px-3 py-2 text-xs text-muted-foreground">
                      8,000 créditos / mes
                    </div>
                  )}

                  <ul className="space-y-2 text-xs leading-5 text-muted-foreground">
                    {plan.features.map((feature, i) => {
                      const Icon = feature.icon
                      return (
                        <li key={i} className="flex items-start gap-2">
                          <Icon className="mt-0.5 h-3.5 w-3.5" />
                          <span>{feature.text}</span>
                        </li>
                      )
                    })}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </DialogContent>
    </Dialog>
  )
}
