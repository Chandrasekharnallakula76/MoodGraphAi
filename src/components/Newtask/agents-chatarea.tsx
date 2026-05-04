import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bot, Cpu, Puzzle, MessageCircle } from "lucide-react"

const features = [
  {
    icon: Bot,
    title: "Identity aligned with your brand",
    desc: "Trained on your workflows and connected to your tools.",
  },
  {
    icon: Cpu,
    title: "Persistent memory and computer",
    desc: "A cloud assistant that keeps context and memory available 24/7.",
  },
  {
    icon: Puzzle,
    title: "Custom skills",
    desc: "Equip your assistant with specialized knowledge for specific work.",
  },
  {
    icon: MessageCircle,
    title: "Works in your messaging app",
    desc: "Available in Telegram, Line, and Slack. More platforms soon.",
  },
]

const AgentsChatArea = () => {
  return (
    <div className="flex min-h-full w-full items-start justify-center px-4 py-6 md:px-6 md:py-8">
      <div className="w-full max-w-6xl space-y-8 text-center md:space-y-10">
        <div className="flex justify-center">
          <div className="rounded-2xl border bg-card p-4 shadow-sm md:p-6">
            <Bot className="h-8 w-8 md:h-10 md:w-10" />
          </div>
        </div>

        <h1 className="px-2 text-xl font-semibold leading-tight md:text-2xl">
          Deploy your agent for research
        </h1>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 md:gap-4">
          {features.map((item, index) => {
            const Icon = item.icon
            return (
              <Card key={index} className="rounded-2xl">
                <CardContent className="space-y-3 p-4 text-left md:p-5">
                  <Icon className="h-5 w-5" />
                  <h3 className="text-sm font-medium leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="flex justify-center">
          <Button className="h-10 rounded-full px-6 text-sm md:h-11">
            Get started
          </Button>
        </div>

        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Coming soon</p>
          <div className="flex justify-center gap-2">
            <Badge variant="outline">WhatsApp</Badge>
            <Badge variant="outline">Messenger</Badge>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AgentsChatArea
