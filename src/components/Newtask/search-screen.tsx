import { useState } from "react"
import { Loader2, Search, X, PlusSquare } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type SearchScreenProps = {
  onClose: () => void
}

const SearchScreen = ({ onClose }: SearchScreenProps) => {
  const [isCreating, setIsCreating] = useState(false)

  const handleCreateTask = () => {
    if (isCreating) return
    setIsCreating(true)

    window.setTimeout(() => {
      onClose()
      setIsCreating(false)
    }, 400)
  }

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="left-0 top-0 h-[100dvh] max-h-[100dvh] w-screen max-w-none translate-x-0 translate-y-0 gap-0 overflow-hidden rounded-none border-0 bg-card p-0 shadow-none sm:left-1/2 sm:top-1/2 sm:h-[52vh] sm:max-h-[52vh] sm:w-full sm:max-w-4xl sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-2xl sm:border sm:shadow-2xl"
      >
        <div className="flex h-full flex-col">
          <div className="relative border-b border-border px-4 py-3 sm:px-5">
            <Search className="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground sm:left-5" />
            <Input
              autoFocus
              placeholder="Buscar tareas..."
              className="h-10 border-0 !bg-transparent pr-9 pl-9 text-base shadow-none placeholder:text-muted-foreground/80 focus-visible:border-transparent focus-visible:ring-0 dark:!bg-transparent"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute top-1/2 right-2 size-7 -translate-y-1/2 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground sm:right-3"
              onClick={onClose}
            >
              <X className="size-4" />
            </Button>
          </div>

          <div className="p-3 sm:p-4">
            <button
              type="button"
              onClick={handleCreateTask}
              disabled={isCreating}
              className="flex w-full items-center gap-3 rounded-xl border border-border/70 bg-muted/30 px-3 py-3 text-left transition-colors hover:bg-muted/50"
            >
              <span className="flex size-7 items-center justify-center rounded-full bg-muted text-muted-foreground">
                {isCreating ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <PlusSquare className="size-4" />
                )}
              </span>
              <span className="text-sm font-semibold text-foreground">
                {isCreating ? "Cargando..." : "Nueva tarea"}
              </span>
            </button>
          </div>

          <div className="flex-1" />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SearchScreen
