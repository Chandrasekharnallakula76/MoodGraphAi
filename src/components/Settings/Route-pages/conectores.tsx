import { useState } from "react"
import { Plug, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ConnectorsDialog } from "@/components/Newtask/connectors-dialog"

const Conectores = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 text-foreground">
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Conectores</h1>
        <Separator />
      </section>

      <section className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-muted/30 text-muted-foreground">
          <Plug className="size-6" />
        </div>
        <p className="text-base text-muted-foreground">
          Conecta Daisy AI Studio con tus aplicaciones diarias, APIs y MCPs
        </p>
        <Button
          variant="outline"
          className="h-10 rounded-xl border-border/80 px-4 text-sm"
          onClick={() => setOpen(true)}
        >
          <Plus className="size-4" />
          Agregar conectores
        </Button>
      </section>

      <ConnectorsDialog open={open} onOpenChange={setOpen} />
    </div>
  )
}

export default Conectores
