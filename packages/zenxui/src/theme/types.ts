/**
 * Enhanced Theme System Types
 * 
 * This module defines the complete type system for ZenUI's enhanced theming.
 * It provides type-safe, performant, and highly customizable theming capabilities.
 */

import type { ViewStyle, TextStyle, ImageStyle } from 'react-native'

// Base responsive system types
export type Breakpoint = 'base' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export interface ResponsiveObject<T> {
  base?: T
  sm?: T
  md?: T
  lg?: T
  xl?: T
  '2xl'?: T
}

export type ResponsiveValue<T> = T | ResponsiveObject<T>

// Color mode types
export type ColorMode = 'light' | 'dark'
export type ColorModePreference = ColorMode | 'system'

// Style types for different element types
export type StyleValue = ViewStyle | TextStyle | ImageStyle
export type ResponsiveStyleValue<T extends StyleValue = ViewStyle> = ResponsiveValue<T>

// Component state types for pseudo states
export interface ComponentState {
  readonly isHovered?: boolean
  readonly isPressed?: boolean
  readonly isFocused?: boolean
  readonly isDisabled?: boolean
  readonly isLoading?: boolean
  readonly isInvalid?: boolean
  readonly isReadOnly?: boolean
  readonly isSelected?: boolean
  readonly isActive?: boolean
  readonly isChecked?: boolean
}

// Pseudo state style definitions
export interface PseudoStates<T extends StyleValue = ViewStyle> {
  readonly _hover?: ResponsiveStyleValue<T>
  readonly _pressed?: ResponsiveStyleValue<T>
  readonly _focus?: ResponsiveStyleValue<T>
  readonly _disabled?: ResponsiveStyleValue<T>
  readonly _loading?: ResponsiveStyleValue<T>
  readonly _invalid?: ResponsiveStyleValue<T>
  readonly _readOnly?: ResponsiveStyleValue<T>
  readonly _selected?: ResponsiveStyleValue<T>
  readonly _active?: ResponsiveStyleValue<T>
  readonly _checked?: ResponsiveStyleValue<T>
  readonly _placeholder?: ResponsiveStyleValue<T>
}

// Style definition for component elements
export interface StyleDefinition {
  container?: ResponsiveStyleValue<ViewStyle> & PseudoStates<ViewStyle>
  text?: ResponsiveStyleValue<TextStyle> & PseudoStates<TextStyle>
  icon?: ResponsiveStyleValue<ViewStyle> & PseudoStates<ViewStyle>
  image?: ResponsiveStyleValue<ImageStyle> & PseudoStates<ImageStyle>
}

// Component theme structure
export interface ComponentTheme {
  baseStyle?: StyleDefinition
  variants?: Record<string, StyleDefinition>
  sizes?: Record<string, StyleDefinition>
  colorSchemes?: Record<string, StyleDefinition>
  defaultProps?: Record<string, unknown>
}

// Semantic color tokens for consistent theming
export interface SemanticColors {
  readonly background: {
    readonly default: string
    readonly subtle: string
    readonly muted: string
    readonly inverse: string
    readonly paper: string
    readonly overlay: string
  }
  readonly foreground: {
    readonly default: string
    readonly muted: string
    readonly subtle: string
    readonly inverse: string
    readonly placeholder: string
  }
  readonly border: {
    readonly default: string
    readonly muted: string
    readonly subtle: string
    readonly focus: string
    readonly error: string
    readonly success: string
    readonly warning: string
  }
  readonly destructive: {
    readonly default: string
    readonly foreground: string
    readonly subtle: string
    readonly muted: string
  }
  readonly muted: {
    readonly default: string
    readonly foreground: string
  }
  readonly accent: {
    readonly default: string
    readonly foreground: string
    readonly subtle: string
    readonly muted: string
  }
  readonly card: {
    readonly default: string
    readonly foreground: string
    readonly border: string
  }
  readonly popover: {
    readonly default: string
    readonly foreground: string
    readonly border: string
  }
}

// Typography scale
export interface Typography {
  readonly fontFamily: {
    readonly sans: string
    readonly serif: string
    readonly mono: string
  }
  readonly fontSize: Readonly<Record<string, number>>
  readonly fontWeight: Readonly<Record<string, string>>
  readonly lineHeight: Readonly<Record<string, number>>
  readonly letterSpacing: Readonly<Record<string, number>>
}

// Spacing scale
export interface Spacing {
  readonly [key: string]: number
  readonly [key: number]: number
}

