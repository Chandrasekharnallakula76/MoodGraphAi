/* eslint-disable react-refresh/only-export-components */
import * as React from "react"

type ColorTheme = "pink" | "green"

type ColorThemeProviderProps = {
  children: React.ReactNode
  defaultColorTheme?: ColorTheme
  storageKey?: string
}

type ColorThemeProviderState = {
  colorTheme: ColorTheme
  setColorTheme: (theme: ColorTheme) => void
}

const COLOR_THEME_VALUES: ColorTheme[] = ["pink", "green"]

const ColorThemeContext = React.createContext<
  ColorThemeProviderState | undefined
>(undefined)

function isColorTheme(value: string | null): value is ColorTheme {
  if (value === null) {
    return false
  }
  return COLOR_THEME_VALUES.includes(value as ColorTheme)
}

export function ColorThemeProvider({
  children,
  defaultColorTheme = "pink",
  storageKey = "color-theme",
}: ColorThemeProviderProps) {
  const [colorTheme, setColorState] = React.useState<ColorTheme>(() => {
    const stored = localStorage.getItem(storageKey)
    if (isColorTheme(stored)) {
      return stored
    }
    return defaultColorTheme
  })

  const setColorTheme = React.useCallback(
    (nextTheme: ColorTheme) => {
      localStorage.setItem(storageKey, nextTheme)
      setColorState(nextTheme)
    },
    [storageKey]
  )

  React.useEffect(() => {
    const root = document.documentElement
    root.setAttribute("data-color-theme", colorTheme)
  }, [colorTheme])

  const value = React.useMemo(
    () => ({
      colorTheme,
      setColorTheme,
    }),
    [colorTheme, setColorTheme]
  )

  return (
    <ColorThemeContext.Provider value={value}>
      {children}
    </ColorThemeContext.Provider>
  )
}

export const useColorTheme = () => {
  const context = React.useContext(ColorThemeContext)
  if (context === undefined) {
    throw new Error("useColorTheme must be used within a ColorThemeProvider")
  }
  return context
}
