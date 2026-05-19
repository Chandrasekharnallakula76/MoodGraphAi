import { Moon, Sun, Palette } from "lucide-react"
import { useTheme } from "./theme-provider"
import { useColorTheme } from "./color-theme-provider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const { colorTheme, setColorTheme } = useColorTheme()

  return (
    <div className="fixed right-4 bottom-6 z-50 flex flex-col gap-3">
      {/* Dark/Light Toggle */}
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-[#27272a] bg-[#0f0f10] shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-[#18181b]"
      >
        {theme === "light" && <Moon className="h-5 w-5 text-white" />}
        {theme === "dark" && <Sun className="h-5 w-5 text-white" />}

        {/* Tooltip */}
        <span className="absolute right-full mr-3 rounded-md bg-[#27272a] px-2 py-1 text-xs font-medium whitespace-nowrap text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100">
          {theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </span>
      </button>

      {/* Color Theme Toggle - Pink/Green */}
      <button
        onClick={() => setColorTheme(colorTheme === "pink" ? "green" : "pink")}
        className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-[#27272a] bg-[#0f0f10] shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-[#18181b]"
      >
        <Palette className="h-5 w-5 text-white" />

        {/* Colored dot indicator */}
        <span
          className={`absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-2 border-[#0f0f10] transition-all duration-300 ${
            colorTheme === "pink" ? "bg-pink-500" : "bg-emerald-500"
          }`}
        />

        {/* Tooltip */}
        <span className="absolute right-full mr-3 rounded-md bg-[#27272a] px-2 py-1 text-xs font-medium whitespace-nowrap text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100">
          {colorTheme === "pink" ? "Pink Theme" : "Green Theme"}
        </span>
      </button>
    </div>
  )
}
