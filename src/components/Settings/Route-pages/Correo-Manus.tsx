import {
  ListChecks,
  FileText,
  Globe,
  Smartphone,
  CreditCard,
  ChevronRight,
} from "lucide-react"

const items = [
  {
    title: "Tareas compartidas",
    icon: ListChecks,
  },
  {
    title: "Archivos compartidos",
    icon: FileText,
  },
  {
    title: "Sitios web",
    icon: Globe,
  },
  {
    title: "Aplicaciones",
    icon: Smartphone,
  },
  {
    title: "Dominios comprados",
    icon: CreditCard,
  },
]

const CorreoManus = () => {
  return (
    <div className="w-full max-w-5xl p-6 text-white">
      {/* Title */}
      <h2 className="mb-6 text-xl font-semibold text-muted-foreground">
        Controles de datos
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {items.map((item, index) => {
          const Icon = item.icon
          return (
            <div
              key={index}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
            >
              {/* Left */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <span className="text-sm font-medium">{item.title}</span>
              </div>

              {/* Right Arrow */}
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CorreoManus
