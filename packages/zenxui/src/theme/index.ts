/**
 * Enhanced Theme System for ZenXUI
 * 
 * A comprehensive, performant, and highly customizable theming system
 * that supports responsive design, semantic colors, and component-level theming.
 */

// Type definitions
export type * from './types'

// Default theme configuration
export { createDefaultTheme } from './defaultTheme'

// Performance utilities
export {
  useResponsiveValue,
  resolveStyleWithState,
  mergeStyleDefinitions,
  clearThemeCache,
} from './utils'

// Enhanced theme provider
export {
  ThemeProvider,
  useTheme,
  useComponentTheme,
  useColorMode,
} from './provider'

// Component themes
export {
  buttonTheme,
  inputTheme,
  cardTheme,
  textTheme,
  defaultComponentThemes,
} from './componentThemes'

// Re-export for convenience
export type {
  Theme,
  ComponentTheme,
  ComponentThemes,
  ResponsiveValue,
  StyleDefinition,
  SemanticColors,
  ColorMode,
  ThemeConfig,
} from './types'

/**
 * Create a custom theme by merging with the default theme
 * 
 * @param customTheme - Partial theme configuration to merge
 * @returns Complete theme configuration
 */
import type { Theme } from './types'
import { createDefaultTheme } from './defaultTheme'

export function createTheme(customTheme: Partial<Theme> = {}): Theme {
  const defaultTheme = createDefaultTheme()
  
  return {
    ...defaultTheme,
    ...customTheme,
    colors: {
      ...defaultTheme.colors,
      ...customTheme.colors,
    },
    components: {
      ...defaultTheme.components,
      ...customTheme.components,
    },
    config: {
      ...defaultTheme.config,
      ...customTheme.config,
    },
  }
}

/**
 * Default export for convenience
 */
export default createTheme
