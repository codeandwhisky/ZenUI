/**
 * Theme Utilities
 * 
 * High-performance utilities for theme processing, style resolution,
 * and responsive value computation with memoization and optimization.
 */

import { useMemo, useCallback } from 'react'
import { Dimensions } from 'react-native'
import type {
  ResponsiveValue,
  ResponsiveObject,
  Breakpoint,
  StyleDefinition,
  ComponentState,
  StyleValue,
  ResponsiveStyleValue,
  ThemeCache,
  Theme,
} from './types'
import { breakpoints } from './defaultTheme'

// Performance-optimized cache for theme values
const themeCache: ThemeCache = {
  responsiveValues: new Map(),
  resolvedStyles: new Map(),
  computedStyles: new Map(),
}

// Cache size limits to prevent memory leaks
const CACHE_SIZE_LIMIT = 1000

/**
 * Clears theme cache when limit is reached
 */
const clearCacheIfNeeded = (cache: Map<string, any>) => {
  if (cache.size > CACHE_SIZE_LIMIT) {
    cache.clear()
  }
}

/**
 * Creates a stable cache key from parameters
 */
const createCacheKey = (...args: unknown[]): string => {
  return JSON.stringify(args)
}

/**
 * Resolves responsive values based on current screen dimensions
 * Uses memoization for performance optimization
 */
export const useResponsiveValue = <T>(value: ResponsiveValue<T>): T => {
  const { width } = Dimensions.get('window')
  
  return useMemo(() => {
    // Return non-responsive values directly
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
      return value as T
    }
    
    const cacheKey = createCacheKey(value, width)
    
    // Check cache first
    if (themeCache.responsiveValues.has(cacheKey)) {
      return themeCache.responsiveValues.get(cacheKey)
    }
    
    const responsiveValue = value as ResponsiveObject<T>
    
    // Find the appropriate breakpoint value
    const breakpointEntries = Object.entries(breakpoints)
      .sort(([, a], [, b]) => b - a) // Sort by breakpoint value descending
    
    for (const [breakpoint, minWidth] of breakpointEntries) {
      if (width >= minWidth && responsiveValue[breakpoint as Breakpoint] !== undefined) {
        const resolvedValue = responsiveValue[breakpoint as Breakpoint]!
        
        // Cache the result
        clearCacheIfNeeded(themeCache.responsiveValues)
        themeCache.responsiveValues.set(cacheKey, resolvedValue)
        
        return resolvedValue
      }
    }
    
    // Fallback to base value
    const fallbackValue = responsiveValue.base as T
    themeCache.responsiveValues.set(cacheKey, fallbackValue)
    
    return fallbackValue
  }, [value, width])
}

/**
 * Deep merges style definitions with proper precedence
 * Optimized for performance with shallow comparison where possible
 */
export const mergeStyleDefinitions = (...styles: (StyleDefinition | undefined)[]): StyleDefinition => {
  const cacheKey = createCacheKey(styles)
  
  // Check cache first
  const cached = themeCache.resolvedStyles.get(cacheKey)
  if (cached) {
    return cached
  }
  
  let container: any = {}
  let text: any = {}
  let icon: any = {}
  let image: any = {}
  
  for (const style of styles) {
    if (!style) continue
    
    // Merge each style type
    if (style.container) {
      container = { ...container, ...style.container }
    }
    
    if (style.text) {
      text = { ...text, ...style.text }
    }
    
    if (style.icon) {
      icon = { ...icon, ...style.icon }
    }
    
    if (style.image) {
      image = { ...image, ...style.image }
    }
  }
  
  const result: StyleDefinition = {
    container: Object.keys(container).length > 0 ? container : undefined,
    text: Object.keys(text).length > 0 ? text : undefined,
    icon: Object.keys(icon).length > 0 ? icon : undefined,
    image: Object.keys(image).length > 0 ? image : undefined,
  }
  
  // Cache the result
  clearCacheIfNeeded(themeCache.resolvedStyles)
  themeCache.resolvedStyles.set(cacheKey, result)
  
  return result
}

/**
 * Resolves style with pseudo states based on component state
 * Uses memoization and state-aware caching
 */
export const resolveStyleWithState = <T extends StyleValue>(
  style: ResponsiveStyleValue<T> | undefined,
  state: ComponentState = {},
  resolveResponsive: (value: ResponsiveValue<T>) => T
): T | undefined => {
  if (!style) return undefined
  
  const cacheKey = createCacheKey(style, state)
  
  // Check cache first
  if (themeCache.computedStyles.has(cacheKey)) {
    return themeCache.computedStyles.get(cacheKey) as T
  }
  
  // Start with base style
  let resolvedStyle = resolveResponsive(style as ResponsiveValue<T>)
  
  // Apply pseudo state styles in order of specificity
  const pseudoStates = [
    { condition: state.isHovered, key: '_hover' },
    { condition: state.isFocused, key: '_focus' },
    { condition: state.isPressed, key: '_pressed' },
    { condition: state.isSelected, key: '_selected' },
    { condition: state.isActive, key: '_active' },
    { condition: state.isChecked, key: '_checked' },
    { condition: state.isInvalid, key: '_invalid' },
    { condition: state.isDisabled, key: '_disabled' },
    { condition: state.isLoading, key: '_loading' },
    { condition: state.isReadOnly, key: '_readOnly' },
  ] as const
  
  for (const { condition, key } of pseudoStates) {
    if (condition && style && typeof style === 'object' && key in style) {
      const pseudoStyle = (style as any)[key]
      if (pseudoStyle) {
        const resolvedPseudoStyle = resolveResponsive(pseudoStyle)
        resolvedStyle = { ...resolvedStyle, ...resolvedPseudoStyle }
      }
    }
  }
  
  // Cache the result
  clearCacheIfNeeded(themeCache.computedStyles)
  themeCache.computedStyles.set(cacheKey, resolvedStyle)
  
  return resolvedStyle
}

