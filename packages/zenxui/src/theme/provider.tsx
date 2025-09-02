/**
 * Enhanced Theme Provider
 * 
 * High-performance theme provider with responsive design support,
 * system color mode detection, and comprehensive customization options.
 */

import React, { 
  createContext, 
  useContext, 
  useState, 
  useEffect, 
  useMemo, 
  useCallback,
  ReactNode,
} from 'react'
import { Appearance, Dimensions } from 'react-native'
import type {
  Theme,
  ColorMode,
  ColorModePreference,
  ThemeContextValue,
  ThemeProviderProps,
  CustomTheme,
  ResponsiveValue,
  ComponentState,
  StyleValue,
  ResponsiveStyleValue,
} from './types'
import { createDefaultTheme, defaultConfig } from './defaultTheme'
import { 
  useResponsiveValue,
  createStyleResolver,
  mergeStyleDefinitions,
  resolveStyleWithState,
  createStableTheme,
  validateTheme,
} from './utils'

// Theme context
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

/**
 * Deep merge utility for theme customization
 */
const deepMerge = <T extends Record<string, any>>(target: T, source: Partial<T>): T => {
  const result = { ...target }
  
  for (const key in source) {
    if (source[key] !== undefined) {
      if (
        typeof source[key] === 'object' && 
        source[key] !== null && 
        !Array.isArray(source[key]) &&
        typeof target[key] === 'object' && 
        target[key] !== null && 
        !Array.isArray(target[key])
      ) {
        result[key] = deepMerge(target[key], source[key] as any)
      } else {
        result[key] = source[key] as any
      }
    }
  }
  
  return result
}

/**
 * Enhanced Theme Provider Component
 * 
 * Provides theme context with performance optimizations, responsive design support,
 * and comprehensive customization capabilities.
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  theme: customTheme,
  config: customConfig,
  colorMode: forcedColorMode,
  onColorModeChange,
}) => {
  // Merge custom config with defaults
  const config = useMemo(() => ({
    ...defaultConfig,
    ...customConfig,
  }), [customConfig])

  // Initialize color mode state
  const [colorMode, setColorModeState] = useState<ColorMode>(() => {
    if (forcedColorMode) return forcedColorMode
    
    if (config.useSystemColorMode) {
      const systemColorScheme = Appearance.getColorScheme()
      return systemColorScheme === 'dark' ? 'dark' : 'light'
    }
    
    return config.initialColorMode === 'system' 
      ? (Appearance.getColorScheme() === 'dark' ? 'dark' : 'light')
      : (config.initialColorMode as ColorMode)
  })

  // Listen to system color scheme changes
  useEffect(() => {
    if (!forcedColorMode && config.useSystemColorMode) {
      const subscription = Appearance.addChangeListener(({ colorScheme }) => {
        const newColorMode = colorScheme === 'dark' ? 'dark' : 'light'
        setColorModeState(newColorMode)
        onColorModeChange?.(newColorMode)
      })
      
      return () => subscription?.remove()
    }
  }, [config.useSystemColorMode, forcedColorMode, onColorModeChange])

  // Update color mode when forced color mode changes
  useEffect(() => {
    if (forcedColorMode && forcedColorMode !== colorMode) {
      setColorModeState(forcedColorMode)
      onColorModeChange?.(forcedColorMode)
    }
  }, [forcedColorMode, colorMode, onColorModeChange])

  // Create theme with color mode and custom overrides
  const theme = useMemo(() => {
    const baseTheme = createDefaultTheme(colorMode)
    
    // Merge custom theme if provided
    let mergedTheme = baseTheme
    if (customTheme) {
      mergedTheme = deepMerge(baseTheme, customTheme as any)
    }
    
    // Update config
    const finalTheme = {
      ...mergedTheme,
      config,
    }
    
    // Validate theme in development
    if (__DEV__) {
      const errors = validateTheme(finalTheme)
      if (errors.length > 0) {
        console.warn('ZenXUI Theme Validation Errors:', errors)
      }
    }
    
    return createStableTheme(finalTheme)
  }, [colorMode, customTheme, config])

  // Color mode management functions
  const toggleColorMode = useCallback(() => {
    if (forcedColorMode) {
      console.warn('Cannot toggle color mode when forcedColorMode is set')
      return
    }
    
    const newColorMode = colorMode === 'light' ? 'dark' : 'light'
    setColorModeState(newColorMode)
    onColorModeChange?.(newColorMode)
  }, [colorMode, forcedColorMode, onColorModeChange])

  const setColorMode = useCallback((mode: ColorMode) => {
    if (forcedColorMode) {
      console.warn('Cannot set color mode when forcedColorMode is set')
      return
    }
    
    setColorModeState(mode)
    onColorModeChange?.(mode)
  }, [forcedColorMode, onColorModeChange])

  // Responsive value resolver
  const resolveResponsiveValue = useCallback(<T,>(value: ResponsiveValue<T>): T => {
    return useResponsiveValue(value)
  }, [])

  // Memoized context value
  const contextValue = useMemo<ThemeContextValue>(() => ({
    theme,
    colorMode,
    toggleColorMode,
    setColorMode,
    resolveResponsiveValue,
  }), [theme, colorMode, toggleColorMode, setColorMode, resolveResponsiveValue])

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}

/**
 * Hook to access theme context
 * 
 * @throws Error if used outside of ThemeProvider
 */
