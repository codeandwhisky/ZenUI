/**
 * Default Theme Configuration
 * 
 * This module provides the default theme configuration with semantic colors,
 * typography scales, and comprehensive design tokens optimized for both
 * performance and visual consistency.
 */

import type {
  Theme,
  SemanticColors,
  Typography,
  Spacing,
  BorderRadius,
  Shadows,
  ZIndex,
  Breakpoints,
  Animations,
  ThemeConfig,
  ColorMode,
} from './types'
import { colors as baseColors } from '../tokens'

// Breakpoint definitions for responsive design
export const breakpoints: Breakpoints = {
  base: 0,
  sm: 480,
  md: 768,
  lg: 992,
  xl: 1200,
  '2xl': 1536,
} as const

// Typography scale with optimal reading experience
export const typography: Typography = {
  fontFamily: {
    sans: 'System',
    serif: 'Georgia',
    mono: 'Menlo',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
    '6xl': 60,
    '7xl': 72,
    '8xl': 96,
    '9xl': 128,
  },
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
  letterSpacing: {
    tighter: -0.05,
    tight: -0.025,
    normal: 0,
    wide: 0.025,
    wider: 0.05,
    widest: 0.1,
  },
} as const

// Spacing scale using 4px base unit for consistency
export const spacing: Spacing = {
  0: 0,
  0.5: 2,
  1: 4,
  1.5: 6,
  2: 8,
  2.5: 10,
  3: 12,
  3.5: 14,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  11: 44,
  12: 48,
  14: 56,
  16: 64,
  20: 80,
  24: 96,
  28: 112,
  32: 128,
  36: 144,
  40: 160,
  44: 176,
  48: 192,
  52: 208,
  56: 224,
  60: 240,
  64: 256,
  72: 288,
  80: 320,
  96: 384,
  // Named aliases for common use cases
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
} as const

// Border radius scale for consistent rounded corners
export const borderRadius: BorderRadius = {
  none: 0,
  xs: 2,
  sm: 4,
  base: 6,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  '3xl': 24,
  full: 9999,
} as const

// Shadow definitions optimized for cross-platform consistency
export const shadows: Shadows = {
  xs: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  sm: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  base: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  md: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },
  lg: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 10,
  },
  xl: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.2,
    shadowRadius: 25,
    elevation: 15,
  },
  '2xl': {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 25 },
    shadowOpacity: 0.25,
    shadowRadius: 50,
    elevation: 20,
  },
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
} as const

// Z-index scale for consistent layering
export const zIndex: ZIndex = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
} as const

// Animation configuration for smooth interactions
export const animations: Animations = {
  duration: {
    fastest: 100,
    faster: 150,
    fast: 200,
    normal: 250,
    slow: 300,
    slower: 400,
    slowest: 500,
  },
  easing: {
    linear: 'linear',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    smooth: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
  },
  transition: {
    all: 'all',
    colors: 'background-color, border-color, color, fill, stroke',
    opacity: 'opacity',
    shadow: 'box-shadow',
    transform: 'transform',
  },
} as const

// Default theme configuration
export const defaultConfig: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
  cssVarPrefix: 'zenui',
  strictMode: false,
  disableAnimations: false,
  reducedMotion: 'user',
} as const

/**
 * Generates semantic colors for light and dark modes
 * Optimized for accessibility and visual hierarchy
 */
export const generateSemanticColors = (colorMode: ColorMode): SemanticColors => {
  const isLight = colorMode === 'light'
  
  return {
    background: {
      default: isLight ? baseColors.white : baseColors.gray[900],
      subtle: isLight ? baseColors.gray[50] : baseColors.gray[800],
      muted: isLight ? baseColors.gray[100] : baseColors.gray[700],
      inverse: isLight ? baseColors.gray[900] : baseColors.white,
      paper: isLight ? baseColors.white : baseColors.gray[800],
      overlay: isLight ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.7)',
    },
    foreground: {
      default: isLight ? baseColors.gray[900] : baseColors.white,
      muted: isLight ? baseColors.gray[700] : baseColors.gray[300],
      subtle: isLight ? baseColors.gray[500] : baseColors.gray[400],
      inverse: isLight ? baseColors.white : baseColors.gray[900],
      placeholder: isLight ? baseColors.gray[400] : baseColors.gray[500],
    },
    border: {
      default: isLight ? baseColors.gray[200] : baseColors.gray[700],
      muted: isLight ? baseColors.gray[100] : baseColors.gray[800],
      subtle: isLight ? baseColors.gray[50] : baseColors.gray[800],
      focus: baseColors.primary[500],
      error: baseColors.error[500],
      success: baseColors.success[500],
      warning: baseColors.warning[500],
    },
    destructive: {
      default: baseColors.error[500],
      foreground: baseColors.white,
      subtle: isLight ? baseColors.error[50] : baseColors.error[900],
      muted: isLight ? baseColors.error[100] : baseColors.error[800],
    },
    muted: {
      default: isLight ? baseColors.gray[100] : baseColors.gray[800],
      foreground: isLight ? baseColors.gray[600] : baseColors.gray[400],
    },
    accent: {
      default: baseColors.primary[500],
      foreground: baseColors.white,
      subtle: isLight ? baseColors.primary[50] : baseColors.primary[900],
      muted: isLight ? baseColors.primary[100] : baseColors.primary[800],
    },
    card: {
      default: isLight ? baseColors.white : baseColors.gray[800],
      foreground: isLight ? baseColors.gray[900] : baseColors.white,
      border: isLight ? baseColors.gray[200] : baseColors.gray[700],
    },
    popover: {
      default: isLight ? baseColors.white : baseColors.gray[800],
      foreground: isLight ? baseColors.gray[900] : baseColors.white,
      border: isLight ? baseColors.gray[200] : baseColors.gray[600],
    },
  } as const
}

/**
 * Creates the default theme with semantic colors for the given color mode
 */
export const createDefaultTheme = (colorMode: ColorMode = 'light'): Theme => {
  const semanticColors = generateSemanticColors(colorMode)
  
  return {
    colors: {
      ...baseColors,
      ...semanticColors,
    },
    typography,
    spacing,
    borderRadius,
    shadows,
    zIndex,
    breakpoints,
    animations,
    components: {}, // Will be populated by component themes
    config: defaultConfig,
  }
}

/**
 * Utility function to get color value with fallback
 */
export const getColorValue = (
  theme: Theme,
  colorPath: string,
  fallback = 'transparent'
): string => {
  try {
    const keys = colorPath.split('.')
    let value: any = theme.colors
    
    for (const key of keys) {
      value = value?.[key]
      if (value === undefined) {
        return fallback
      }
    }
    
    return typeof value === 'string' ? value : fallback
  } catch {
    return fallback
  }
}
