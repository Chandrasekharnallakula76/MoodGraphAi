import { CalendarDays, Clock3, Copy, Check } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { ChatCalendarEvent } from "@/apis/chat"
import {
  formatCalendarEventCopyText,
  formatCalendarEventDate,
} from "./calendar-utils"

function getCalendarLabel(action?: string) {
  if (!action) return "Calendar event"
  return action.replace(/_/g, " ")
}

export function CalendarEventPreview({
  event,
  action,
}: {
  event: ChatCalendarEvent
  action?: string
}) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (!navigator.clipboard?.writeText) return

    try {
      await navigator.clipboard.writeText(formatCalendarEventCopyText(event))
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      // Ignore clipboard failures to keep the card usable.
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            <CalendarDays className="size-4" />
          </div>
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
              Calendar
            </p>
            <h3 className="text-sm font-semibold text-foreground">
              {getCalendarLabel(action)}
            </h3>
          </div>
        </div>

        <span className="rounded-full border border-border bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
          Event
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border/70 bg-background shadow-sm">
        <div className="border-b border-border/70 bg-muted/25 px-4 py-3">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h4 className="truncate text-sm font-semibold text-foreground">
                {event.title}
              </h4>
              <p className="mt-1 truncate text-xs text-muted-foreground">
                Event ID: {event.event_id}
              </p>
            </div>

            <Badge variant="outline" className="text-[11px]">
              Calendar
            </Badge>
          </div>
        </div>

        <div className="space-y-4 px-4 py-4">
          <div className="rounded-xl border border-border bg-muted/20 px-3 py-3">
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <Clock3 className="size-3.5" />
              Starts
            </div>
            <p className="mt-1 text-sm font-semibold text-foreground">
              {formatCalendarEventDate(event)}
            </p>
            {event.start.timeZone ? (
              <p className="mt-1 text-xs text-muted-foreground">
                Time zone: {event.start.timeZone}
              </p>
            ) : null}
          </div>

          <div className="flex items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">
              Ready to be created or reviewed in your calendar flow.
            </p>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-8 rounded-full px-3 text-xs text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              {copied ? <Check className="mr-1 size-3.5" /> : <Copy className="mr-1 size-3.5" />}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
