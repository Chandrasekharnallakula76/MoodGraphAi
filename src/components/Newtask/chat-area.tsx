import { useState, useRef, useEffect, useCallback, useMemo } from "react"
import { useMutation } from "@tanstack/react-query"
import {
  Mic,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Pencil,
  Pause,
  ArrowRight,
  LoaderCircle,
  Check,
  FileText,
  Image,
  Headphones,
  Code,
  BarChart3,
  Mail,
  ArrowDown,
  Layers,
  ArrowUp,
  Lock,
  CheckCircle2,
  Circle,
  ListTodo,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { ConnectorsPanel } from "@/components/Newtask/connectors-panel"
import { FileSources } from "@/components/Newtask/file-sources"
import { MyComputerModal } from "@/components/Newtask/my-computer-modal"
import {
  GitHubProfilePreview,
  GitHubRepoListPreview,
} from "@/components/Newtask/github/github-repo-list"
import {
  formatGitHubProfileCopyText,
  formatGitHubRepoListCopyText,
} from "@/components/Newtask/github/github-repo-utils"
import { CalendarEventPreview } from "@/components/Newtask/calendar/calendar-event-preview"
import {
  formatCalendarEventCopyText,
  formatCalendarSlotCopyText,
} from "@/components/Newtask/calendar/calendar-utils"
import { sendChatMessage } from "@/apis/chat"
import type {
  ChatAssistantResponse,
  ChatEmailItem,
  ChatTaskItem,
} from "@/apis/chat"
import {
  getDefaultConnectorStatuses,
  isConnectorConnected,
  isConnectorEnabled,
  useConnectorsStatusQuery,
} from "@/apis/connectors/list"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type Message =
  | {
      id: string
      role: "user"
      content: string
    }
  | {
      id: string
      role: "assistant"
      content: string | ChatAssistantResponse
    }

type SuggestionCard = {
  id: "writing" | "image" | "audio" | "code" | "data" | "email"
  icon: typeof FileText
  text: string
  subtext: string
}

const suggestionCards: SuggestionCard[] = [
  {
    id: "writing",
    icon: FileText,
    text: "Write a story about a time traveler",
    subtext: "Creative writing",
  },
  {
    id: "image",
    icon: Image,
    text: "Generate a futuristic city skyline",
    subtext: "Image generation",
  },
  {
    id: "audio",
    icon: Headphones,
    text: "Summarize the latest AI podcast",
    subtext: "Audio summary",
  },
  {
    id: "code",
    icon: Code,
    text: "Debug this React component",
    subtext: "Code assistance",
  },
  {
    id: "data",
    icon: BarChart3,
    text: "Analyze Q3 sales data trends",
    subtext: "Data analysis",
  },
  {
    id: "email",
    icon: Mail,
    text: "Draft a professional email",
    subtext: "Email writing",
  },
]

const creativeWritingPrompts = [
  "Write a story about a time traveler",
  "Write a mystery set in a city where nobody sleeps",
  "Write a short story about a robot learning kindness",
  "Write a fantasy scene about a hidden door in a library",
  "Write a sci-fi story about the last message from Mars",
  "Write a dramatic story about two friends meeting after 20 years",
  "Write a funny story about a chef who cannot taste food",
  "Write an adventure story about a map that changes every night",
  "Write a ghost story set inside an old train station",
  "Write a hopeful story about rebuilding a village after a storm",
]

function getRandomCreativeWritingPrompt() {
  const index = Math.floor(Math.random() * creativeWritingPrompts.length)
  return creativeWritingPrompts[index]
}

function ManusLogoLarge() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex size-9 items-center justify-center rounded-xl border border-border bg-card shadow-sm">
        <Layers className="size-5 text-foreground" />
      </div>
      <span className="text-2xl font-semibold tracking-tight text-foreground">
        Daisy AI Studio
      </span>
      <span className="rounded-md border border-border bg-muted px-2 py-1 text-sm text-muted-foreground">
        Lite
      </span>
    </div>
  )
}

