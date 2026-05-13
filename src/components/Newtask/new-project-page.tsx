import { useEffect, useMemo, useRef, useState } from "react"
import { ArrowUp, Code2, Download, Eye, Layers, Sparkles } from "lucide-react"
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

const previewMarkup = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Stripe Checkout Preview</title>
    <style>
      * { box-sizing: border-box; }
      body {
        margin: 0;
        min-height: 100vh;
        font-family: Inter, system-ui, sans-serif;
        color: #ecfeff;
        background: #020617;
      }
      .page {
        min-height: 100vh;
        display: grid;
        place-items: center;
        padding: 32px;
      }
      .checkout {
        width: min(440px, 100%);
        border: 1px solid rgba(45, 212, 191, 0.24);
        border-radius: 24px;
        background: linear-gradient(180deg, rgba(8, 47, 73, 0.88), rgba(2, 6, 23, 0.96));
        box-shadow: 0 30px 80px rgba(0, 0, 0, 0.45);
        overflow: hidden;
      }
      .brand {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        padding: 22px;
        border-bottom: 1px solid rgba(148, 163, 184, 0.18);
      }
      .badge {
        border: 1px solid rgba(45, 212, 191, 0.28);
        border-radius: 999px;
        padding: 6px 10px;
        color: #5eead4;
        font-size: 12px;
      }
      h1 {
        margin: 0;
        font-size: 22px;
      }
      .content {
        padding: 22px;
        display: grid;
        gap: 16px;
      }
      label {
        display: grid;
        gap: 7px;
        color: #94a3b8;
        font-size: 12px;
      }
      input {
        width: 100%;
        border: 1px solid rgba(148, 163, 184, 0.22);
        border-radius: 12px;
        background: rgba(15, 23, 42, 0.78);
        color: #f8fafc;
        padding: 12px 14px;
        outline: none;
      }
      .row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
      }
      button {
        border: 0;
        border-radius: 14px;
        background: #2dd4bf;
        color: #042f2e;
        font-weight: 700;
        padding: 13px 16px;
      }
    </style>
  </head>
  <body>
    <main class="page">
      <section class="checkout">
        <div class="brand">
          <h1>Daisy Pro</h1>
          <span class="badge">Stripe ready</span>
        </div>
        <div class="content">
          <label>Email<input value="customer@example.com" /></label>
          <label>Card number<input value="4242 4242 4242 4242" /></label>
          <div class="row">
            <label>Expiry<input value="12 / 28" /></label>
            <label>CVC<input value="123" /></label>
          </div>
          <button>Pay $29</button>
        </div>
      </section>
    </main>
  </body>
</html>`

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

export default function NewProjectPage() {
  const location = useLocation()
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<ProjectMessage[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const locationState = location.state as {
    projectName?: string
    projectInstructions?: string
  } | null
  const projectName = locationState?.projectName?.trim() || "New project"

  const codeText = useMemo(() => previewMarkup.trim(), [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ block: "end" })
  }, [messages])

  const handleSend = () => {
    const prompt = input.trim()
    if (!prompt) return

    setMessages((prev) => [
      ...prev,
      { id: createMessageId(), role: "user", content: prompt },
      {
        id: createMessageId(),
        role: "assistant",
        content:
          "Preview updated locally. Use the Preview tab to run it, Code to inspect it, or Download to save the HTML.",
      },
    ])
    setInput("")
  }

  const handleDownload = () => {
    const blob = new Blob([codeText], { type: "text/html;charset=utf-8" })
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
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault()
                    handleSend()
                  }
                }}
                placeholder="ask anything, I'll generate it for you"
                className="max-h-40 min-h-20 resize-none border-0 bg-transparent px-2 py-2 shadow-none focus-visible:ring-0"
              />
              <div className="flex justify-end">
                <Button
                  type="button"
                  size="icon-sm"
                  onClick={handleSend}
                  disabled={!input.trim()}
                  aria-label="Send message"
                >
                  <ArrowUp className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="flex min-h-0 flex-col rounded-2xl border border-border bg-card shadow-sm">
          <Tabs defaultValue="preview" className="flex min-h-0 flex-1 gap-0">
            <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
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

            <TabsContent value="preview" className="m-0 min-h-0 flex-1">
              <iframe
                title="Project preview"
                srcDoc={codeText}
                className="h-full w-full border-0 bg-background"
              />
            </TabsContent>

            <TabsContent value="code" className="m-0 min-h-0 flex-1">
              <pre className="h-full overflow-auto bg-background p-4 text-xs leading-5 text-foreground">
                <code>{codeText}</code>
              </pre>
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </div>
  )
}
