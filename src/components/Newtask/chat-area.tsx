import { useState, useRef, useEffect, useCallback } from "react"
import {
  Mic,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Pencil,
  Pause,
  ArrowRight,
  FileText,
  Image,
  Headphones,
  Code,
  BarChart3,
  Mail,
  ArrowDown,
  Layers,
  ArrowUp,
  ChevronDown,
  Check,
  Bot,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { ConnectorsPanel } from "@/components/Newtask/connectors-panel"
import { FileSources } from "@/components/Newtask/file-sources"
import { MyComputerModal } from "@/components/Newtask/my-computer-modal"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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

const imageModels = [
  {
    id: "gpt-image-1",
    name: "GPT-Image-1",
    icon: Sparkles,
    description: "Modelo estandar para crear imagenes con buena calidad.",
  },
  {
    id: "nano-banana-pro",
    name: "Nano Banana Pro",
    icon: Image,
    description: "Modelo avanzado para trabajos visuales mas exigentes.",
  },
  {
    id: "nano-banana-2",
    name: "Nano Banana 2",
    icon: Bot,
    description: "Modelo ligero y rapido para pruebas creativas.",
  },
]

const suggestionCards = [
  // {
  //   icon: FileText,
  //   text: "Write a story about a time traveler",
  //   subtext: "Creative writing",
  // },
  // {
  //   icon: Image,
  //   text: "Generate a futuristic city skyline",
  //   subtext: "Image generation",
  // },
  // {
  //   icon: Headphones,
  //   text: "Summarize the latest AI podcast",
  //   subtext: "Audio summary",
  // },
  // {
  //   icon: Code,
  //   text: "Debug this React component",
  //   subtext: "Code assistance",
  // },
  // {
  //   icon: BarChart3,
  //   text: "Analyze Q3 sales data trends",
  //   subtext: "Data analysis",
  // },
  // { icon: Mail, text: "Draft a professional email", subtext: "Email writing" },
]

function ManusLogoLarge() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-10 items-center justify-center rounded-xl bg-white">
        <Layers className="size-6 text-black" />
      </div>
      <span className="text-2xl font-semibold text-foreground">
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
      <div className="flex size-6 items-center justify-center rounded-md bg-white">
        <Layers className="size-4 text-black" />
      </div>
      <span className="text-sm font-semibold text-foreground">
        MoodGraph AI
      </span>
      <span className="rounded border border-border bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
        Lite
      </span>
    </div>
  )
}

function MessageActions() {
  return (
    <div className="mt-2 flex items-center gap-0.5">
      <Button
        variant="ghost"
        size="icon"
        className="size-7 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
      >
        <Copy className="size-4" />
      </Button>
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
        <div className="rounded-2xl rounded-tr-sm bg-muted px-4 py-3">
          <p className="text-sm leading-relaxed text-foreground">{content}</p>
        </div>
        <button className="mt-1 text-muted-foreground transition-colors hover:text-foreground">
          <Pencil className="size-3.5" />
        </button>
      </div>
    </div>
  )
}

function AssistantMessage({ content }: { content: string }) {
  const lines = content.split("\n")

  return (
    <div className="py-4">
      <div className="max-w-[85%]">
        <ManusLogo />

        <div className="mt-3 ml-0.5 space-y-1">
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
              <p key={i} className="text-sm leading-relaxed text-foreground/90">
                {trimmedLine}
              </p>
            )
          })}
        </div>

        <MessageActions />
      </div>
    </div>
  )
}

function ContinueNotice() {
  return (
    <div className="flex items-center gap-2 py-3">
      <Pause className="size-4 text-chart-4" />
      <span className="text-sm text-chart-4">
        MoodGraph AI will continue working after your reply
      </span>
    </div>
  )
}

function UnifiedInput({
  mode,
  onSend,
}: {
  mode: "landing" | "chat"
  onSend: (message: string) => void
}) {
  const [input, setInput] = useState("")
  const [selectedConnectors] = useState<string[]>([])
  const [isDesignMode, setIsDesignMode] = useState(true)
  const [selectedImageModel, setSelectedImageModel] = useState(imageModels[0])

  const handleSend = () => {
    if (input.trim()) {
      onSend(input)
      if (mode === "chat") {
        setInput("")
      }
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

          {mode === "landing" ? (
            <>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    className={cn(
                      "h-6 gap-1 rounded-full border px-2 text-[10px] font-medium shadow-none transition-colors",
                      isDesignMode
                        ? "border-primary bg-primary/10 text-primary hover:bg-primary/15"
                        : "border-border bg-muted/30 text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
                    onClick={() => setIsDesignMode((prev) => !prev)}
                  >
                    <Sparkles className="size-2.5" />
                    Diseño
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">Modo de imagen</TooltipContent>
              </Tooltip>

              {isDesignMode ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      className="h-6 gap-1 rounded-full border border-border bg-muted/30 px-2 text-[10px] font-medium text-foreground shadow-none hover:bg-accent"
                    >
                      <Sparkles className="size-2.5 text-muted-foreground" />
                      <span>{selectedImageModel.name}</span>
                      <ChevronDown className="size-2.5 text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    side="top"
                    sideOffset={8}
                    className="w-72 p-1.5"
                  >
                    {imageModels.map((model) => {
                      const Icon = model.icon
                      const isSelected = selectedImageModel.id === model.id

                      return (
                        <DropdownMenuItem
                          key={model.id}
                          onClick={() => setSelectedImageModel(model)}
                          className={cn(
                            "flex items-start justify-between gap-3 rounded-lg px-2 py-2 text-left text-xs",
                            isSelected && "bg-muted/70"
                          )}
                        >
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5 flex size-7 items-center justify-center rounded-md bg-muted">
                              <Icon className="size-4 text-muted-foreground" />
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs font-semibold">
                                  {model.name}
                                </span>
                              </div>
                              <p className="mt-0.5 max-w-52 text-[11px] leading-snug text-muted-foreground">
                                {model.description}
                              </p>
                            </div>
                          </div>
                          {isSelected ? (
                            <Check className="mt-0.5 size-3.5 text-muted-foreground" />
                          ) : null}
                        </DropdownMenuItem>
                      )
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : null}
            </>
          ) : null}
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
              input.trim()
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "cursor-not-allowed bg-muted text-muted-foreground"
            )}
            disabled={!input.trim()}
          >
            <ArrowUp className="size-3.5" />
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
                className="group flex items-start gap-3 rounded-xl border border-border bg-card p-3 text-left transition-all hover:border-ring hover:bg-accent/50"
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

  const handleStartChat = (firstMessage: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: firstMessage,
    }
    setMessages([userMessage])
    setHasStartedChat(true)
    setIsAtBottom(true)
  }

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
    }
    setMessages([...messages, newMessage])
  }

  if (!hasStartedChat) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-background">
        <UnifiedInput mode="landing" onSend={handleStartChat} />
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
              <AssistantMessage key={message.id} content={message.content} />
            )
          )}
          <ContinueNotice />
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
        <UnifiedInput mode="chat" onSend={handleSendMessage} />
      </div>
    </div>
  )
}
