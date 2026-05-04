import { useState } from "react"
import {
  CalendarClock,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  ReceiptText,
  Sparkles,
} from "lucide-react"

const Usage = () => {
  const [showBillingDetails, setShowBillingDetails] = useState(false)

  if (showBillingDetails) {
    return (
      <div className="mx-auto w-full max-w-5xl space-y-5 pb-6 text-foreground">
        <section className="space-y-3">
          <button
            type="button"
            onClick={() => setShowBillingDetails(false)}
            className="flex items-center gap-2 text-left"
          >
            <ChevronLeft className="size-5 text-muted-foreground" />
            <h1 className="text-xl font-semibold">
              Uso del sitio web y facturacion
            </h1>
          </button>
          <div className="h-px w-full bg-border" />
        </section>

        <section className="space-y-4 rounded-xl border border-border/80 bg-card/60 p-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-medium text-muted-foreground">
              Manten tus sitios funcionando cuando se agoten los saldos
              gratuitos
            </p>
            <button className="rounded-lg bg-muted px-3 py-1 text-xs">
              Habilitar recarga
            </button>
          </div>

          <div className="grid gap-2 md:grid-cols-3">
            {["Nube", "IA", "Integraciones"].map((item) => (
              <div key={item} className="rounded-xl bg-card p-3">
                <div className="mb-2 flex items-center gap-1">
                  <p className="text-lg font-semibold">{item}</p>
                  <CircleHelp className="size-3 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground">Saldo gratuito</p>
                <p className="mb-2 text-lg font-semibold">$0 / $1</p>
                <p className="text-xs text-muted-foreground">Uso pagado</p>
                <p className="text-sm">-</p>
              </div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground">
            Se restablece el 1 may 2026
          </p>
        </section>

        <section className="space-y-3">
          <div className="flex items-end justify-between gap-3">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">Detalle</h3>
              <button className="flex items-center gap-2 rounded-lg border px-2 py-1 text-sm text-muted-foreground">
                abr 1 - abr 13
                <ChevronDown className="size-3" />
              </button>
            </div>
            <p className="text-lg font-semibold">Total: $0.00</p>
          </div>

          <div className="rounded-xl border">
            <div className="flex justify-between border-b px-2 py-1 text-sm text-muted-foreground">
              <span>Sitios</span>
              <span>Costo</span>
            </div>
            <div className="flex min-h-[150px] flex-col items-center justify-center gap-2 p-3">
              <Sparkles className="size-6 text-muted-foreground/70" />
              <p className="text-sm text-muted-foreground">No hay datos</p>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-5 pb-6 text-foreground">
      <section className="space-y-3">
        <h1 className="text-xl font-semibold">Uso</h1>
        <div className="h-px w-full bg-border" />
      </section>

      <section className="space-y-3">
        <div className="rounded-xl border bg-card/70 p-3">
          <div className="mb-3 flex justify-between">
            <h2 className="text-xl font-semibold">Gratis</h2>
            <button className="rounded-lg bg-muted px-3 py-1 text-xs">
              Actualizar
            </button>
          </div>

          <div className="mb-3 border-t border-dashed" />

          <div className="space-y-4">
            <div className="flex justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Sparkles className="size-3 text-muted-foreground" />
                  <p className="text-sm font-semibold">Creditos</p>
                </div>
                <p className="text-xs text-muted-foreground">Creditos gratis</p>
              </div>
              <p className="text-base font-semibold">0</p>
            </div>

            <div className="flex justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <CalendarClock className="size-3 text-muted-foreground" />
                  <p className="text-sm font-semibold">Creditos diarios</p>
                </div>
                <p className="text-xs text-muted-foreground">300 cada dia</p>
              </div>
              <p className="text-base font-semibold">300</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowBillingDetails(true)}
          className="flex w-full items-center justify-between rounded-xl border px-3 py-3 text-sm"
        >
          <div className="flex items-center gap-2">
            <ReceiptText className="size-4 text-muted-foreground" />
            Uso y facturacion
          </div>
          <ChevronRight className="size-4 text-muted-foreground" />
        </button>
      </section>

      <section className="space-y-4">
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold">Historial</h3>
          <span className="text-xs text-muted-foreground">UTC+5</span>
        </div>

        <div className="flex min-h-[180px] flex-col items-center justify-center gap-2 rounded-xl border border-dashed">
          <Sparkles className="size-6 text-muted-foreground/70" />
          <p className="text-sm text-muted-foreground">No hay datos</p>
        </div>
      </section>
    </div>
  )
}

export default Usage