/**
 * Extracts color scheme specific styles from a style definition
 */
export const applyColorScheme = (
  style: StyleDefinition,
  colorScheme: string,
  theme: Theme
): StyleDefinition => {
  const colorSchemeMap: Record<string, Record<string, string>> = {
    primary: {
      bg: 'primary.500',
      color: 'white',
      borderColor: 'primary.500',
    },
    secondary: {
      bg: 'secondary.500',
      color: 'white',
      borderColor: 'secondary.500',
    },
    success: {
      bg: 'success.500',
      color: 'white',
      borderColor: 'success.500',
    },
    warning: {
      bg: 'warning.500',
      color: 'white',
      borderColor: 'warning.500',
    },
    error: {
      bg: 'error.500',
      color: 'white',
      borderColor: 'error.500',
    },
    info: {
      bg: 'info.500',
      color: 'white',
      borderColor: 'info.500',
    },
  }
  
  const schemeColors = colorSchemeMap[colorScheme]
  if (!schemeColors) return style
  
  const result: StyleDefinition = {}
  
  // Apply color scheme to container styles
  if (style.container) {
    const containerStyle = { ...(style.container as any) }
    
    if (schemeColors.bg) {
      containerStyle.backgroundColor = getColorFromPath(theme, schemeColors.bg)
    }
    
    if (schemeColors.borderColor) {
      containerStyle.borderColor = getColorFromPath(theme, schemeColors.borderColor)
    }
    
    result.container = containerStyle
  }
  
  // Apply color scheme to text styles
  if (style.text) {
    const textStyle = { ...(style.text as any) }
    
    if (schemeColors.color) {
      textStyle.color = getColorFromPath(theme, schemeColors.color)
    }
    
    result.text = textStyle
  }
  
  // Copy other properties
  if (style.icon) result.icon = style.icon
  if (style.image) result.image = style.image
  
  return result
}

/**
 * Resolves color value from theme using dot notation path
 */
export const getColorFromPath = (theme: Theme, path: string): string => {
  const keys = path.split('.')
  let value: any = theme.colors
  
  for (const key of keys) {
    value = value?.[key]
    if (value === undefined) {
      return 'transparent'
    }
  }
  
  return typeof value === 'string' ? value : 'transparent'
}

/**
 * Creates a memoized style resolver function for components
 */
export const createStyleResolver = (theme: Theme) => {
  return useCallback(
    <T extends StyleValue>(
      style: ResponsiveStyleValue<T> | undefined,
      state: ComponentState = {}
    ): T | undefined => {
      const resolveResponsive = (value: ResponsiveValue<T>) => {
        // Use the same responsive resolution logic
        if (typeof value !== 'object' || value === null || Array.isArray(value)) {
          return value as T
        }
        
        const { width } = Dimensions.get('window')
        const responsiveValue = value as ResponsiveObject<T>
        
        const breakpointEntries = Object.entries(breakpoints)
          .sort(([, a], [, b]) => b - a)
        
        for (const [breakpoint, minWidth] of breakpointEntries) {
          if (width >= minWidth && responsiveValue[breakpoint as Breakpoint] !== undefined) {
            return responsiveValue[breakpoint as Breakpoint]!
          }
        }
        
        return responsiveValue.base as T
      }
      
      return resolveStyleWithState(style, state, resolveResponsive)
    },
    [theme]
  )
}

/**
 * Validates theme structure for development mode
 */
export const validateTheme = (theme: Theme): string[] => {
  const errors: string[] = []
  
  // Check required theme properties
  const requiredProperties = [
    'colors',
    'typography',
    'spacing',
    'borderRadius',
    'shadows',
    'zIndex',
    'breakpoints',
    'animations',
    'components',
    'config',
  ]
  
  for (const prop of requiredProperties) {
    if (!(prop in theme)) {
      errors.push(`Missing required theme property: ${prop}`)
    }
  }
  
  // Validate breakpoints are in ascending order
  const bpEntries = Object.entries(theme.breakpoints).sort(([, a], [, b]) => a - b)
  let lastValue = -1
  
  for (const [key, value] of bpEntries) {
    if (value <= lastValue && key !== 'base') {
      errors.push(`Breakpoint ${key} (${value}) should be greater than previous breakpoint (${lastValue})`)
    }
    lastValue = value
  }
  
  return errors
}

/**
 * Performance monitoring utilities for development
 */
export const getThemeCacheStats = () => {
  return {
    responsiveValues: themeCache.responsiveValues.size,
    resolvedStyles: themeCache.resolvedStyles.size,
    computedStyles: themeCache.computedStyles.size,
    totalCacheSize: 
      themeCache.responsiveValues.size + 
      themeCache.resolvedStyles.size + 
      themeCache.computedStyles.size,
  }
}

/**
 * Clears all theme caches (useful for testing or memory management)
 */
export const clearThemeCache = () => {
  themeCache.responsiveValues.clear()
  themeCache.resolvedStyles.clear()
  themeCache.computedStyles.clear()
}

/**
 * Creates a stable theme object reference for React optimization
 */
export const createStableTheme = (theme: Theme): Theme => {
  return useMemo(() => theme, [
    theme.colors,
    theme.typography,
    theme.spacing,
    theme.borderRadius,
    theme.shadows,
    theme.zIndex,
    theme.breakpoints,
    theme.animations,
    theme.components,
    theme.config,
  ])
}
