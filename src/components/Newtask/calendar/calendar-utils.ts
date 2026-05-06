import type { ChatCalendarEvent, ChatCalendarSlot } from "@/apis/chat"

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

export function formatCalendarSlotCopyText(
  slots: ChatCalendarSlot[],
  action?: string
) {
  return [
    action ? action.replace(/_/g, " ") : "Calendar availability",
    ...slots.map(
      (slot, index) =>
        `${index + 1}. ${slot.start} - ${slot.end}`
    ),
  ].join("\n")
}
