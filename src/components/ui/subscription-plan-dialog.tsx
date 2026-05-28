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
  const [selectedPlan, setSelectedPlan] = useState("Basic")
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
      desc: "Standard monthly usage",
      highlight: false,
      features: [
        { icon: Clock, text: "300 daily refresh credits" },
        { icon: Sparkles, text: "4,000 credits per month" },
        {
          icon: FlaskConical,
          text: "In-depth research for daily tasks",
        },
        {
          icon: Globe,
          text: "Professional websites for standard results",
        },
        {
          icon: FileText,
          text: "Insightful presentations for regular content",
        },
        { icon: Sparkles, text: "Task scaling with broader research" },
        { icon: FlaskConical, text: "Early access to beta features" },
        { icon: CheckCheck, text: "20 concurrent tasks" },
        { icon: Calendar, text: "20 scheduled tasks" },
      ],
    },
    {
      name: "Pro",
      monthly: 40,
      yearly: 34,
      desc: "Flexible monthly usage",
      highlight: true,
      dropdown: true,
      features: [
        { icon: Clock, text: "300 daily refresh credits" },
        { icon: Sparkles, text: "8,000 credits per month" },
        {
          icon: FlaskConical,
          text: "Advanced research with adaptive usage",
        },
        {
          icon: Globe,
          text: "Professional websites for changing needs",
        },
        {
          icon: FileText,
          text: "Insightful presentations for continuous creation",
        },
        {
          icon: Sparkles,
          text: "Expanded research tailored to your selected plan",
        },
        { icon: FlaskConical, text: "Early access to beta features" },
        { icon: CheckCheck, text: "20 concurrent tasks" },
        { icon: Calendar, text: "20 scheduled tasks" },
      ],
    },
    {
      name: "Enterprise",
      monthly: 200,
      yearly: 167,
      desc: "Extended usage for large-scale productivity",
      highlight: false,
      features: [
        { icon: Clock, text: "300 daily refresh credits" },
        { icon: Sparkles, text: "40,000 credits per month" },
        {
          icon: FlaskConical,
          text: "Advanced research for large-scale work",
        },
        { icon: Globe, text: "Professional websites with data analysis" },
        {
          icon: FileText,
          text: "Insightful presentations for batch production",
        },
        {
          icon: Sparkles,
          text: "Expanded research for sustained high-volume use",
        },
        { icon: FlaskConical, text: "Early access to beta features" },
        { icon: CheckCheck, text: "20 concurrent tasks" },
        { icon: Calendar, text: "20 scheduled tasks" },
      ],
    },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="h-[90vh] overflow-y-auto rounded-2xl border border-border bg-background p-6 sm:max-w-6xl">
        <DialogHeader className="text-center">
          <DialogTitle className="text-lg font-semibold tracking-tight">
            Upgrade to Daisy AI Studio Pro
          </DialogTitle>
        </DialogHeader>

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
                Yearly - Save 17%
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="mt-3 grid grid-cols-1 items-stretch gap-4 md:grid-cols-3">
          {plans.map((plan, index) => {
            const price = billing === "monthly" ? plan.monthly : plan.yearly
            const isSelected = selectedPlan === plan.name
            const isLoading = loadingPlan === plan.name

            return (
              <Card
                key={index}
                className={`flex h-full flex-col justify-between rounded-3xl border p-4 shadow-sm transition ${
                  isSelected
                    ? "border-primary/20 bg-[#020606] shadow-[0_0_0_1px_rgba(255,255,255,0.03)]"
                    : "border-border/70 bg-muted/5 hover:bg-muted/10"
                }`}
              >
                <CardHeader className="space-y-3 px-1 pb-0">
                  <div
                    className={`flex items-center justify-between gap-2 text-xs tracking-[0.2em] uppercase ${
                      isSelected ? "text-cyan-400/90" : "text-muted-foreground"
                    }`}
                  >
                    <span>{plan.name}</span>
                    {plan.highlight ? <span>Popular</span> : null}
                  </div>
                  <div
                    key={`${plan.name}-${billing}`}
                    className="flex items-end gap-2"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    <span
                      className={`inline-flex animate-in items-end gap-1 text-2xl font-semibold tabular-nums duration-200 fade-in slide-in-from-bottom-1 ${
                        isSelected ? "text-slate-100" : ""
                      }`}
                    >
                      <span>$</span>
                      <span>{price}</span>
                    </span>
                    <span
                      className={`animate-in text-[11px] duration-200 fade-in slide-in-from-bottom-1 ${
                        isSelected ? "text-cyan-400/80" : "text-muted-foreground"
                      }`}
                    >
                      {billing === "monthly" ? "/ monthly" : "/ yearly"}
                    </span>
                  </div>
                  <p
                    className={`text-xs leading-5 ${
                      isSelected ? "text-cyan-300/85" : "text-muted-foreground"
                    }`}
                  >
                    {plan.desc}
                  </p>
                </CardHeader>

                <CardContent className="flex flex-1 flex-col gap-4 px-1 pt-0">
                  {isSelected || isLoading ? (
                    <Button
                      className={`h-10 w-full text-sm font-medium shadow-sm transition ${
                        isLoading
                          ? "bg-primary text-primary-foreground"
                          : "bg-emerald-700 text-black hover:bg-emerald-700"
                      }`}
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
                      className="h-10 w-full bg-secondary text-sm text-secondary-foreground transition hover:bg-secondary/80"
                      variant="secondary"
                      onClick={(event) => {
                        event.stopPropagation()
                        handleSelectPlan(plan.name)
                      }}
                    >
                      Upgrade
                    </Button>
                  )}

                  {plan.dropdown && (
                    <div className="rounded-xl border border-border/80 px-3 py-2 text-xs text-muted-foreground">
                      8,000 credits / monthly
                    </div>
                  )}

                  <ul
                    className={`space-y-2 text-xs leading-5 ${
                      isSelected ? "text-cyan-300/85" : "text-muted-foreground"
                    }`}
                  >
                    {plan.features.map((feature, i) => {
                      const Icon = feature.icon
                      return (
                        <li key={i} className="flex items-start gap-2">
                          <Icon
                            className={`mt-0.5 h-3.5 w-3.5 ${
                              isSelected ? "text-cyan-400/90" : ""
                            }`}
                          />
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
