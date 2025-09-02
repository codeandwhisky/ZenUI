import React, { createContext, useContext, ReactNode } from 'react'
import { colors } from './tokens'

export type ColorMode = 'light' | 'dark'

export interface Theme {
  colors: typeof colors
  colorMode: ColorMode
}

export interface ThemeContextType {
  theme: Theme
  colorMode: ColorMode
  toggleColorMode: () => void
  setColorMode: (mode: ColorMode) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export interface ThemeProviderProps {
  children: ReactNode
  initialColorMode?: ColorMode
}

export function ThemeProvider({ 
  children, 
  initialColorMode = 'light' 
}: ThemeProviderProps) {
  const [colorMode, setColorModeState] = React.useState<ColorMode>(initialColorMode)

  const theme: Theme = React.useMemo(() => ({
    colors,
    colorMode,
  }), [colorMode])

  const toggleColorMode = React.useCallback(() => {
    setColorModeState(prev => prev === 'light' ? 'dark' : 'light')
  }, [])

  const setColorMode = React.useCallback((mode: ColorMode) => {
    setColorModeState(mode)
  }, [])

  const value = React.useMemo(() => ({
    theme,
    colorMode,
    toggleColorMode,
    setColorMode,
  }), [theme, colorMode, toggleColorMode, setColorMode])

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export function useColorMode() {
  const { colorMode, toggleColorMode, setColorMode } = useTheme()
  return { colorMode, toggleColorMode, setColorMode }
}