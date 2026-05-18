import { useEffect, useMemo, useRef, useState } from "react"
import {
  ArrowUp,
  Code2,
  Copy,
  Download,
  Eye,
  File,
  Folder,
  Layers,
  Monitor,
  Smartphone,
  Sparkles,
} from "lucide-react"
import { useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Header } from "./header"

type ProjectMessage = {
  id: string
  role: "user" | "assistant"
  content: string
}

const reactAppCode = `import { Activity, Bot, LineChart } from "lucide-react";

const stats = [
  { label: "Accuracy", value: "94%", trend: "+8%" },
  { label: "Tasks", value: "2.4k", trend: "+18%" },
  { label: "Latency", value: "1.8s", trend: "-12%" },
];

export default function App() {
  return (
    <main className="min-h-screen bg-slate-950 p-4 text-slate-950">
      <section className="mx-auto grid max-w-5xl gap-4 rounded-3xl border border-emerald-400/20 bg-emerald-50 p-4 shadow-2xl shadow-emerald-950/30 md:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-3xl bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-emerald-700">AI dashboard</p>
              <h1 className="mt-1 text-3xl font-black tracking-tight">brainFx</h1>
            </div>
            <div className="grid size-11 place-items-center rounded-2xl bg-emerald-500 text-white">
              <Bot className="size-5" />
            </div>
          </div>

          <div className="mt-6 rounded-3xl bg-slate-950 p-4 text-white">
            <div className="flex items-center justify-between">
              <span className="text-sm text-emerald-200">Neural score</span>
              <Activity className="size-4 text-emerald-300" />
            </div>
            <p className="mt-3 text-5xl font-black">87.4</p>
            <div className="mt-4 flex h-28 items-end gap-2">
              {[34, 58, 42, 76, 64, 91, 82].map((height, index) => (
                <div
                  key={index}
                  className="flex-1 rounded-t-xl bg-emerald-400"
                  style={{ height: \`\${height}%\` }}
                />
              ))}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {stats.map((item) => (
              <div key={item.label} className="rounded-2xl bg-emerald-50 p-3">
                <p className="text-xl font-black">{item.value}</p>
                <p className="text-xs text-slate-500">{item.label}</p>
                <p className="mt-1 text-xs font-bold text-emerald-700">{item.trend}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-3xl bg-white p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black">Model activity</h2>
              <LineChart className="size-5 text-emerald-600" />
            </div>
            <div className="mt-5 grid gap-3">
              {["Intent classifier", "Email assistant", "Workflow planner"].map((name, index) => (
                <div key={name} className="rounded-2xl bg-slate-50 p-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold">{name}</span>
                    <span className="text-emerald-700">{92 - index * 7}%</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
                    <div className="h-full rounded-full bg-emerald-500" style={{ width: \`\${92 - index * 7}%\` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-3xl bg-white p-5">
              <p className="text-sm text-slate-500">Automation</p>
              <p className="mt-2 text-3xl font-black">76%</p>
              <div className="mt-4 aspect-square rounded-full border-[16px] border-emerald-500 border-r-emerald-100" />
            </div>
            <div className="rounded-3xl bg-white p-5">
              <p className="text-sm text-slate-500">Queue</p>
              <p className="mt-2 text-3xl font-black">18</p>
              <div className="mt-5 space-y-2">
                <div className="h-3 rounded-full bg-emerald-500" />
                <div className="h-3 w-3/4 rounded-full bg-emerald-200" />
                <div className="h-3 w-1/2 rounded-full bg-emerald-100" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}`

