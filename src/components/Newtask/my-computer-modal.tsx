import { useState } from "react"
import { Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function MyComputerModal() {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon-xs"
              className="cursor-pointer rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              aria-label="My computer"
            >
              <Monitor className="size-3.5" />
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>
        <TooltipContent side="top">My computer</TooltipContent>
      </Tooltip>
      <PopoverContent
        className="w-80 overflow-hidden border-border bg-card p-0 shadow-xl"
        align="start"
        side="top"
        sideOffset={8}
        avoidCollisions={true}
        collisionPadding={8}
      >
        <div className="relative h-40 bg-linear-to-br from-primary/10 via-chart-1/10 to-chart-2/10">
          <div className="absolute inset-0 flex items-center justify-center gap-2">
            <div className="relative">
              <div className="flex h-20 w-32 flex-col overflow-hidden rounded-lg border border-border bg-card shadow-lg">
                <div className="flex h-3 items-center gap-1 bg-muted px-2">
                  <div className="h-2 w-2 rounded-full bg-destructive/70" />
                  <div className="h-2 w-2 rounded-full bg-chart-4" />
                  <div className="h-2 w-2 rounded-full bg-chart-3" />
                </div>
                <div className="flex flex-1 items-center justify-center">
                  <span className="text-[8px] text-muted-foreground">
                    What can I do for you?
                  </span>
                </div>
              </div>
            </div>
            <div className="relative -mb-4">
              <div className="flex h-28 w-16 flex-col overflow-hidden rounded-xl border border-border bg-card shadow-lg">
                <div className="flex h-4 items-center justify-center bg-muted">
                  <div className="h-1 w-8 rounded-full bg-muted-foreground/30" />
                </div>
                <div className="flex flex-1 items-center justify-center px-2">
                  <span className="text-center text-[6px] leading-tight text-muted-foreground">
                    What can I do for you?
                  </span>
                </div>
                <div className="flex h-5 items-center justify-center gap-2 bg-muted/50 px-1">
                  <div className="h-3 w-3 rounded bg-muted" />
                  <div className="h-3 w-3 rounded bg-muted" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-base font-semibold text-foreground">
            My Computer
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Download the desktop app to grant MoodGraph access to your computer.
          </p>

          <Button
            className="mt-4 w-full bg-primary text-xs font-medium text-primary-foreground hover:bg-primary/90"
            onClick={() => {
              console.log("Download desktop app")
              setOpen(false)
            }}
          >
            Download desktop
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
