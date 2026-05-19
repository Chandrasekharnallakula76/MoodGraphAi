import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  Search,
  LayoutGrid,
  List,
  Star,
  SlidersHorizontal,
  Inbox,
  Pencil,
  Check,
  ChevronDown,
  Layers,
  Globe,
  FileText,
  Image,
  Headphones,
  Ellipsis,
} from "lucide-react"

const filterItems = [
  { key: "todo", label: "Todo", icon: SlidersHorizontal },
  { key: "diapositivas", label: "Diapositivas", icon: Layers },
  { key: "sitios-web", label: "Sitios web", icon: Globe },
  { key: "documentos", label: "Documentos", icon: FileText },
  { key: "imagenes-videos", label: "Imágenes y videos", icon: Image },
  { key: "audio", label: "Audio", icon: Headphones },
  { key: "hojas-calculo", label: "Hojas de cálculo", icon: LayoutGrid },
  { key: "otros", label: "Otros", icon: Ellipsis },
] as const

const Biblioteca = () => {
  const [selectedFilter, setSelectedFilter] = useState<(typeof filterItems)[number]["key"]>("todo")
  const activeFilter =
    filterItems.find((item) => item.key === selectedFilter) ?? filterItems[0]

  return (
    <div className="flex min-h-full w-full flex-col p-4 md:p-6">
      {/* Header */}
      <div className="mb-4 flex flex-col gap-4 md:mb-6 md:flex-row md:items-center md:justify-between">
        <h1 className="text-xl font-semibold text-foreground">Library</h1>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* Search */}
          <div className="relative w-full sm:w-auto">
            <Search className="absolute top-2.5 left-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar archivos"
              className="w-full pl-9 sm:w-[220px]"
            />
          </div>

          {/* View toggle */}
          <div className="flex items-center self-start rounded-md border">
            <Button variant="ghost" size="icon">
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap items-center gap-3 md:mb-8">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              <SlidersHorizontal className="mr-1.5 h-3.5 w-3.5" />
              {activeFilter.label}
              <ChevronDown className="ml-1.5 h-3.5 w-3.5 text-muted-foreground" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[210px] rounded-xl p-0.5" align="start">
            {filterItems.map((item) => {
              const Icon = item.icon
              const isActive = selectedFilter === item.key

              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setSelectedFilter(item.key)}
                  className="flex w-full items-center justify-between rounded-md px-2 py-1 text-left text-xs hover:bg-muted"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                    {item.label}
                  </span>
                  {isActive ? (
                    <Check className="h-3.5 w-3.5 text-foreground" />
                  ) : null}
                </button>
              )
            })}
          </PopoverContent>
        </Popover>

        <Button variant="outline" size="sm">
          <Star className="mr-2 h-4 w-4" />
          Mis favoritos
        </Button>
      </div>

      {/* Empty State */}
      <div className="flex flex-1 items-start justify-center py-10 md:items-center md:py-0">
        <div className="space-y-4 text-center">
          <div className="flex justify-center">
            <Inbox className="h-10 w-10 text-muted-foreground" />
          </div>

          <div>
            <h2 className="text-base font-medium">Nada en la biblioteca</h2>
            <p className="text-sm text-muted-foreground">
              Crea tu propia base de conocimientos creando nuevas tareas.
            </p>
          </div>

          <Button>
            <Pencil className="mr-2 h-4 w-4" />
            Nueva tarea
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Biblioteca