function ManusLogo() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex size-6 items-center justify-center rounded-lg border border-border bg-card shadow-sm">
        <Layers className="size-3.5 text-foreground" />
      </div>
      <span className="text-sm font-semibold tracking-tight text-foreground">
        Daisy AI Studio
      </span>
      <span className="rounded-md border border-emerald-200 bg-emerald-50 px-1.5 py-0.5 text-[11px] font-medium text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
        Lite
      </span>
    </div>
  )
}

function MessageActions() {
  return (
    <div className="mt-2.5 flex items-center gap-0.5">
      <Button
        variant="ghost"
        size="icon"
        className="size-7 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
      >
        <ThumbsUp className="size-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="size-7 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
      >
        <ThumbsDown className="size-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="size-7 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
      >
        <RotateCcw className="size-4" />
      </Button>
    </div>
  )
}

function renderInlineMarkdown(text: string) {
  return text.split(/(\*\*[^*]+\*\*|\*[^*\s][^*]*\*)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold">
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

function UserMessage({ content }: { content: string }) {
  return (
    <div className="flex justify-end py-4">
      <div className="flex max-w-[80%] items-start gap-3">
        <div className="rounded-2xl rounded-tr-sm border border-border bg-card px-4 py-3 shadow-sm">
          <p className="text-sm leading-relaxed text-foreground">
            {renderInlineMarkdown(content)}
          </p>
        </div>
        <button className="mt-1 text-muted-foreground transition-colors hover:text-foreground">
          <Pencil className="size-3.5" />
        </button>
      </div>
    </div>
  )
}

function formatEmailDate(dateString: string) {
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) {
    return dateString
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

type ParsedEmailReply = {
  subject: string
  greeting: string
  body: string[]
  closing: string
  signature: string[]
}

function parseEmailReply(text: string): ParsedEmailReply | null {
  const normalized = text.trim()
  if (
    !/^#\s*Email Reply/i.test(normalized) &&
    !/^\s*Subject:/im.test(normalized)
  ) {
    return null
  }

  const lines = normalized
    .replace(/^#\s*Email Reply\s*/i, "")
    .split(/\r?\n/)
    .map((line) => line.trimEnd())

  const subjectIndex = lines.findIndex((line) => /^Subject:/i.test(line.trim()))
  if (subjectIndex === -1) return null

  const subject = lines[subjectIndex].replace(/^Subject:\s*/i, "").trim()
  const contentLines = lines.slice(subjectIndex + 1)
  const firstBodyIndex = contentLines.findIndex(
    (line) => line.trim().length > 0
  )
  if (firstBodyIndex === -1) return null

  const greeting = contentLines[firstBodyIndex].trim()
  const remainder = contentLines.slice(firstBodyIndex + 1)

  const closingIndex = remainder.findIndex((line) =>
    /^(best regards|regards|sincerely|kind regards|warm regards)/i.test(
      line.trim()
    )
  )

  const bodySource =
    closingIndex === -1 ? remainder : remainder.slice(0, closingIndex)

  const body = bodySource
    .join("\n")
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)

  const closing =
    closingIndex === -1 ? "Best regards," : remainder[closingIndex].trim()
  const signature =
    closingIndex === -1
      ? []
      : remainder
          .slice(closingIndex + 1)
          .map((line) => line.trim())
          .filter(Boolean)

  return {
    subject,
    greeting,
    body,
    closing,
    signature,
  }
}

function EmailReplyPreview({ text }: { text: string }) {
  const parsed = parseEmailReply(text)

  if (!parsed) {
    return (
      <div className="space-y-1.5">
        {text.split("\n").map((line, i) => {
          const trimmedLine = line.trim()

          if (trimmedLine === "") {
            return <div key={i} className="h-2" />
          }

          const numberedMatch = trimmedLine.match(/^(\d+)\.\s*(.+)$/)
          if (numberedMatch) {
            return (
              <div key={i} className="flex gap-2">
                <span className="min-w-5 text-sm font-semibold text-foreground">
                  {numberedMatch[1]}.
                </span>
                <p className="text-sm leading-relaxed text-foreground/90">
                  {renderInlineMarkdown(numberedMatch[2])}
                </p>
              </div>
            )
          }

          const heading = getMarkdownHeading(trimmedLine)
          if (heading) {
            return (
              <h3
                key={i}
                className="pt-1 text-base leading-6 font-semibold text-foreground"
              >
                {renderInlineMarkdown(heading)}
              </h3>
            )
          }

          return (
            <p key={i} className="text-[15px] leading-6 text-foreground/90">
              {renderInlineMarkdown(trimmedLine)}
            </p>
          )
        })}
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border/70 bg-background shadow-sm">
      <div className="border-b border-border/70 bg-muted/40 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Mail className="size-4" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
              Email draft
            </p>
            <h3 className="truncate text-sm font-semibold text-foreground">
              {parsed.subject}
            </h3>
          </div>
        </div>
      </div>

      <div className="space-y-5 px-4 py-4">
        <div className="space-y-2 text-sm leading-6 text-foreground/90">
          <p className="font-medium text-foreground">
            {renderInlineMarkdown(parsed.greeting)}
          </p>
          {parsed.body.map((paragraph, index) => (
            <p key={index}>{renderInlineMarkdown(paragraph)}</p>
          ))}
        </div>

        <div className="space-y-1 border-l-2 border-primary/20 pl-4 text-sm leading-6">
          <p className="font-medium text-foreground">{parsed.closing}</p>
          {parsed.signature.map((line, index) => (
            <p key={index} className="text-muted-foreground">
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

function EmailReplyStatus({
  approvalRequired,
  nextStep,
}: {
  approvalRequired?: boolean
  nextStep?: string
}) {
  if (!approvalRequired && !nextStep) return null

  return (
    <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-200">
      <p className="font-medium">Approval required</p>
      {nextStep ? (
        <p className="mt-1 text-amber-900/80 dark:text-amber-200/80">
          {nextStep}
        </p>
      ) : null}
    </div>
  )
}

function formatTaskStatus(status: string) {
  return status
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

function TaskListPreview({ tasks }: { tasks: ChatTaskItem[] }) {
  const completedCount = tasks.filter(
    (task) => task.status === "completed"
  ).length
  const pendingCount = tasks.length - completedCount

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            <ListTodo className="size-4" />
          </div>
          <div>
            <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
              Task list
            </p>
            <p className="text-sm font-semibold text-foreground">
              {tasks.length} tasks
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
            {completedCount} completed
          </span>
          {pendingCount > 0 ? (
            <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-300">
              {pendingCount} pending
            </span>
          ) : null}
        </div>
      </div>

      <div className="space-y-2">
        {tasks.map((task) => {
          const isCompleted = task.status === "completed"
          const StatusIcon = isCompleted ? CheckCircle2 : Circle

          return (
            <div
              key={task.task_id}
              className="rounded-2xl border border-border/70 bg-background px-4 py-3 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <StatusIcon
                  className={cn(
                    "mt-0.5 size-4 shrink-0",
                    isCompleted
                      ? "text-emerald-500"
                      : "text-muted-foreground"
                  )}
                />

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full border border-border bg-muted text-[11px] font-semibold text-foreground">
                      {task.index}
                    </span>
                    <h4
                      className={cn(
                        "min-w-0 flex-1 text-sm font-semibold text-foreground",
                        isCompleted && "text-muted-foreground line-through"
                      )}
                    >
                      {task.title}
                    </h4>
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span>{task.task_list}</span>
                    <span className="text-muted-foreground/50">/</span>
                    <span
                      className={cn(
                        "font-medium",
                        isCompleted
                          ? "text-emerald-600 dark:text-emerald-300"
                          : "text-amber-600 dark:text-amber-300"
                      )}
                    >
                      {formatTaskStatus(task.status)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function AssistantMessage({
  content,
  isPending = false,
  onCopy,
}: {
  content: string | ChatAssistantResponse
  isPending?: boolean
  onCopy?: () => void
}) {
  const [copied, setCopied] = useState(false)
  const isEmailList =
    typeof content === "object" && content.kind === "email_list"
  const isEmailReply =
    typeof content === "object" && content.kind === "email_reply"
  const isGitHubRepoList =
    typeof content === "object" && content.kind === "github_repo_list"
  const isGitHubProfile =
    typeof content === "object" && content.kind === "github_profile"
  const isTaskList =
    typeof content === "object" && content.kind === "task_list"
  const calendarPreview =
    typeof content === "object"
      ? content.kind === "calendar_slots"
        ? content.slots
        : content.kind === "calendar_event"
          ? content.event
          : null
      : null
  const calendarAction =
    typeof content === "object" &&
    (content.kind === "calendar_slots" || content.kind === "calendar_event")
      ? content.action
      : undefined
  const textContent =
    typeof content === "string"
      ? content
      : content.kind === "text"
        ? content.text
        : content.kind === "email_reply"
          ? content.reply
          : ""

  const getCopyText = () => {
    if (typeof content === "string") return content
    if (content.kind === "text") return content.text
    if (content.kind === "email_reply") return content.reply

    if (content.kind === "email_list") {
      return content.emails
        .map(
          (email) =>
            `${email.index}. ${email.subject}\nFrom: ${email.from}\nDate: ${formatEmailDate(email.date)}\n${email.snippet}`
        )
        .join("\n\n")
    }

    if (content.kind === "task_list") {
      return content.tasks
        .map(
          (task) =>
            `${task.index}. ${task.title}\nList: ${task.task_list}\nStatus: ${formatTaskStatus(task.status)}\nID: ${task.task_id}`
        )
        .join("\n\n")
    }

    if (content.kind === "github_repo_list") {
      return formatGitHubRepoListCopyText(content.repositories, content.action)
    }

    if (content.kind === "github_profile") {
      return formatGitHubProfileCopyText(content.profile, content.action)
    }

    if (content.kind === "calendar_event") {
      return formatCalendarEventCopyText(content.event)
    }

    if (content.kind === "calendar_slots") {
      return formatCalendarSlotCopyText(content.slots, content.action)
    }

    return ""
  }

  const handleCopy = async () => {
    if (onCopy) {
      onCopy()
      return
    }

    if (!navigator.clipboard?.writeText) return

    try {
      await navigator.clipboard.writeText(getCopyText())
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      // Keep the UI quiet if clipboard access is blocked.
    }
  }

  return (
    <div className="py-4">
      <div className="max-w-[85%]">
        <div className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm shadow-black/5">
          <div className="flex items-center justify-between gap-4 border-b border-border/70 px-4 py-3">
            <ManusLogo />

            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              onClick={handleCopy}
              className="h-8 w-8 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="Copy assistant response"
            >
              {copied ? (
                <Check className="size-3.5 text-emerald-500" />
              ) : (
                <Copy className="size-3.5" />
              )}
            </Button>
          </div>

          <div className="px-4 py-3">
            {isEmailList ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
                    Email list
                  </p>
                  <span className="rounded-full border border-border bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                    {content.emails.length} results
                  </span>
                </div>

                <div className="space-y-3">
                  {content.emails.map((email: ChatEmailItem) => (
                    <div
                      key={email.id}
                      className="rounded-2xl border border-border/70 bg-background px-4 py-3 shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full border border-border bg-muted text-[11px] font-semibold text-foreground">
                              {email.index}
                            </span>
                            <h4 className="truncate text-sm font-semibold text-foreground">
                              {email.subject}
                            </h4>
                          </div>

                          <p className="mt-2 text-xs font-medium text-muted-foreground">
                            From:{" "}
                            <span className="text-foreground/90">
                              {email.from}
                            </span>
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Date: {formatEmailDate(email.date)}
                          </p>
                        </div>
                      </div>

                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-foreground/85">
                        {email.snippet}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : isTaskList ? (
              <TaskListPreview tasks={content.tasks} />
            ) : isGitHubRepoList ? (
              <GitHubRepoListPreview
                repositories={content.repositories}
                action={content.action}
              />
            ) : isGitHubProfile ? (
              <GitHubProfilePreview
                profile={content.profile}
                action={content.action}
              />
            ) : calendarPreview ? (
              <CalendarEventPreview
                event={calendarPreview}
                action={calendarAction}
              />
            ) : (
              <div
                className={cn(
                  isPending && "animate-pulse text-muted-foreground"
                )}
              >
                <EmailReplyPreview text={textContent} />
                {isEmailReply ? (
                  <EmailReplyStatus
                    approvalRequired={content.approvalRequired}
                    nextStep={content.nextStep}
                  />
                ) : null}
              </div>
            )}
          </div>
        </div>

        <MessageActions />
      </div>
    </div>
  )
}

function ContinueNotice() {
  return (
    <div className="flex items-center gap-2 py-3 text-muted-foreground">
      <Pause className="size-4" />
      <span className="text-sm">
        Daisy AI Studio will continue working after your reply
      </span>
    </div>
  )
}

const createMessageId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

function UnifiedInput({
  mode,
  onSend,
  isLoading = false,
  showConnectors = true,
  showSuggestions = true,
  isGmailEnabled = false,
  isCheckingGmail = false,
}: {
  mode: "landing" | "chat"
  onSend: (message: string) => void
  isLoading?: boolean
  showConnectors?: boolean
  showSuggestions?: boolean
  isGmailEnabled?: boolean
  isCheckingGmail?: boolean
}) {
  const [input, setInput] = useState("")
  const [suggestionNotice, setSuggestionNotice] = useState<{
    title: string
    description: string
    tone: "locked" | "connect" | "loading"
  } | null>(null)
  const isDesignMode = true

  const handleSend = () => {
    if (isLoading) {
      return
    }

    if (input.trim()) {
      onSend(input)
      setInput("")
    }
  }

  const handleSuggestionClick = (card: SuggestionCard) => {
    if (isLoading) return

    if (card.id === "writing") {
      setSuggestionNotice(null)
      onSend(getRandomCreativeWritingPrompt())
      return
    }

    if (card.id === "email") {
      if (isCheckingGmail) {
        setSuggestionNotice({
          title: "Checking Gmail connection",
          description: "Please wait while Daisy confirms your connector status.",
          tone: "loading",
        })
        return
      }

      if (!isGmailEnabled) {
        setSuggestionNotice({
          title: "Turn on Gmail first",
          description:
            "Email drafting needs the Gmail connector switch enabled before this chat can start.",
          tone: "connect",
        })
        return
      }

      setSuggestionNotice(null)
      onSend(card.text)
      return
    }

    setSuggestionNotice({
      title: "Coming soon",
      description: `${card.subtext} support is locked for now and will be available soon.`,
      tone: "locked",
    })
  }

  const inputBox = (
    <div className="relative w-full rounded-[20px] border border-border/80 bg-card/95 shadow-sm">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSend()
          }
        }}
        placeholder={
          mode === "landing" && isDesignMode
            ? "ask anything, I’ll generate it for you"
            : mode === "landing"
              ? "Ask anything..."
              : "Send message to Daisy AI Studio..."
        }
        rows={1}
        className={cn(
          "scrollbar-thin w-full resize-none bg-transparent text-foreground outline-none placeholder:text-muted-foreground",
          mode === "landing"
            ? "max-h-36 min-h-16 px-4 py-4 text-[14px]"
            : "max-h-50 min-h-12 px-4 py-3 text-sm"
        )}
        style={{ fieldSizing: "content" }}
      />

      <div className="flex items-center justify-between px-2 pb-2">
        <div
          className={cn(
            "flex items-center",
            mode === "landing" ? "gap-1.5" : "gap-0.5"
          )}
        >
          <FileSources />

          {showConnectors ? <ConnectorsPanel /> : null}

          <MyComputerModal />
        </div>

        <div className="flex items-center gap-0.5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon-xs"
                className="cursor-pointer rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                <Mic className="size-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Voice input</TooltipContent>
          </Tooltip>
          <Button
            size="icon-xs"
            onClick={handleSend}
            className={cn(
              "cursor-pointer rounded-lg transition-all",
              input.trim() && !isLoading
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "cursor-not-allowed bg-muted text-muted-foreground"
            )}
            disabled={!input.trim() || isLoading}
          >
            {isLoading ? (
              <LoaderCircle className="size-3.5 animate-spin" />
            ) : (
              <ArrowUp className="size-3.5" />
            )}
          </Button>
        </div>
      </div>
    </div>
  )

  if (mode === "landing") {
    return (
      <div className="w-full px-4">
        <div className="mx-auto w-full max-w-3xl">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <ManusLogoLarge />
          </div>

          {/* Input Box */}
          <div className="mb-6">{inputBox}</div>

          {/* Suggestion Cards */}
          {showSuggestions ? (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {suggestionCards.map((card) => {
                  const isEmailCard = card.id === "email"
                  const canOpenChat =
                    card.id === "writing" || (isEmailCard && isGmailEnabled)
                  const showSpinner = isEmailCard && isCheckingGmail
                  const showLock = !canOpenChat && !showSpinner

                  return (
                    <button
                      key={card.id}
                      type="button"
                      onClick={() => handleSuggestionClick(card)}
                      disabled={isLoading}
                      className={cn(
                        "group flex items-start gap-3 rounded-xl border border-border bg-card p-3 text-left transition-all hover:border-ring hover:bg-accent/50 disabled:cursor-not-allowed disabled:opacity-60",
                        showLock && "hover:border-border"
                      )}
                    >
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted group-hover:bg-accent">
                        <card.icon className="size-4 text-muted-foreground" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-foreground">
                          {card.text}
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {card.subtext}
                        </p>
                      </div>
                      {showSpinner ? (
                        <LoaderCircle className="size-4 shrink-0 animate-spin text-muted-foreground" />
                      ) : showLock ? (
                        <Lock className="size-4 shrink-0 text-muted-foreground/60" />
                      ) : (
                        <ArrowRight className="size-4 shrink-0 text-muted-foreground/50 opacity-0 transition-opacity group-hover:opacity-100" />
                      )}
                    </button>
                  )
                })}
              </div>

              {suggestionNotice ? (
                <div
                  className={cn(
                    "flex items-start gap-2 rounded-xl border px-3 py-2 text-left text-xs leading-5",
                    suggestionNotice.tone === "connect"
                      ? "border-amber-200 bg-amber-50 text-amber-950 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-100"
                      : "border-border bg-muted/40 text-muted-foreground"
                  )}
                >
                  {suggestionNotice.tone === "loading" ? (
                    <LoaderCircle className="mt-0.5 size-3.5 shrink-0 animate-spin" />
                  ) : (
                    <Lock className="mt-0.5 size-3.5 shrink-0" />
                  )}
                  <div>
                    <p className="font-semibold text-foreground">
                      {suggestionNotice.title}
                    </p>
                    <p>{suggestionNotice.description}</p>
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    )
  }

  // Chat mode
  return (
    <div className="w-full bg-background p-4">
      <div className="mx-auto w-full max-w-3xl">{inputBox}</div>
    </div>
  )
}

type ChatAreaProps = {
  showConnectors?: boolean
  showSuggestions?: boolean
  onChatStarted?: () => void
}

export function ChatArea({
  showConnectors = true,
  showSuggestions = true,
  onChatStarted,
}: ChatAreaProps = {}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const [hasStartedChat, setHasStartedChat] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [isAtBottom, setIsAtBottom] = useState(true)
  const [showScrollButton, setShowScrollButton] = useState(false)
  const {
    data: connectorsData,
    refetch: refetchConnectors,
    isFetching: isCheckingConnectors,
  } = useConnectorsStatusQuery()

  const connectorStatuses = useMemo(
    () => ({
      ...getDefaultConnectorStatuses(),
      ...(connectorsData?.connectors ?? {}),
    }),
    [connectorsData?.connectors]
  )
  const isGmailConnected = isConnectorConnected(connectorStatuses.gmail)
  const isGmailEnabled =
    isGmailConnected && isConnectorEnabled(connectorStatuses.gmail)

  useEffect(() => {
    void refetchConnectors()
  }, [refetchConnectors])

  const chatMutation = useMutation<
    ChatAssistantResponse,
    Error,
    string,
    { assistantId: string }
  >({
    mutationFn: async (message) => sendChatMessage(message),
    onMutate: async (message) => {
      const assistantId = createMessageId()

      setHasStartedChat(true)
      onChatStarted?.()
      setMessages((prev) => [
        ...prev,
        {
          id: createMessageId(),
          role: "user",
          content: message,
        },
        {
          id: assistantId,
          role: "assistant",
          content: "Thinking...",
        },
      ])

      return { assistantId }
    },
    onSuccess: (content, _message, context) => {
      if (!context) return

      setMessages((prev) =>
        prev.map((message) =>
          message.role === "assistant" && message.id === context.assistantId
            ? { ...message, content }
            : message
        )
      )
    },
    onError: (_error, _message, context) => {
      if (!context) return

      setMessages((prev) =>
        prev.map((message) =>
          message.role === "assistant" && message.id === context.assistantId
            ? {
                ...message,
                content: "Sorry, I couldn't reach the chat service.",
              }
            : message
        )
      )
    },
  })

  // Get viewport element from ScrollArea
  useEffect(() => {
    if (scrollRef.current) {
      viewportRef.current = scrollRef.current.querySelector(
        "[data-slot='scroll-area-viewport']"
      ) as HTMLDivElement
    }
  }, [hasStartedChat])

  // Check if scrolled to bottom
  const checkScrollPosition = useCallback(() => {
    if (!viewportRef.current) return
    const { scrollTop, scrollHeight, clientHeight } = viewportRef.current
    const atBottom = scrollHeight - scrollTop - clientHeight < 50
    setIsAtBottom(atBottom)
    setShowScrollButton(!atBottom && messages.length > 0)
  }, [messages.length])

  // Scroll to bottom function
  const scrollToBottom = useCallback(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTop = viewportRef.current.scrollHeight
      setIsAtBottom(true)
      setShowScrollButton(false)
    }
  }, [])

  // Auto-scroll when new messages arrive (only if already at bottom)
  useEffect(() => {
    if (viewportRef.current && hasStartedChat && isAtBottom) {
      viewportRef.current.scrollTop = viewportRef.current.scrollHeight
    }
  }, [messages, hasStartedChat, isAtBottom])

  // Add scroll listener
  useEffect(() => {
    const scrollElement = viewportRef.current
    if (!scrollElement) return

    scrollElement.addEventListener("scroll", checkScrollPosition)
    checkScrollPosition()

    return () =>
      scrollElement.removeEventListener("scroll", checkScrollPosition)
  }, [checkScrollPosition, hasStartedChat])

  const handleSendMessage = (content: string) => {
    chatMutation.mutate(content)
  }

  if (!hasStartedChat) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-background">
        <UnifiedInput
          mode="landing"
          onSend={handleSendMessage}
          isLoading={chatMutation.isPending}
          showConnectors={showConnectors}
          showSuggestions={showSuggestions}
          isGmailEnabled={isGmailEnabled}
          isCheckingGmail={isCheckingConnectors}
        />
      </div>
    )
  }

  return (
    <div className="relative flex h-full min-h-0 w-full flex-col overflow-hidden bg-background">
      <ScrollArea className="min-h-0 w-full flex-1 px-4" ref={scrollRef}>
        <div className="mx-auto w-full max-w-3xl pb-4">
          {messages.map((message) =>
            message.role === "user" ? (
              <UserMessage key={message.id} content={message.content} />
            ) : (
              <AssistantMessage
                key={message.id}
                content={message.content}
                isPending={
                  typeof message.content === "string" &&
                  message.content === "Thinking..."
                }
              />
            )
          )}
          {messages.length === 0 ? <ContinueNotice /> : null}
        </div>
      </ScrollArea>

      {/* Scroll to bottom button */}
      {showScrollButton && (
        <button
          onClick={scrollToBottom}
          className="absolute bottom-20 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 rounded-full border border-border bg-muted px-3 py-1.5 shadow-lg transition-colors hover:bg-accent"
        >
          <ArrowDown className="size-4 text-foreground" />
          <span className="text-xs font-medium text-foreground">Latest</span>
        </button>
      )}

      <div className="shrink-0">
        <UnifiedInput
          mode="chat"
          onSend={handleSendMessage}
          isLoading={chatMutation.isPending}
          showConnectors={showConnectors}
        />
      </div>
    </div>
  )
}
