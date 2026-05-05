import { useState, useRef, useEffect, useCallback } from "react"
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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { ConnectorsPanel } from "@/components/Newtask/connectors-panel"
import { FileSources } from "@/components/Newtask/file-sources"
import { MyComputerModal } from "@/components/Newtask/my-computer-modal"
import { sendChatMessage } from "@/apis/chat"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

type SuggestionCard = {
  icon: typeof FileText
  text: string
  subtext: string
}

const suggestionCards: SuggestionCard[] = [
  {
    icon: FileText,
    text: "Write a story about a time traveler",
    subtext: "Creative writing",
  },
  {
    icon: Image,
    text: "Generate a futuristic city skyline",
    subtext: "Image generation",
  },
  {
    icon: Headphones,
    text: "Summarize the latest AI podcast",
    subtext: "Audio summary",
  },
  {
    icon: Code,
    text: "Debug this React component",
    subtext: "Code assistance",
  },
  {
    icon: BarChart3,
    text: "Analyze Q3 sales data trends",
    subtext: "Data analysis",
  },
  { icon: Mail, text: "Draft a professional email", subtext: "Email writing" },
]

function ManusLogoLarge() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex size-9 items-center justify-center rounded-xl border border-border bg-card shadow-sm">
        <Layers className="size-5 text-foreground" />
      </div>
      <span className="text-2xl font-semibold tracking-tight text-foreground">
        MoodGraph AI
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
        MoodGraph AI
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

function UserMessage({ content }: { content: string }) {
  return (
    <div className="flex justify-end py-4">
      <div className="flex max-w-[80%] items-start gap-3">
        <div className="rounded-2xl rounded-tr-sm border border-border bg-card px-4 py-3 shadow-sm">
          <p className="text-sm leading-relaxed text-foreground">{content}</p>
        </div>
        <button className="mt-1 text-muted-foreground transition-colors hover:text-foreground">
          <Pencil className="size-3.5" />
        </button>
      </div>
    </div>
  )
}

function AssistantMessage({
  content,
  isPending = false,
  onCopy,
}: {
  content: string
  isPending?: boolean
  onCopy?: () => void
}) {
  const [copied, setCopied] = useState(false)
  const lines = content.split("\n")

  const handleCopy = async () => {
    if (onCopy) {
      onCopy()
      return
    }

    if (!navigator.clipboard?.writeText) return

    try {
      await navigator.clipboard.writeText(content)
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
            <div
              className={cn(
                "space-y-1.5",
                isPending && "animate-pulse text-muted-foreground"
              )}
            >
              {lines.map((line, i) => {
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
                        {numberedMatch[2]}
                      </p>
                    </div>
                  )
                }

                return (
                  <p
                    key={i}
                    className="text-[15px] leading-6 text-foreground/90"
                  >
                    {trimmedLine}
                  </p>
                )
              })}
            </div>
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
        MoodGraph AI will continue working after your reply
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
}: {
  mode: "landing" | "chat"
  onSend: (message: string) => void
  isLoading?: boolean
}) {
  const [input, setInput] = useState("")
  const [selectedConnectors] = useState<string[]>([])
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

  const handleSuggestionClick = (text: string) => {
    onSend(text)
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
              : "Send message to MoodGraph AI..."
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

          <ConnectorsPanel selectedConnectors={selectedConnectors} />

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
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {suggestionCards.map((card, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(card.text)}
                disabled={isLoading}
                className="group flex items-start gap-3 rounded-xl border border-border bg-card p-3 text-left transition-all hover:border-ring hover:bg-accent/50 disabled:cursor-not-allowed disabled:opacity-60"
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
                <ArrowRight className="size-4 text-muted-foreground/50 opacity-0 transition-opacity group-hover:opacity-100" />
              </button>
            ))}
          </div>
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

export function ChatArea() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const [hasStartedChat, setHasStartedChat] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [isAtBottom, setIsAtBottom] = useState(true)
  const [showScrollButton, setShowScrollButton] = useState(false)

  const chatMutation = useMutation<string, Error, string, { assistantId: string }>({
    mutationFn: async (message) => sendChatMessage(message),
    onMutate: async (message) => {
      const assistantId = createMessageId()

      setHasStartedChat(true)
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
          message.id === context.assistantId
            ? { ...message, content }
            : message
        )
      )
    },
    onError: (_error, _message, context) => {
      if (!context) return

      setMessages((prev) =>
        prev.map((message) =>
          message.id === context.assistantId
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
                isPending={message.content === "Thinking..."}
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
        />
      </div>
    </div>
  )
}