const previewMarkup = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>brainFx Preview</title>
    <style>
      * { box-sizing: border-box; }
      body {
        margin: 0;
        min-height: 100vh;
        font-family: Inter, system-ui, sans-serif;
        color: #0f172a;
        background: #ecfdf5;
      }
      .shell {
        min-height: 100vh;
        padding: clamp(20px, 4vw, 48px);
      }
      .card {
        width: min(1040px, 100%);
        margin: 0 auto;
        border: 1px solid #bbf7d0;
        border-radius: 24px;
        background: white;
        box-shadow: 0 24px 70px rgba(6, 78, 59, 0.12);
        padding: clamp(22px, 4vw, 40px);
      }
      nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .brand {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .logo {
        display: grid;
        place-items: center;
        width: 40px;
        height: 40px;
        border-radius: 16px;
        background: #10b981;
        color: white;
        font-weight: 900;
      }
      .brand strong,
      .brand span {
        display: block;
      }
      .brand span {
        margin-top: 2px;
        font-size: 12px;
        color: #64748b;
      }
      .button {
        border: 0;
        border-radius: 999px;
        background: #0f172a;
        color: white;
        padding: 10px 18px;
        font-weight: 700;
      }
      .hero {
        display: grid;
        grid-template-columns: 1.1fr 0.9fr;
        gap: clamp(24px, 5vw, 56px);
        align-items: center;
        margin-top: clamp(32px, 6vw, 72px);
      }
      .eyebrow {
        color: #047857;
        font-weight: 700;
      }
      h1 {
        margin: 12px 0 0;
        font-size: clamp(40px, 7vw, 72px);
        line-height: 0.95;
        letter-spacing: 0;
      }
      p {
        color: #475569;
        line-height: 1.65;
      }
      .panel {
        border-radius: 24px;
        background: #020617;
        color: white;
        padding: 18px;
      }
      .panel-inner {
        border-radius: 18px;
        background: rgba(255,255,255,0.1);
        padding: 18px;
      }
      .task {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-top: 12px;
        border-radius: 14px;
        background: rgba(255,255,255,0.1);
        padding: 12px;
        font-size: 14px;
      }
      .stats {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 12px;
        margin-top: 36px;
      }
      .stat {
        border-radius: 18px;
        background: #ecfdf5;
        padding: 16px;
      }
      .stat strong {
        display: block;
        font-size: 28px;
      }
      @media (max-width: 760px) {
        .hero,
        .stats {
          grid-template-columns: 1fr;
        }
        nav {
          align-items: flex-start;
          gap: 16px;
        }
      }
    </style>
  </head>
  <body>
    <main class="shell">
      <section class="card">
        <nav>
          <div class="brand">
            <div class="logo">*</div>
            <div><strong>brainFx</strong><span>AI workspace</span></div>
          </div>
          <button class="button">Start</button>
        </nav>
        <div class="hero">
          <div>
            <div class="eyebrow">Smart planning dashboard</div>
            <h1>Build focused workflows with one clean AI cockpit.</h1>
            <p>Track progress, manage priorities, and turn ideas into structured project plans from a single responsive interface.</p>
            <button class="button">View project -></button>
          </div>
          <div class="panel">
            <div class="panel-inner">
              <p style="color:#a7f3d0;margin:0;">Today</p>
              <h2>Launch plan</h2>
              <div class="task">✓ Design system</div>
              <div class="task">✓ Landing page</div>
              <div class="task">✓ User testing</div>
            </div>
          </div>
        </div>
        <div class="stats">
          <div class="stat"><strong>128</strong><span>Projects</span></div>
          <div class="stat"><strong>2.4k</strong><span>Tasks done</span></div>
          <div class="stat"><strong>1.8s</strong><span>Response</span></div>
        </div>
      </section>
    </main>
  </body>
</html>`

const aiDashboardPreviewMarkup = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>brainFx AI Dashboard</title>
    <style>
      * { box-sizing: border-box; }
      html,
      body {
        margin: 0;
        min-height: 100%;
        font-family: Inter, system-ui, sans-serif;
        color: #0f172a;
        background: #031b17;
        scrollbar-width: none;
      }
      html::-webkit-scrollbar,
      body::-webkit-scrollbar,
      .shell::-webkit-scrollbar {
        display: none;
      }
      body {
        overflow-y: auto;
        -ms-overflow-style: none;
      }
      .shell {
        min-height: 100vh;
        overflow-y: auto;
        padding: clamp(12px, 3vw, 24px);
        scrollbar-width: none;
      }
      .dashboard {
        width: min(980px, 100%);
        margin: 0 auto;
        display: grid;
        grid-template-columns: minmax(280px, 0.9fr) minmax(320px, 1.1fr);
        gap: 16px;
        border: 1px solid rgba(52, 211, 153, 0.2);
        border-radius: 28px;
        background: #dff8ec;
        padding: 16px;
        box-shadow: 0 28px 80px rgba(0, 0, 0, 0.32);
      }
      .card {
        border-radius: 24px;
        background: white;
        padding: 20px;
        box-shadow: 0 16px 38px rgba(15, 23, 42, 0.08);
      }
      .top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
      }
      .badge {
        display: inline-flex;
        border-radius: 999px;
        background: #d1fae5;
        color: #047857;
        padding: 7px 10px;
        font-size: 12px;
        font-weight: 800;
      }
      .logo {
        display: grid;
        place-items: center;
        width: 44px;
        height: 44px;
        border-radius: 16px;
        background: #10b981;
        color: white;
        font-weight: 900;
      }
      h1,
      h2,
      p {
        margin: 0;
      }
      h1 {
        margin-top: 16px;
        max-width: 320px;
        font-size: clamp(32px, 5vw, 52px);
        line-height: 0.95;
        letter-spacing: 0;
      }
      .muted {
        color: #64748b;
        line-height: 1.55;
      }
      .score {
        margin-top: 22px;
        border-radius: 24px;
        background: #020617;
        color: white;
        padding: 18px;
      }
      .score-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .score-value {
        margin-top: 10px;
        font-size: 48px;
        font-weight: 900;
      }
      .bars {
        display: flex;
        height: 112px;
        align-items: end;
        gap: 8px;
        margin-top: 18px;
      }
      .bar {
        flex: 1;
        border-radius: 12px 12px 4px 4px;
        background: linear-gradient(180deg, #34d399, #059669);
      }
      .stats {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
        margin-top: 14px;
      }
      .stat {
        border-radius: 18px;
        background: #ecfdf5;
        padding: 12px;
      }
      .stat strong {
        display: block;
        font-size: 22px;
      }
      .grid {
        display: grid;
        gap: 16px;
      }
      .metric {
        border-radius: 18px;
        background: #f8fafc;
        padding: 14px;
      }
      .metric + .metric {
        margin-top: 10px;
      }
      .metric-head {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        font-weight: 800;
      }
      .track {
        height: 9px;
        margin-top: 10px;
        overflow: hidden;
        border-radius: 999px;
        background: #e2e8f0;
      }
      .fill {
        height: 100%;
        border-radius: inherit;
        background: #10b981;
      }
      .mini-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
      }
      .ring {
        width: min(150px, 100%);
        aspect-ratio: 1;
        margin: 18px auto 0;
        border-radius: 50%;
        border: 18px solid #10b981;
        border-right-color: #d1fae5;
      }
      .queue span {
        display: block;
        height: 12px;
        margin-top: 10px;
        border-radius: 999px;
        background: #10b981;
      }
      .queue span:nth-child(2) {
        width: 75%;
        background: #a7f3d0;
      }
      .queue span:nth-child(3) {
        width: 52%;
        background: #d1fae5;
      }
      @media (max-width: 760px) {
        .shell {
          padding: 0;
        }
        .dashboard {
          min-height: 100vh;
          grid-template-columns: 1fr;
          gap: 12px;
          border: 0;
          border-radius: 0;
          padding: 12px;
          box-shadow: none;
        }
        .card {
          border-radius: 20px;
          padding: 16px;
        }
        h1 {
          font-size: 34px;
        }
        .score-value {
          font-size: 42px;
        }
        .mini-grid {
          grid-template-columns: 1fr;
        }
      }
    </style>
  </head>
  <body>
    <main class="shell">
      <section class="dashboard">
        <div class="card">
          <div class="top">
            <div>
              <span class="badge">AI dashboard</span>
              <h1>Small charts for smarter work.</h1>
            </div>
            <div class="logo">AI</div>
          </div>
          <p class="muted" style="margin-top:14px;">Track model quality, task volume, and automation health in one compact workspace.</p>

          <div class="score">
            <div class="score-row">
              <span style="color:#a7f3d0;">Neural score</span>
              <span>Live</span>
            </div>
            <div class="score-value">87.4</div>
            <div class="bars">
              <div class="bar" style="height:34%;"></div>
              <div class="bar" style="height:58%;"></div>
              <div class="bar" style="height:42%;"></div>
              <div class="bar" style="height:76%;"></div>
              <div class="bar" style="height:64%;"></div>
              <div class="bar" style="height:91%;"></div>
              <div class="bar" style="height:82%;"></div>
            </div>
          </div>

          <div class="stats">
            <div class="stat"><strong>94%</strong><span class="muted">Accuracy</span></div>
            <div class="stat"><strong>2.4k</strong><span class="muted">Tasks</span></div>
            <div class="stat"><strong>1.8s</strong><span class="muted">Latency</span></div>
          </div>
        </div>

        <div class="grid">
          <div class="card">
            <div class="top">
              <h2>Model activity</h2>
              <span class="badge">+18%</span>
            </div>
            <div class="metric">
              <div class="metric-head"><span>Intent classifier</span><span>92%</span></div>
              <div class="track"><div class="fill" style="width:92%;"></div></div>
            </div>
            <div class="metric">
              <div class="metric-head"><span>Email assistant</span><span>85%</span></div>
              <div class="track"><div class="fill" style="width:85%;"></div></div>
            </div>
            <div class="metric">
              <div class="metric-head"><span>Workflow planner</span><span>78%</span></div>
              <div class="track"><div class="fill" style="width:78%;"></div></div>
            </div>
          </div>

          <div class="mini-grid">
            <div class="card">
              <p class="muted">Automation</p>
              <h2 style="margin-top:6px;font-size:34px;">76%</h2>
              <div class="ring"></div>
            </div>
            <div class="card">
              <p class="muted">Queue</p>
              <h2 style="margin-top:6px;font-size:34px;">18</h2>
              <div class="queue">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </body>
</html>`

type ProjectFile = {
  name: string
  type: "folder" | "file"
  depth: number
  active?: boolean
}

const projectFiles: ProjectFile[] = [
  { name: "client", type: "folder", depth: 0 },
  { name: "public", type: "folder", depth: 1 },
  { name: "src", type: "folder", depth: 1 },
  { name: "components", type: "folder", depth: 2 },
  { name: "hooks", type: "folder", depth: 2 },
  { name: "lib", type: "folder", depth: 2 },
  { name: "App.tsx", type: "file", depth: 2, active: true },
  { name: "index.css", type: "file", depth: 2 },
  { name: "main.tsx", type: "file", depth: 2 },
  { name: "package.json", type: "file", depth: 1 },
  { name: "vite.config.ts", type: "file", depth: 1 },
]

const createMessageId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

function renderInlineMarkdown(text: string) {
  return text.split(/(\*\*[^*]+\*\*|\*[^*\s][^*]*\*)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      )
    }

    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <em key={index} className="italic">
          {part.slice(1, -1)}
        </em>
      )
    }

    return part
  })
}