// Border radius scale
export interface BorderRadius {
  readonly [key: string]: number
}

// Shadow definitions
export interface Shadow {
  readonly shadowColor: string
  readonly shadowOffset: { width: number; height: number }
  readonly shadowOpacity: number
  readonly shadowRadius: number
  readonly elevation: number
}

export interface Shadows {
  readonly [key: string]: Shadow
}

// Z-index scale
export interface ZIndex {
  readonly [key: string]: number | string
}

// Breakpoint definitions
export interface Breakpoints {
  readonly base: number
  readonly sm: number
  readonly md: number
  readonly lg: number
  readonly xl: number
  readonly '2xl': number
}

// Animation configuration
export interface Animations {
  readonly duration: Readonly<Record<string, number>>
  readonly easing: Readonly<Record<string, string>>
  readonly transition: Readonly<Record<string, string>>
}

// Theme configuration
export interface ThemeConfig {
  readonly initialColorMode: ColorModePreference
  readonly useSystemColorMode: boolean
  readonly cssVarPrefix: string
  readonly strictMode: boolean
  readonly disableAnimations: boolean
  readonly reducedMotion: 'always' | 'user' | 'never'
}

// Component themes registry
export interface ComponentThemes {
  readonly Button?: ComponentTheme
  readonly Input?: ComponentTheme
  readonly Card?: ComponentTheme
  readonly Text?: ComponentTheme
  readonly Box?: ComponentTheme
  readonly Modal?: ComponentTheme
  readonly Toast?: ComponentTheme
  readonly Avatar?: ComponentTheme
  readonly Badge?: ComponentTheme
  readonly Checkbox?: ComponentTheme
  readonly Radio?: ComponentTheme
  readonly Switch?: ComponentTheme
  readonly Spinner?: ComponentTheme
  readonly Stack?: ComponentTheme
  readonly [componentName: string]: ComponentTheme | undefined
}

// Main theme interface
export interface Theme {
  readonly colors: SemanticColors & Record<string, any>
  readonly typography: Typography
  readonly spacing: Spacing
  readonly borderRadius: BorderRadius
  readonly shadows: Shadows
  readonly zIndex: ZIndex
  readonly breakpoints: Breakpoints
  readonly animations: Animations
  readonly components: ComponentThemes
  readonly config: ThemeConfig
}

// Theme context type
export interface ThemeContextValue {
  readonly theme: Theme
  readonly colorMode: ColorMode
  readonly toggleColorMode: () => void
  readonly setColorMode: (mode: ColorMode) => void
  readonly resolveResponsiveValue: <T>(value: ResponsiveValue<T>) => T
}

// Theme customization types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export type CustomTheme = DeepPartial<Theme>

// Hook return types
export interface UseComponentThemeReturn {
  readonly resolvedStyles: StyleDefinition
  readonly getStyle: (element: keyof StyleDefinition, state?: ComponentState) => StyleValue
  readonly getResponsiveStyle: <T extends StyleValue>(
    style: ResponsiveStyleValue<T>,
    state?: ComponentState
  ) => T
}

// Style resolution options
export interface StyleResolutionOptions {
  readonly colorScheme?: string
  readonly variant?: string
  readonly size?: string
  readonly state?: ComponentState
  readonly customStyle?: StyleDefinition
}

// Performance optimization types
export interface ThemeCache {
  readonly responsiveValues: Map<string, any>
  readonly resolvedStyles: Map<string, StyleDefinition>
  readonly computedStyles: Map<string, StyleValue>
}

// Theme provider props
export interface ThemeProviderProps {
  readonly children: React.ReactNode
  readonly theme?: CustomTheme
  readonly config?: Partial<ThemeConfig>
  readonly colorMode?: ColorMode
  readonly onColorModeChange?: (colorMode: ColorMode) => void
}

// Export utility types
export type ThemeKey = keyof Theme
export type ComponentName = keyof ComponentThemes
export type VariantKey<T extends ComponentName> = ComponentThemes[T] extends ComponentTheme
  ? ComponentThemes[T]['variants'] extends Record<string, any>
    ? keyof ComponentThemes[T]['variants']
    : never
  : never

export type SizeKey<T extends ComponentName> = ComponentThemes[T] extends ComponentTheme
  ? ComponentThemes[T]['sizes'] extends Record<string, any>
    ? keyof ComponentThemes[T]['sizes']
    : never
  : never
