import { Card, CardContent } from "@/components/ui/card"
import { Bot, Cpu, Puzzle, MessageCircle, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

const features = [
  {
    icon: Bot,
    title: "Brand audit report",
    desc: "Trained on your workflows and connected to your tools.",
    accent: "from-emerald-500/16 to-teal-500/8",
    iconTone: "text-emerald-600",
  },
  {
    icon: Cpu,
    title: "Persistent memory and computer",
    desc: "A cloud assistant that keeps context and memory available 24/7.",
    accent: "from-sky-500/16 to-cyan-500/8",
    iconTone: "text-sky-600",
  },
  {
    icon: Puzzle,
    title: "Custom skills",
    desc: "Equip your assistant with specialized knowledge for specific work.",
    accent: "from-violet-500/16 to-fuchsia-500/8",
    iconTone: "text-violet-600",
  },
  {
    icon: MessageCircle,
    title: "Works in your messaging app",
    desc: "Available in Telegram, Line, and Slack. More platforms soon.",
    accent: "from-amber-500/16 to-orange-500/8",
    iconTone: "text-amber-600",
  },
]

const AgentsChatArea = () => {
  return (
    <div className="flex min-h-full w-full items-start justify-center bg-[radial-gradient(circle_at_top,_color-mix(in_oklch,var(--primary)_8%,transparent),_transparent_36%)] px-4 py-8 md:px-6 md:py-12">
      <div className="w-full max-w-6xl space-y-9 text-center md:space-y-11">
        <div className="space-y-5">
          <div className="flex justify-center">
            <div className="group rounded-[22px] border border-border/80 bg-card p-5 shadow-sm shadow-black/5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 md:p-6">
              <Bot className="h-9 w-9 text-foreground transition-transform duration-300 group-hover:scale-110 md:h-10 md:w-10" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="px-2 text-2xl leading-tight font-semibold tracking-tight text-foreground md:text-3xl">
              Analyze faster with specialized agents
            </h1>
            <p className="mx-auto max-w-2xl px-2 text-sm leading-6 text-muted-foreground">
              Select an expert workflow to review your brand, research market
              signals, and turn complex work into clear, actionable insights.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-4">
          {features.map((item, index) => {
            const Icon = item.icon
            return (
              <Card
                key={index}
                className="group relative overflow-hidden rounded-3xl border-border/80 bg-card shadow-sm shadow-black/5 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10"
              >
                <div
                  className={cn(
                    "pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                    item.accent
                  )}
                />
                <CardContent className="relative flex min-h-54 flex-col p-5 text-left md:p-6">
                  <div
                    className={cn(
                      "mb-7 flex size-10 items-center justify-center rounded-2xl border border-border/70 bg-background/80 transition-all duration-300 group-hover:scale-105 group-hover:border-primary/30",
                      item.iconTone
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-base leading-snug font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-6 text-muted-foreground">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-auto pt-7">
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                      Open workflow
                      <ArrowRight className="size-3.5" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default AgentsChatArea