function getMarkdownHeading(text: string) {
  const headingMatch = text.match(/^#{1,6}\s+(.+?)(?:\s+#{1,6})?$/)
  return headingMatch?.[1]?.trim() ?? null
}

function CodeEditor({ code }: { code: string }) {
  return (
    <div className="grid h-full min-h-0 bg-[#1f1f1f] text-[#d4d4d4] md:grid-cols-[176px_minmax(0,1fr)]">
      <aside className="hidden min-h-0 overflow-y-auto border-r border-white/10 bg-[#181818] px-2 py-3 text-xs text-[#c8c8c8] md:block">
        {projectFiles.map((item) => {
          const Icon = item.type === "folder" ? Folder : File

          return (
            <div
              key={`${item.depth}-${item.name}`}
              className={`flex items-center gap-2 rounded px-2 py-1.5 ${
                item.active ? "bg-white/10 text-white" : "hover:bg-white/5"
              }`}
              style={{ paddingLeft: `${8 + item.depth * 14}px` }}
            >
              <Icon className="size-3.5 shrink-0 text-[#9ca3af]" />
              <span className="truncate">{item.name}</span>
            </div>
          )
        })}
      </aside>

      <div className="flex min-h-0 min-w-0 flex-col">
        <div className="flex h-9 shrink-0 items-center justify-between border-b border-white/10 bg-[#181818] px-3 text-xs text-[#a0a0a0]">
          <span>
            client / src / <span className="text-white">App.tsx</span>
          </span>
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              className="rounded-md text-[#a0a0a0] hover:bg-white/10 hover:text-white"
              aria-label="Copy code"
              onClick={() => {
                void navigator.clipboard?.writeText(code)
              }}
            >
              <Copy className="size-3.5" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              className="rounded-md text-[#a0a0a0] hover:bg-white/10 hover:text-white"
              aria-label="Download code"
            >
              <Download className="size-3.5" />
            </Button>
          </div>
        </div>

        <pre className="min-h-0 flex-1 overflow-auto p-4 font-mono text-xs leading-6">
          <code>
            {code.split("\n").map((line, index) => (
              <span key={index} className="grid grid-cols-[3rem_minmax(0,1fr)]">
                <span className="select-none pr-4 text-right text-[#6b7280]">
                  {index + 1}
                </span>
                <span className="min-w-0 whitespace-pre text-[#d4d4d4]">
                  {line || " "}
                </span>
              </span>
            ))}
          </code>
        </pre>
      </div>
    </div>
  )
}

export default function NewProjectPage() {
  const location = useLocation()
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<ProjectMessage[]>([])
  const [showComingSoon, setShowComingSoon] = useState(false)
  const [activePanel, setActivePanel] = useState("preview")
  const [previewDevice, setPreviewDevice] = useState("desktop")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const locationState = location.state as {
    projectName?: string
    projectInstructions?: string
  } | null
  const projectName = locationState?.projectName?.trim() || "New project"

  const codeText = useMemo(() => reactAppCode.trim(), [])
  const previewText = useMemo(
    () => (aiDashboardPreviewMarkup || previewMarkup).trim(),
    []
  )

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ block: "end" })
  }, [messages])

  const handleSend = () => {
    setShowComingSoon(true)

    const prompt = "Project generation is coming soon"
    setMessages((prev) => [
      ...prev,
      {
        id: createMessageId(),
        role: "assistant",
        content: prompt,
      },
    ])
    setInput("")
  }

  const handleDownload = () => {
    const blob = new Blob([previewText], { type: "text/html;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "daisy-project-preview.html"
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex h-[100dvh] w-full flex-col overflow-hidden bg-background">
      <Header />
      <main className="grid min-h-0 w-full flex-1 gap-4 overflow-hidden p-4 lg:grid-cols-[minmax(320px,0.95fr)_minmax(420px,1.05fr)]">
        <section className="flex min-h-0 flex-col rounded-2xl border border-border bg-card shadow-sm">
          <div className="flex items-center gap-3 border-b border-border px-4 py-3">
            <div className="flex size-9 items-center justify-center rounded-xl border border-border bg-background">
              <Layers className="size-4 text-foreground" />
            </div>
            <div className="min-w-0">
              <h1 className="truncate text-sm font-semibold text-foreground">
                {projectName}
              </h1>
              <p className="truncate text-xs text-muted-foreground">
                Local builder chat
              </p>
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
            <div className="flex min-h-full flex-col justify-end gap-3">
              {messages.length === 0 ? (
                <div className="mx-auto flex max-w-sm flex-col items-center text-center">
                  <div className="mb-3 flex size-10 items-center justify-center rounded-xl border border-border bg-background">
                    <Sparkles className="size-4 text-primary" />
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    Describe the project you want to build.
                  </p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    This page keeps the chat local and shows the result in the
                    preview panel.
                  </p>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={
                      message.role === "user"
                        ? "ml-auto max-w-[82%] rounded-2xl rounded-br-md bg-primary px-3 py-2 text-sm text-primary-foreground"
                        : "mr-auto max-w-[86%] rounded-2xl rounded-bl-md border border-border bg-background px-3 py-2 text-sm text-foreground"
                    }
                  >
                    {getMarkdownHeading(message.content) ? (
                      <span className="text-base font-semibold">
                        {renderInlineMarkdown(
                          getMarkdownHeading(message.content) ?? ""
                        )}
                      </span>
                    ) : (
                      renderInlineMarkdown(message.content)
                    )}
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="border-t border-border p-3">
            <div className="rounded-2xl border border-border bg-background p-2">
              <Textarea
                value={input}
                readOnly
                onFocus={() => setShowComingSoon(true)}
                onChange={() => setShowComingSoon(true)}
                onKeyDown={(event) => {
                  event.preventDefault()
                  setShowComingSoon(true)
                }}
                placeholder="Project chat is coming soon"
                className="max-h-40 min-h-20 resize-none border-0 bg-transparent px-2 py-2 shadow-none focus-visible:ring-0"
              />
              {showComingSoon ? (
                <div className="mx-2 mb-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs leading-5 text-emerald-900 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-100">
                  <p className="font-semibold">
                    Project generation is coming soon
                  </p>
                  <p className="text-emerald-900/75 dark:text-emerald-100/75">
                    Soon you will be able to describe a project here and preview
                    the generated result instantly.
                  </p>
                </div>
              ) : null}
              <div className="flex justify-end">
                <Button
                  type="button"
                  size="icon-sm"
                  onClick={handleSend}
                  aria-label="Project chat coming soon"
                >
                  <ArrowUp className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="flex min-h-0 flex-col rounded-2xl border border-border bg-card shadow-sm">
          <Tabs
            value={activePanel}
            onValueChange={setActivePanel}
            className="flex min-h-0 flex-1 gap-0"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
              <div className="flex items-center gap-2">
                <TabsList className="h-9">
                  <TabsTrigger value="preview" className="gap-1.5 text-xs">
                    <Eye className="size-3.5" />
                    Preview
                  </TabsTrigger>
                  <TabsTrigger value="code" className="gap-1.5 text-xs">
                    <Code2 className="size-3.5" />
                    Code
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="flex items-center gap-2">
                {activePanel === "preview" ? (
                  <Tabs
                    value={previewDevice}
                    onValueChange={setPreviewDevice}
                  >
                    <TabsList className="h-9 border border-border/70 bg-muted/70">
                      <TabsTrigger
                        value="desktop"
                        className="px-2.5"
                        aria-label="Desktop preview"
                      >
                        <Monitor className="size-3.5" />
                      </TabsTrigger>
                      <TabsTrigger
                        value="mobile"
                        className="px-2.5"
                        aria-label="Mobile preview"
                      >
                        <Smartphone className="size-3.5" />
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                ) : null}

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleDownload}
                >
                  <Download className="size-3.5" />
                  Download
                </Button>
              </div>
            </div>

            <TabsContent
              value="preview"
              className="hide-scrollbar m-0 min-h-0 flex-1 overflow-hidden bg-muted/25 p-3"
            >
              <div className="hide-scrollbar flex h-full min-h-0 justify-center overflow-hidden">
                <div
                  className={
                    previewDevice === "mobile"
                      ? "hide-scrollbar h-full min-h-0 w-full max-w-[390px] overflow-hidden rounded-[28px] border border-border bg-background shadow-xl"
                      : "hide-scrollbar h-full min-h-[520px] w-full overflow-hidden rounded-xl border border-border bg-background shadow-sm"
                  }
                >
                  <iframe
                    title="Project preview"
                    srcDoc={previewText}
                    className="hide-scrollbar h-full w-full border-0 bg-background"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="code" className="m-0 min-h-0 flex-1">
              <CodeEditor code={codeText} />
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </div>
  )
}
