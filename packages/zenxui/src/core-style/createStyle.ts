import type { ViewStyle, TextStyle, ImageStyle } from 'react-native'
import { tokens } from '../tokens'

/**
 * Core style mapper for minimal, type-safe styling
 * Maps a restricted set of props to RN/Web style objects
 */

// Define allowed style props
export interface StyleProps {
  // Layout
  display?: ViewStyle['display']
  position?: ViewStyle['position']
  top?: number | string
  right?: number | string
  bottom?: number | string
  left?: number | string
  zIndex?: ViewStyle['zIndex']
  
  // Flexbox
  flex?: ViewStyle['flex']
  flexDirection?: ViewStyle['flexDirection']
  flexWrap?: ViewStyle['flexWrap']
  alignItems?: ViewStyle['alignItems']
  alignContent?: ViewStyle['alignContent']
  alignSelf?: ViewStyle['alignSelf']
  justifyContent?: ViewStyle['justifyContent']
  
  // Dimensions
  width?: ViewStyle['width']
  height?: ViewStyle['height']
  minWidth?: ViewStyle['minWidth']
  minHeight?: ViewStyle['minHeight']
  maxWidth?: ViewStyle['maxWidth']
  maxHeight?: ViewStyle['maxHeight']
  
  // Spacing
  margin?: number | string
  marginTop?: number | string
  marginRight?: number | string
  marginBottom?: number | string
  marginLeft?: number | string
  marginHorizontal?: number | string
  marginVertical?: number | string
  
  padding?: number | string
  paddingTop?: number | string
  paddingRight?: number | string
  paddingBottom?: number | string
  paddingLeft?: number | string
  paddingHorizontal?: number | string
  paddingVertical?: number | string
  
  // Border
  borderWidth?: ViewStyle['borderWidth']
  borderTopWidth?: ViewStyle['borderTopWidth']
  borderRightWidth?: ViewStyle['borderRightWidth']
  borderBottomWidth?: ViewStyle['borderBottomWidth']
  borderLeftWidth?: ViewStyle['borderLeftWidth']
  
  borderRadius?: ViewStyle['borderRadius']
  borderTopLeftRadius?: ViewStyle['borderTopLeftRadius']
  borderTopRightRadius?: ViewStyle['borderTopRightRadius']
  borderBottomLeftRadius?: ViewStyle['borderBottomLeftRadius']
  borderBottomRightRadius?: ViewStyle['borderBottomRightRadius']
  
  borderColor?: ViewStyle['borderColor']
  borderTopColor?: ViewStyle['borderTopColor']
  borderRightColor?: ViewStyle['borderRightColor']
  borderBottomColor?: ViewStyle['borderBottomColor']
  borderLeftColor?: ViewStyle['borderLeftColor']
  
  borderStyle?: ViewStyle['borderStyle']
  
  // Background
  backgroundColor?: ViewStyle['backgroundColor']
  
  // Typography (for Text components)
  color?: TextStyle['color']
  fontSize?: TextStyle['fontSize']
  fontWeight?: TextStyle['fontWeight']
  fontFamily?: TextStyle['fontFamily']
  fontStyle?: TextStyle['fontStyle']
  lineHeight?: TextStyle['lineHeight']
  letterSpacing?: TextStyle['letterSpacing']
  textAlign?: TextStyle['textAlign']
  textTransform?: TextStyle['textTransform']
  textDecorationLine?: TextStyle['textDecorationLine']
  
  // Shadow
  shadowColor?: ViewStyle['shadowColor']
  shadowOffset?: ViewStyle['shadowOffset']
  shadowOpacity?: ViewStyle['shadowOpacity']
  shadowRadius?: ViewStyle['shadowRadius']
  elevation?: ViewStyle['elevation']
  
  // Transform
  transform?: ViewStyle['transform']
  
  // Opacity
  opacity?: ViewStyle['opacity']
  
  // Overflow
  overflow?: ViewStyle['overflow']
}

