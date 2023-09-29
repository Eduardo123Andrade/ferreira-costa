import React, { createContext, useState } from "react"
import { THEMES, Theme } from "../theme/theme"

type ThemeMode = "DARK" | "LIGHT"

interface ThemeProviderState {
  mode: ThemeMode
  colors: Theme
}

interface ThemeProviderActions {
  onSwitchTheme: () => void
}

type ThemeProviderData = [
  state: ThemeProviderState,
  actions: ThemeProviderActions
]

export const ThemeContext = createContext<ThemeProviderData>(
  {} as ThemeProviderData
)

interface ThemeProviderProps {
  children: React.ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>("DARK")
  const [colors, setColors] = useState<Theme>(THEMES.dark)

  const onSwitchTheme = () => {
    if (mode === "DARK") {
      setColors(THEMES.light)
      return setMode("LIGHT")
    }

    setColors(THEMES.dark)
    return setMode("DARK")
  }

  return (
    <ThemeContext.Provider
      children={children}
      value={[{ colors, mode }, { onSwitchTheme }]}
    />
  )
}
