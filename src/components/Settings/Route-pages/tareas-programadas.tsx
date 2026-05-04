import { useState } from "react"
import { CalendarDays, ChevronDown, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"

type TabKey = "programado" | "completado"

const TareasProgramadas = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("programado")
  const [openModal, setOpenModal] = useState(false)
  const [repeat, setRepeat] = useState("Sin repetir")
  const [showRepeat, setShowRepeat] = useState(false)
  const [showTime, setShowTime] = useState(false)
  const [hour, setHour] = useState("12")
  const [minute, setMinute] = useState("00")
  const [scheduledDate, setScheduledDate] = useState("2026-04-13")

  const repeatOptions = [
    "Sin repetir",
    "Diariamente",
    "Semanalmente",
    "Mensualmente",
  ]

  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0")
  )
  const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0")
  )

  const formatDateLabel = (dateValue: string) => {
    const [year, month, day] = dateValue.split("-")
    const months = [
      "ene",
      "feb",
      "mar",
      "abr",
      "may",
      "jun",
      "jul",
      "ago",
      "sep",
      "oct",
      "nov",
      "dic",
    ]

    const monthIndex = Number(month) - 1
    return `${months[monthIndex]} ${Number(day)}, ${year}`
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-4 pb-3 text-foreground">
      {/* Header */}
      <section className="space-y-2">
        <h1 className="text-xl font-semibold tracking-tight">
          Tareas programadas
        </h1>
        <div className="h-px w-full bg-border" />
      </section>

      {/* Card */}
      <section className="space-y-0 rounded-lg border border-border/70 bg-card/20">
        {/* Tabs */}
        <div className="border-b border-border/70 p-0.5">
          <div className="inline-flex rounded-lg border border-border/80 bg-background p-0.5">
            <Button
              size="sm"
              variant={activeTab === "programado" ? "secondary" : "ghost"}
              onClick={() => setActiveTab("programado")}
              className="h-8 px-4 text-sm"
            >
              Programado
            </Button>
            <Button
              size="sm"
              variant={activeTab === "completado" ? "secondary" : "ghost"}
              onClick={() => setActiveTab("completado")}
              className="h-8 px-4 text-sm"
            >
              Completado
            </Button>
          </div>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-3 border-b border-border/70 px-2 py-2 text-sm text-muted-foreground">
          {activeTab === "programado" ? (
            <>
              <span>Titulo</span>
              <span>Programar a</span>
              <span className="text-right">Estado</span>
            </>
          ) : (
            <>
              <span>Nombre</span>
              <span />
              <span className="text-right">Hora</span>
            </>
          )}
        </div>

        {/* Empty State */}
        {activeTab === "programado" ? (
          <div className="flex min-h-[360px] flex-col items-center justify-center gap-3 px-4 text-center">
            <CalendarDays className="size-8 text-muted-foreground/70" />
            <p className="max-w-sm text-base text-muted-foreground">
              Programa tareas futuras y deja que MoodGraph gestione tu rutina.
            </p>

            <Button
              onClick={() => setOpenModal(true)}
              variant="secondary"
              size="sm"
              className="h-9 px-4 text-sm"
            >
              <Plus className="size-4" />
              Nuevo horario
            </Button>
          </div>
        ) : (
          <div className="flex min-h-[360px] flex-col items-center justify-center gap-2 px-4 text-center">
            <CalendarDays className="size-8 text-muted-foreground/70" />
            <p className="text-base text-muted-foreground">
              No hay tareas completadas
            </p>
          </div>
        )}
      </section>

      {/* ================= MODAL ================= */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="w-full max-w-3xl rounded-2xl border border-border bg-card p-6">
            {/* HEADER */}
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                Agregar tarea programada
              </h2>
              <X
                className="size-4 cursor-pointer"
                onClick={() => setOpenModal(false)}
              />
            </div>

            {/* FORM */}
            <div className="space-y-5">
              {/* TITLE */}
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Título</label>
                <input
                  className="h-11 w-full rounded-lg border border-input bg-muted/40 px-3 text-sm outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  placeholder="Resumen de noticias de IA"
                />
              </div>

              {/* INDICATOR */}
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">
                  Indicador
                </label>
                <textarea
                  className="h-28 w-full rounded-lg border border-input bg-muted/40 px-3 py-2 text-sm outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  placeholder="Busca las noticias..."
                />
              </div>

              {/* PROGRAMAR */}
              <div className="relative space-y-2">
                <label className="text-sm text-muted-foreground">
                  Programar
                </label>

                <div className="grid grid-cols-3 gap-3">
                  {/* REPEAT DROPDOWN */}
                  <div className="relative">
                    <div
                      onClick={() => setShowRepeat(!showRepeat)}
                      className="flex h-11 cursor-pointer items-center justify-between rounded-lg border border-input bg-muted/40 px-3 text-sm"
                    >
                      {repeat}
                      <ChevronDown className="size-4 opacity-60" />
                    </div>

                    {showRepeat && (
                      <div className="absolute z-50 mt-1 w-full rounded-lg border border-border bg-popover p-1">
                        {repeatOptions.map((opt) => (
                          <div
                            key={opt}
                            onClick={() => {
                              setRepeat(opt)
                              setShowRepeat(false)
                            }}
                            className="cursor-pointer rounded-md px-3 py-2 text-sm hover:bg-muted"
                          >
                            {opt}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* DATE INPUT (simple for now) */}
                  <div className="relative h-11 rounded-lg border border-input bg-muted/40 px-3 text-sm">
                    <span className="flex h-full items-center">
                      {formatDateLabel(scheduledDate)}
                    </span>
                    <input
                      type="date"
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      className="absolute inset-0 cursor-pointer opacity-0"
                    />
                  </div>

                  {/* TIME PICKER */}
                  <div className="relative">
                    <div
                      onClick={() => setShowTime(!showTime)}
                      className="flex h-11 cursor-pointer items-center justify-between rounded-lg border border-input bg-muted/40 px-3 text-sm"
                    >
                      {hour}:{minute}
                      <ChevronDown className="size-4 opacity-60" />
                    </div>

                    {showTime && (
                      <div className="absolute z-50 mt-1 flex gap-3 rounded-xl border border-border bg-popover p-3">
                        {/* HOURS */}
                        <div className="h-40 overflow-y-auto">
                          {hours.map((h) => (
                            <div
                              key={h}
                              onClick={() => setHour(h)}
                              className={`cursor-pointer rounded px-3 py-1 ${
                                hour === h
                                  ? "bg-primary text-primary-foreground"
                                  : "hover:bg-muted"
                              }`}
                            >
                              {h}
                            </div>
                          ))}
                        </div>

                        {/* MINUTES */}
                        <div className="h-40 overflow-y-auto">
                          {minutes.map((m) => (
                            <div
                              key={m}
                              onClick={() => setMinute(m)}
                              className={`cursor-pointer rounded px-3 py-1 ${
                                minute === m
                                  ? "bg-primary text-primary-foreground"
                                  : "hover:bg-muted"
                              }`}
                            >
                              {m}
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-col justify-end">
                          <button
                            onClick={() => setShowTime(false)}
                            className="mt-2 rounded-md bg-primary px-3 py-1 text-sm text-primary-foreground"
                          >
                            Aceptar
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* EXTRA FIELDS */}
              <div className="space-y-3">
                <input
                  className="h-11 w-full rounded-lg border border-input bg-muted/40 px-3 text-sm"
                  placeholder="Fecha de vencimiento (opcional)"
                />
                <input
                  className="h-11 w-full rounded-lg border border-input bg-muted/40 px-3 text-sm"
                  placeholder="Conectores (opcional)"
                />
              </div>

              {/* ADVANCED */}
              <div className="flex items-center justify-between rounded-xl border border-border px-4 py-3 text-sm">
                <span>Configuraciones avanzadas</span>
                <span className="text-muted-foreground">
                  MoodGraph 1.6 Lite · Siempre preguntar
                </span>
              </div>

              {/* FOOTER */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setOpenModal(false)}
                  className="rounded-lg border border-border px-4 py-2 text-sm"
                >
                  Cancelar
                </button>
                <button className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground">
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TareasProgramadas
