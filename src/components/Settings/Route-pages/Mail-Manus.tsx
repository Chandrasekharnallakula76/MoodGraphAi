import { useState } from "react"
import { Ellipsis, Mail, Pencil, Plus, RefreshCw, Trash2 } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

type TabKey = "configuracion" | "entrada"

const MailManus = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("configuracion")

  const [editOpen, setEditOpen] = useState(false)
  const [workflowOpen, setWorkflowOpen] = useState(false)

  const approvedSenders = ["nallakulasekhar9999@gmail.com"]

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-4">
      {/* Header */}
      <h1 className="text-xl font-semibold">Correo MoodGraph</h1>

      {/* Tabs */}
      <div className="mt-4 flex gap-6 border-b">
        {["configuracion", "entrada"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as TabKey)}
            className={`pb-2 text-sm ${
              activeTab === tab
                ? "border-b-2 border-foreground font-medium"
                : "text-muted-foreground"
            }`}
          >
            {tab === "configuracion" ? "Configuracion" : "Bandeja de entrada"}
          </button>
        ))}
      </div>

      {/* CONFIG */}
      {activeTab === "configuracion" && (
        <div className="space-y-6 pt-5">
          {/* Email section */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold">Correo de MoodGraph</h2>
              <p className="text-sm text-muted-foreground">
                Envia correos para crear tareas
              </p>
            </div>

            <button
              onClick={() => setEditOpen(true)}
              className="flex items-center gap-2 text-sm"
            >
              nallakulasekhar9999174@moodgraph.bot
              <Pencil className="size-4" />
            </button>
          </div>

          {/* Workflow */}
          <div>
            <h3 className="text-base font-semibold">
              Correo del flujo de trabajo
            </h3>

            <button
              onClick={() => setWorkflowOpen(true)}
              className="mt-2 flex items-center gap-2 rounded-lg border px-3 py-2 text-sm"
            >
              <Plus className="size-4" />
              Agregar correo electrónico del flujo de trabajo
            </button>
          </div>

          <div className="border-t pt-4" />

          {/* Approved senders */}
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold">Remitentes aprobados</h3>

              <button className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm">
                <Plus className="size-4" />
                Agregar remitente aprobado
              </button>
            </div>

            <div className="mt-3 space-y-2">
              {approvedSenders.map((sender) => (
                <div
                  key={sender}
                  className="flex items-center justify-between rounded-lg border px-3 py-2"
                >
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="size-4" />
                    {sender}
                  </div>

                  <Popover>
                    <PopoverTrigger asChild>
                      <button type="button" aria-label="Opciones de remitente">
                        <Ellipsis className="size-4 cursor-pointer" />
                      </button>
                    </PopoverTrigger>

                    <PopoverContent align="end" className="w-44 p-1">
                      <button
                        type="button"
                        className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-muted"
                      >
                        <Pencil className="size-4" />
                        Editar
                      </button>
                      <button
                        type="button"
                        className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm text-red-500 hover:bg-muted"
                      >
                        <Trash2 className="size-4" />
                        Eliminar
                      </button>
                    </PopoverContent>
                  </Popover>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* INBOX */}
      {activeTab === "entrada" && (
        <div className="pt-5">
          <div className="grid grid-cols-[1.2fr_2fr_1fr_auto] border-b pb-2 text-sm text-muted-foreground">
            <span>Remitente</span>
            <span>Contenido</span>
            <span>Fecha</span>
            <RefreshCw className="size-4" />
          </div>

          <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
            No hay datos
          </div>
        </div>
      )}

      {/* ===================== DIALOG 1 ===================== */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="rounded-2xl sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar la dirección de correo de MoodGraph</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex items-center rounded-lg border px-3 py-2">
              <Input defaultValue="nallakulasekhar9999174" />
              <span className="ml-2 text-sm text-muted-foreground">
                @moodgraph.bot
              </span>
            </div>

            <p className="text-xs text-muted-foreground">
              Puede actualizarse cada 7 días.
            </p>

            <div className="flex justify-end gap-2">
              <Button variant="ghost">Cancelar</Button>
              <Button>Guardar</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* ===================== DIALOG 2 ===================== */}
      <Dialog open={workflowOpen} onOpenChange={setWorkflowOpen}>
        <DialogContent className="rounded-3xl p-6 sm:max-w-4xl">
          <DialogHeader className="space-y-1">
            <DialogTitle className="text-lg font-semibold">
              Agregar correo electrónico del flujo de trabajo
            </DialogTitle>
            <p className="text-sm text-muted-foreground">
              Personaliza direcciones de correo adicionales e instrucciones para
              procesar diferentes tareas.
            </p>
          </DialogHeader>

          <div className="mt-3 space-y-5">
            {/* Email Section */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Dirección de correo electrónico
              </label>

              <div className="flex h-10 items-center rounded-lg border px-3 text-sm text-muted-foreground">
                <span className="opacity-70">nallak...174-</span>
                <Input
                  placeholder="newsletter"
                  className="h-full border-0 px-2 text-sm focus-visible:ring-0"
                />
                <span className="opacity-70">@moodgraph.bot</span>
              </div>
            </div>

            {/* Instructions Section */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Instrucciones</label>

              <p className="text-xs text-muted-foreground">
                Los correos enviados a nallakulasekhar9999174-@moodgraph.bot crearán
                tareas con la siguiente indicación.
              </p>

              <Textarea
                placeholder="Reúne fuentes de información para el boletín informativo diario y organízalas en diapositivas."
                className="min-h-[110px] text-sm"
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="ghost" className="h-9 px-4 text-sm">
                Cancelar
              </Button>
              <Button className="h-9 px-4 text-sm">Guardar</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default MailManus
