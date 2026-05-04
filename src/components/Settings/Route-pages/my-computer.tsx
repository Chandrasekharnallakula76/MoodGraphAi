import { Folder } from "lucide-react"

const MyComputer = () => {
  return (
    <div className="flex h-full w-full flex-col bg-background text-foreground">
      {/* Header */}
      <div className="border-b px-6 py-4">
        <h1 className="text-lg font-semibold text-muted-foreground">
          My Computer
        </h1>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col items-center justify-center gap-3">
        {/* Icon */}
        <div className="rounded-full border p-4 text-muted-foreground">
          <Folder className="h-6 w-6" />
        </div>

        {/* Title */}
        <h2 className="text-sm font-semibold">Ninguna carpeta</h2>

        {/* Subtitle */}
        <p className="text-xs text-muted-foreground">
          Agregue una carpeta local para comenzar.
        </p>
      </div>
    </div>
  )
}

export default MyComputer