// Token-aware style props
export interface TokenStyleProps {
  // Token-based spacing
  m?: keyof typeof tokens.spacing
  mt?: keyof typeof tokens.spacing
  mr?: keyof typeof tokens.spacing
  mb?: keyof typeof tokens.spacing
  ml?: keyof typeof tokens.spacing
  mx?: keyof typeof tokens.spacing
  my?: keyof typeof tokens.spacing
  
  p?: keyof typeof tokens.spacing
  pt?: keyof typeof tokens.spacing
  pr?: keyof typeof tokens.spacing
  pb?: keyof typeof tokens.spacing
  pl?: keyof typeof tokens.spacing
  px?: keyof typeof tokens.spacing
  py?: keyof typeof tokens.spacing
  
  // Token-based colors
  bg?: string // Can be token path like 'primary.500' or direct color
  
  // Token-based border radius
  rounded?: keyof typeof tokens.radii
  roundedTop?: keyof typeof tokens.radii
  roundedBottom?: keyof typeof tokens.radii
  roundedLeft?: keyof typeof tokens.radii
  roundedRight?: keyof typeof tokens.radii
  
  // Token-based font sizes
  textSize?: keyof typeof tokens.fontSizes
}

export type AllStyleProps = StyleProps & TokenStyleProps

/**
 * Create style object from style props
 */
export function createStyle(props: AllStyleProps): ViewStyle & TextStyle {
  const style: any = {}
  
  // Direct style props (pass through)
  Object.keys(props).forEach((key) => {
    const value = (props as any)[key]
    
    // Handle token-based props
    switch (key) {
      // Margin tokens
      case 'm':
        style.margin = tokens.spacing[value as keyof typeof tokens.spacing]
        break
      case 'mt':
        style.marginTop = tokens.spacing[value as keyof typeof tokens.spacing]
        break
      case 'mr':
        style.marginRight = tokens.spacing[value as keyof typeof tokens.spacing]
        break
      case 'mb':
        style.marginBottom = tokens.spacing[value as keyof typeof tokens.spacing]
        break
      case 'ml':
        style.marginLeft = tokens.spacing[value as keyof typeof tokens.spacing]
        break
      case 'mx':
        style.marginHorizontal = tokens.spacing[value as keyof typeof tokens.spacing]
        break
      case 'my':
        style.marginVertical = tokens.spacing[value as keyof typeof tokens.spacing]
        break
        
      // Padding tokens
      case 'p':
        style.padding = tokens.spacing[value as keyof typeof tokens.spacing]
        break
      case 'pt':
        style.paddingTop = tokens.spacing[value as keyof typeof tokens.spacing]
        break
      case 'pr':
        style.paddingRight = tokens.spacing[value as keyof typeof tokens.spacing]
        break
      case 'pb':
        style.paddingBottom = tokens.spacing[value as keyof typeof tokens.spacing]
        break
      case 'pl':
        style.paddingLeft = tokens.spacing[value as keyof typeof tokens.spacing]
        break
      case 'px':
        style.paddingHorizontal = tokens.spacing[value as keyof typeof tokens.spacing]
        break
      case 'py':
        style.paddingVertical = tokens.spacing[value as keyof typeof tokens.spacing]
        break
        
      // Background color
      case 'bg':
        style.backgroundColor = resolveColorToken(value)
        break
        
      // Border radius
      case 'rounded':
        style.borderRadius = tokens.radii[value as keyof typeof tokens.radii]
        break
      case 'roundedTop':
        const topRadius = tokens.radii[value as keyof typeof tokens.radii]
        style.borderTopLeftRadius = topRadius
        style.borderTopRightRadius = topRadius
        break
      case 'roundedBottom':
        const bottomRadius = tokens.radii[value as keyof typeof tokens.radii]
        style.borderBottomLeftRadius = bottomRadius
        style.borderBottomRightRadius = bottomRadius
        break
      case 'roundedLeft':
        const leftRadius = tokens.radii[value as keyof typeof tokens.radii]
        style.borderTopLeftRadius = leftRadius
        style.borderBottomLeftRadius = leftRadius
        break
      case 'roundedRight':
        const rightRadius = tokens.radii[value as keyof typeof tokens.radii]
        style.borderTopRightRadius = rightRadius
        style.borderBottomRightRadius = rightRadius
        break
        
      // Font size
      case 'textSize':
        style.fontSize = tokens.fontSizes[value as keyof typeof tokens.fontSizes]
        break
        
      // Direct props (pass through)
      default:
        if (key in props && !(key.startsWith('m') || key.startsWith('p') || 
                             key === 'bg' || key.startsWith('rounded') || 
                             key === 'textSize')) {
          style[key] = value
        }
        break
    }
  })
  
  return style
}

