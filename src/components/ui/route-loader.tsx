import { Loader2 } from "lucide-react"

type RouteLoaderProps = {
  label?: string
}

const RouteLoader = ({ label = "Loading..." }: RouteLoaderProps) => {
  return (
    <div className="flex min-h-[320px] w-full items-center justify-center rounded-2xl border border-border/60 bg-card/60 px-6 py-10">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="relative flex h-16 w-16 items-center justify-center">
          <span className="absolute inset-0 rounded-full border-2 border-primary/15" />
          <span className="absolute inset-1 rounded-full border border-primary/25 animate-pulse" />
          <Loader2 className="relative size-7 animate-spin text-primary" />
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground">{label}</p>
          <p className="text-xs text-muted-foreground">
            Please wait while the section is prepared.
          </p>
        </div>
      </div>
    </div>
  )
}

export default RouteLoader