export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext)
  
  if (!context) {
    throw new Error(
      'useTheme must be used within a ThemeProvider. ' +
      'Wrap your app with <ThemeProvider> to use ZenXUI components.'
    )
  }
  
  return context
}

/**
 * Hook for color mode management
 * 
 * Simplified hook that only provides color mode related functionality
 */
export const useColorMode = () => {
  const { colorMode, toggleColorMode, setColorMode } = useTheme()
  
  return useMemo(() => ({
    colorMode,
    toggleColorMode,
    setColorMode,
  }), [colorMode, toggleColorMode, setColorMode])
}

/**
 * Hook for responsive values
 * 
 * Efficiently resolves responsive values based on current screen size
 */
export const useBreakpointValue = <T,>(value: ResponsiveValue<T>): T => {
  const { resolveResponsiveValue } = useTheme()
  return resolveResponsiveValue(value)
}

/**
 * Hook for component theme integration
 * 
 * Provides optimized theme integration for individual components
 */
export const useComponentTheme = (
  componentName: string,
  props: Record<string, any> = {}
) => {
  const { theme, resolveResponsiveValue } = useTheme()
  
  const componentTheme = useMemo(() => {
    return theme.components[componentName]
  }, [theme.components, componentName])
  
  return useMemo(() => {
    if (!componentTheme) {
      if (theme.config.strictMode) {
        throw new Error(`No theme found for component: ${componentName}`)
      }
      return {
        resolvedStyles: {},
        getStyle: () => ({}),
        getResponsiveStyle: (style: any) => style,
      }
    }
    
    const { variant, size, colorScheme, ...restProps } = props
    
    // Resolve styles in order of specificity
    const baseStyle = componentTheme.baseStyle || {}
    const variantStyle = variant ? componentTheme.variants?.[variant] || {} : {}
    const sizeStyle = size ? componentTheme.sizes?.[size] || {} : {}
    const colorSchemeStyle = colorScheme ? componentTheme.colorSchemes?.[colorScheme] || {} : {}
    
    // Merge styles with proper precedence
    const resolvedStyles = mergeStyleDefinitions(
      baseStyle,
      variantStyle,
      sizeStyle,
      colorSchemeStyle
    )
    
    // Style resolution functions
    const getStyle = useCallback((
      element: keyof typeof resolvedStyles,
      state: ComponentState = {}
    ) => {
      const elementStyle = resolvedStyles[element]
      if (!elementStyle) return {}
      
      return resolveStyleWithState(elementStyle, state, resolveResponsiveValue) || {}
    }, [resolvedStyles, resolveResponsiveValue])
    
    const getResponsiveStyle = useCallback(<T extends StyleValue>(
      style: ResponsiveStyleValue<T>,
      state: ComponentState = {}
    ): T | undefined => {
      return resolveStyleWithState(style, state, resolveResponsiveValue)
    }, [resolveResponsiveValue])
    
    return {
      resolvedStyles,
      getStyle,
      getResponsiveStyle,
    }
  }, [componentTheme, props, theme.config.strictMode, resolveResponsiveValue])
}

/**
 * Hook for accessing theme tokens directly
 * 
 * Provides type-safe access to theme tokens with autocomplete support
 */
export const useToken = () => {
  const { theme } = useTheme()
  
  return useMemo(() => ({
    colors: theme.colors,
    typography: theme.typography,
    spacing: theme.spacing,
    borderRadius: theme.borderRadius,
    shadows: theme.shadows,
    zIndex: theme.zIndex,
    breakpoints: theme.breakpoints,
    animations: theme.animations,
  }), [theme])
}

/**
 * Higher-order component for theme injection
 * 
 * Provides theme context to components that don't use hooks
 */
export const withTheme = <P extends object>(
  Component: React.ComponentType<P & { theme: Theme }>
) => {
  const WrappedComponent = (props: P) => {
    const { theme } = useTheme()
    return <Component {...props} theme={theme} />
  }
  
  WrappedComponent.displayName = `withTheme(${Component.displayName || Component.name})`
  
  return WrappedComponent
}

// Re-export types for convenience
export type {
  Theme,
  ColorMode,
  ColorModePreference,
  ThemeContextValue,
  ThemeProviderProps,
  CustomTheme,
}
