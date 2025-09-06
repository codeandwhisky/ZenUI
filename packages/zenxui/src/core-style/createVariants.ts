import type { ViewStyle, TextStyle } from 'react-native'
import { createStyle, type AllStyleProps } from './createStyle'

/**
 * Enhanced variant creation with better TypeScript inference
 */

export type VariantProps<T extends VariantConfig> = {
  [K in keyof T['variants']]?: T['variants'][K] extends Record<string, any> 
    ? keyof T['variants'][K] 
    : never
}

export interface VariantConfig {
  base?: AllStyleProps
  variants?: Record<string, Record<string, AllStyleProps>>
  compoundVariants?: Array<
    Record<string, string> & { style: AllStyleProps }
  >
  defaultVariants?: Record<string, string>
}

/**
 * Create type-safe variants with better inference
 */
export function createVariants<T extends VariantConfig>(config: T) {
  type Props = VariantProps<T>
  
  return {
    config,
    getStyle: (props: Props = {} as Props): ViewStyle & TextStyle => {
      let styleProps: AllStyleProps = { ...config.base }
      
      // Apply default variants first
      const finalProps = { ...config.defaultVariants, ...props }
      
      // Apply variant styles
      if (config.variants) {
        Object.entries(config.variants).forEach(([variantKey, variantOptions]) => {
          const selectedVariant = (finalProps as any)[variantKey]
          if (selectedVariant && (variantOptions as any)[selectedVariant]) {
            Object.assign(styleProps, (variantOptions as any)[selectedVariant])
          }
        })
      }
      
      // Apply compound variants
      if (config.compoundVariants) {
        config.compoundVariants.forEach((compound) => {
          const { style, ...conditions } = compound
          
          const matches = Object.entries(conditions).every(([key, value]) => {
            return (finalProps as any)[key] === value
          })
          
          if (matches) {
            Object.assign(styleProps, style)
          }
        })
      }
      
      return createStyle(styleProps)
    }
  }
}

/**
 * Example usage with better type inference:
 * 
 * const buttonVariants = createVariants({
 *   base: {
 *     px: 'md',
 *     py: 'sm',
 *     rounded: 'md',
 *   },
 *   variants: {
 *     variant: {
 *       solid: { bg: 'primary.500', color: 'white' },
 *       outline: { borderWidth: 1, borderColor: 'primary.500' },
 *       ghost: { bg: 'transparent' },
 *     },
 *     size: {
 *       sm: { px: 'sm', py: 'xs', textSize: 'sm' },
 *       md: { px: 'md', py: 'sm', textSize: 'md' },
 *       lg: { px: 'lg', py: 'md', textSize: 'lg' },
 *     },
 *   },
 *   compoundVariants: [
 *     {
 *       variant: 'outline',
 *       size: 'sm',
 *       style: { borderWidth: 2 }
 *     }
 *   ],
 *   defaultVariants: {
 *     variant: 'solid',
 *     size: 'md',
 *   }
 * })
 * 
 * // Usage:
 * const style = buttonVariants.getStyle({ variant: 'outline', size: 'lg' })
 */

/**
 * Create component with variants
 */
export function createComponent<T extends VariantConfig>(
  name: string,
  variants: T
) {
  const { getStyle } = createVariants(variants)
  
  return {
    displayName: name,
    variants,
    getStyle,
  }
}

/**
 * Slot-based component creation
 */
export interface SlotConfig {
  [slotName: string]: AllStyleProps
}

export function createSlots<T extends SlotConfig>(slots: T) {
  const slotStyles: Record<keyof T, ViewStyle & TextStyle> = {} as any
  
  Object.entries(slots).forEach(([slotName, styleProps]) => {
    slotStyles[slotName as keyof T] = createStyle(styleProps)
  })
  
  return slotStyles
}

/**
 * Compound component pattern
 */
export interface CompoundComponentConfig<T extends VariantConfig> {
  Root: T
  slots?: Record<string, AllStyleProps>
}

export function createCompoundComponent<T extends CompoundComponentConfig<any>>(
  name: string,
  config: T
) {
  const rootVariants = createVariants(config.Root)
  const slotStyles = config.slots ? createSlots(config.slots) : {}
  
  return {
    displayName: name,
    Root: rootVariants,
    slots: slotStyles,
  }
}

/**
 * Helper to extract variant prop types
 */
export type ExtractVariantProps<T> = T extends { config: infer C }
  ? C extends VariantConfig
    ? VariantProps<C>
    : never
  : never

/**
 * CSS-in-JS style creator for web
 */
export function createCSSInJS(styles: AllStyleProps): string {
  // This would generate CSS classes for web
  // Simplified implementation for now
  const cssProperties: string[] = []
  
  Object.entries(styles).forEach(([key, value]) => {
    if (typeof value === 'number' || typeof value === 'string') {
      // Convert camelCase to kebab-case
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase()
      cssProperties.push(`${cssKey}: ${value}`)
    }
  })
  
  return cssProperties.join('; ')
}

/**
 * Performance-optimized variant cache
 */
const variantCache = new Map<string, ViewStyle & TextStyle>()

export function getCachedVariantStyle<T extends VariantConfig>(
  variants: T,
  props: VariantProps<T>
): ViewStyle & TextStyle {
  const cacheKey = JSON.stringify({ variants: variants.variants, props })
  
  if (variantCache.has(cacheKey)) {
    return variantCache.get(cacheKey)!
  }
  
  const { getStyle } = createVariants(variants)
  const style = getStyle(props)
  
  variantCache.set(cacheKey, style)
  return style
}