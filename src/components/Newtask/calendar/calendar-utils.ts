import type { ChatCalendarEvent } from "@/apis/chat"

function formatEventDate(dateString: string, timeZone?: string | null) {
  const date = new Date(dateString)

  if (Number.isNaN(date.getTime())) {
    return dateString
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: timeZone ?? undefined,
  }).format(date)
}

export function formatCalendarEventCopyText(event: ChatCalendarEvent) {
  const lines = [
    "Calendar event",
    `Title: ${event.title}`,
    `Event ID: ${event.event_id}`,
    `Start: ${formatEventDate(event.start.dateTime, event.start.timeZone)}`,
  ]

  if (event.start.timeZone) {
    lines.push(`Time zone: ${event.start.timeZone}`)
  }

  return lines.join("\n")
}

export function formatCalendarEventDate(event: ChatCalendarEvent) {
  return formatEventDate(event.start.dateTime, event.start.timeZone)
}
