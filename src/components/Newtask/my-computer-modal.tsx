import { useNavigate } from "react-router-dom"
import { Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function MyComputerModal() {
  const navigate = useNavigate()

  const openMyComputerRoute = () => {
    navigate("/settings/mi-computadora")
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon-xs"
          className="cursor-pointer rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          onClick={openMyComputerRoute}
          aria-label="My computer"
        >
          <Monitor className="size-3.5" />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="top">My computer</TooltipContent>
    </Tooltip>
  )
}
