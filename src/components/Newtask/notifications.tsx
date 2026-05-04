import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Bell } from "lucide-react"

interface NotificationItem {
  title: string
  date: string
  description: string
  image: string
}

interface VideoCardProps {
  item: NotificationItem
  showLabel?: boolean
}

const notifications = {
  todo: [
    {
      title: "Controla Manus Desktop desde tu teléfono",
      date: "30 mar 2026",
      description:
        "Asigna una tarea desde tu teléfono y vuelve al trabajo terminado en tu computadora.",
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop",
    },
    {
      title: "Introducing My Computer",
      date: "16 mar 2026",
      description: "What can I do for you?",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    },
    {
      title: "Sincronización en tiempo real",
      date: "12 mar 2026",
      description:
        "Todos tus dispositivos conectados y sincronizados automáticamente.",
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop",
    },
    {
      title: "Automatiza tareas con IA",
      date: "05 mar 2026",
      description:
        "Crea flujos de trabajo inteligentes y deja que Manus haga el resto.",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f70a504f0?w=800&h=600&fit=crop",
    },
  ],
  actualizaciones: [
    {
      title: "Controla Manus Desktop desde tu teléfono",
      date: "30 mar 2026",
      description:
        "Asigna una tarea desde tu teléfono y vuelve al trabajo terminado en tu computadora.",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=800&h=600&fit=crop",
    },
    {
      title: "Nueva experiencia de usuario",
      date: "10 mar 2026",
      description: "Interfaz más limpia, rápida y moderna.",
      image:
        "https://images.unsplash.com/photo-1559156069-fc686db46c8f?w=800&h=600&fit=crop",
    },
    {
      title: "Modo oscuro mejorado",
      date: "08 mar 2026",
      description:
        "Reduce la fatiga visual con un nuevo diseño optimizado para la noche.",
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop",
    },
    {
      title: "Panel de control inteligente",
      date: "01 mar 2026",
      description:
        "Visualiza todas tus tareas y automatizaciones desde un solo lugar.",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    },
  ],
  mensajes: [
    {
      title: "Bienvenido a Manus AI",
      date: "Hoy",
      description:
        "Empieza creando tu primera automatización o conecta tus dispositivos.",
      image:
        "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=600&fit=crop",
    },
    {
      title: "Consejo rápido",
      date: "Ayer",
      description: "Usa comandos de voz para asignar tareas más rápido.",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f70a504f0?w=800&h=600&fit=crop",
    },
  ],
}

const VideoCard = ({ item, showLabel }: VideoCardProps) => (
  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-6 md:gap-8">
    <div className="w-full sm:w-32 sm:shrink-0">
      {showLabel && (
        <div className="text-sm font-medium text-muted-foreground">
          Actualizaciones
        </div>
      )}
      <div className="mt-1 text-xs text-muted-foreground">{item.date}</div>
    </div>

    <div className="w-full min-w-0 flex-1">
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="relative aspect-[16/10] w-full sm:h-[260px] sm:aspect-auto">
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-md sm:h-14 sm:w-14">
              <Play className="ml-0.5 h-5 w-5 text-black sm:h-6 sm:w-6" />
            </div>
          </div>
        </div>

        <div className="space-y-2 px-4 py-4 sm:px-5">
          <h3 className="text-base font-semibold leading-snug text-foreground sm:text-lg">
            {item.title}
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  </div>
)

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center gap-4 py-12 sm:py-16">
    <div className="rounded-full bg-muted p-4">
      <Bell className="h-8 w-8 text-muted-foreground" />
    </div>
    <div className="text-center">
      <h3 className="text-lg font-semibold text-foreground">No hay datos aquí</h3>
      <p className="text-sm text-muted-foreground">
        No hay notificaciones en este momento
      </p>
    </div>
  </div>
)

export default function Notifications() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col space-y-5 px-4 py-5 sm:space-y-6 sm:px-6 sm:py-8">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">
          Notificaciones
        </h1>
      </div>

      <Tabs defaultValue="actualizaciones" className="w-full">
        <TabsList className="mx-auto flex w-full max-w-full gap-1 overflow-x-auto rounded-xl px-1 sm:w-auto sm:overflow-visible">
          <TabsTrigger value="actualizaciones" className="min-w-max px-4">
            Todo
          </TabsTrigger>
          <TabsTrigger value="todo" className="min-w-max px-4">
            Actualizaciones
          </TabsTrigger>
          <TabsTrigger value="mensajes" className="min-w-max px-4">
            Mensajes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="todo" className="mt-5 space-y-8 sm:mt-6 sm:space-y-10">
          {notifications.todo.map((item, i) => (
            <VideoCard key={i} item={item} />
          ))}
        </TabsContent>

        <TabsContent
          value="actualizaciones"
          className="mt-5 space-y-8 sm:mt-6 sm:space-y-10"
        >
          {notifications.actualizaciones.map((item, i) => (
            <VideoCard key={i} item={item} showLabel />
          ))}
        </TabsContent>

        <TabsContent value="mensajes" className="mt-8 sm:mt-10">
          <EmptyState />
        </TabsContent>
      </Tabs>
    </div>
  )
}