/**
 * Resolve color token to actual color value
 */
function resolveColorToken(colorToken: string): string {
  // Handle direct color values (hex, rgb, etc.)
  if (colorToken.startsWith('#') || colorToken.startsWith('rgb') || 
      colorToken.startsWith('hsl') || colorToken === 'transparent') {
    return colorToken
  }
  
  // Handle token paths like 'primary.500' or flattened tokens like 'primary500'
  if (colorToken.includes('.')) {
    const [colorGroup, shade] = colorToken.split('.')
    const group = (tokens.colors as any)[colorGroup]
    return group?.[shade] || colorToken
  } else {
    // Try flattened token first, then direct token
    return (tokens.colors as any)[colorToken] || colorToken
  }
}

/**
 * Type-safe variant creation system
 */
export interface VariantConfig<V extends Record<string, any>> {
  base?: AllStyleProps
  variants?: {
    [K in keyof V]?: {
      [VK in keyof V[K]]?: AllStyleProps
    }
  }
  compoundVariants?: Array<{
    [K in keyof V]?: V[K][keyof V[K]]
  } & {
    style: AllStyleProps
  }>
  defaultVariants?: {
    [K in keyof V]?: V[K][keyof V[K]]
  }
}

export function createVariants<V extends Record<string, any>>(
  config: VariantConfig<V>
) {
  return function getVariantStyle(props: {
    [K in keyof V]?: V[K][keyof V[K]]
  }): ViewStyle & TextStyle {
    let style: AllStyleProps = { ...config.base }
    
    // Apply variant styles
    if (config.variants) {
      Object.keys(config.variants).forEach((variantKey) => {
        const variantValue = props[variantKey as keyof V]
        const variantGroup = config.variants![variantKey as keyof V]
        
        if (variantValue && variantGroup && variantGroup[variantValue]) {
          Object.assign(style, variantGroup[variantValue])
        }
      })
    }
    
    // Apply compound variants
    if (config.compoundVariants) {
      config.compoundVariants.forEach((compoundVariant) => {
        const { style: compoundStyle, ...conditions } = compoundVariant
        
        const matches = Object.keys(conditions).every((key) => {
          return (props as any)[key] === (conditions as any)[key]
        })
        
        if (matches) {
          Object.assign(style, compoundStyle)
        }
      })
    }
    
    return createStyle(style)
  }
}

/**
 * Responsive value support
 */
export interface ResponsiveValue<T> {
  base?: T
  sm?: T
  md?: T
  lg?: T
  xl?: T
  '2xl'?: T
}

export function isResponsiveValue<T>(value: any): value is ResponsiveValue<T> {
  return value && typeof value === 'object' && ('base' in value || 'sm' in value || 'md' in value || 'lg' in value || 'xl' in value || '2xl' in value)
}

export function resolveResponsiveValue<T>(
  value: T | ResponsiveValue<T>,
  breakpoint: 'base' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' = 'base'
): T {
  if (!isResponsiveValue(value)) {
    return value as T
  }
  
  // Find the appropriate value for the breakpoint
  const breakpointOrder = ['base', 'sm', 'md', 'lg', 'xl', '2xl']
  const currentIndex = breakpointOrder.indexOf(breakpoint)
  
  // Look for value at current breakpoint or fall back to smaller breakpoints
  for (let i = currentIndex; i >= 0; i--) {
    const bp = breakpointOrder[i] as keyof ResponsiveValue<T>
    if (value[bp] !== undefined) {
      return value[bp] as T
    }
  }
  
  // If no match found, return base or first available value
  return (value.base ?? Object.values(value)[0]) as T
}