import { clsx } from 'clsx'
import { colors as tokenColors, spacing as tokenSpacing, fontSize as tokenFontSize, borderRadius as tokenRadius, shadows as tokenShadows } from './tokens'

export type ClassValue = string | number | boolean | undefined | null | { [key: string]: any } | ClassValue[]

/**
 * Utility function to conditionally join classNames together
 * Based on clsx with additional React Native compatibility
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs)
}

/**
 * Get responsive value based on breakpoint
 */
export function getResponsiveValue<T>(
  value: T | { base?: T; sm?: T; md?: T; lg?: T; xl?: T },
  breakpoint: 'base' | 'sm' | 'md' | 'lg' | 'xl' = 'base'
): T | undefined {
  if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
    const responsiveValue = value as { base?: T; sm?: T; md?: T; lg?: T; xl?: T }
    return responsiveValue[breakpoint] || responsiveValue.base
  }
  return value as T
}

/**
 * Convert pixel values to appropriate units for React Native
 */
export function px(value: number): number {
  return value
}

/**
 * Convert rem values to pixel values for React Native
 */
export function rem(value: number): number {
  return value * 16 // 1rem = 16px by default
}

/**
 * Create a style object from className-like utilities
 * Supports a small subset of Tailwind-like utilities mapped to tokens.
 */
export function createStyleObject(className: string) {
  const styles: { [key: string]: any } = {}
  const classes = className.split(/\s+/).filter(Boolean)

  classes.forEach(cls => {
    // Padding: p-4, px-4, py-2, pt-1 etc.
    const pMatch = cls.match(/^p(?:([trblxy])?)-(\d+)$/)
    if (pMatch) {
      const dir = pMatch[1]
      const val = parseInt(pMatch[2], 10)
  const size = (tokenSpacing as any)[val] ?? val * 4
      if (!dir) styles.padding = size
      if (dir === 'x') { styles.paddingHorizontal = size }
      if (dir === 'y') { styles.paddingVertical = size }
      if (dir === 't') { styles.paddingTop = size }
      if (dir === 'r') { styles.paddingRight = size }
      if (dir === 'b') { styles.paddingBottom = size }
      if (dir === 'l') { styles.paddingLeft = size }
    }

    // Margin: m-4, mx-2 etc.
    const mMatch = cls.match(/^m(?:([trblxy])?)-(\d+)$/)
    if (mMatch) {
      const dir = mMatch[1]
      const val = parseInt(mMatch[2], 10)
  const size = (tokenSpacing as any)[val] ?? val * 4
      if (!dir) styles.margin = size
      if (dir === 'x') { styles.marginHorizontal = size }
      if (dir === 'y') { styles.marginVertical = size }
      if (dir === 't') { styles.marginTop = size }
      if (dir === 'r') { styles.marginRight = size }
      if (dir === 'b') { styles.marginBottom = size }
      if (dir === 'l') { styles.marginLeft = size }
    }

    // Background color: bg-primary-500 or bg-primary
    const bgMatch = cls.match(/^bg-([a-zA-Z0-9]+)(?:-(\d+))?$/)
    if (bgMatch) {
      const key = bgMatch[1]
      const shade = bgMatch[2]
      const colorGroup = (tokenColors as any)[key]
      if (shade && colorGroup && (colorGroup as any)[shade]) {
        styles.backgroundColor = (colorGroup as any)[shade]
      } else if (colorGroup) {
        // if no shade specified, prefer 500
        styles.backgroundColor = (colorGroup as any)[500] ?? (colorGroup as any)[Object.keys(colorGroup)[0]]
      }
    }

    // Text color: text-primary-500
    const textMatch = cls.match(/^text-([a-zA-Z0-9]+)(?:-(\d+))?$/)
    if (textMatch) {
      const key = textMatch[1]
      const shade = textMatch[2]
      const textColorGroup = (tokenColors as any)[key]
      if (shade && textColorGroup && (textColorGroup as any)[shade]) {
        styles.color = (textColorGroup as any)[shade]
      } else if (textColorGroup) {
        styles.color = (textColorGroup as any)[500] ?? (textColorGroup as any)[Object.keys(textColorGroup)[0]]
      }
      // text size shorthand: text-lg, text-sm mapped to tokenFontSize
      if ((tokenFontSize as any)[key]) {
        styles.fontSize = (tokenFontSize as any)[key]
      }
    }

    // font size: text-lg etc. (single token)
    const sizeMatch = cls.match(/^text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl)$/)
    if (sizeMatch) {
      const s = sizeMatch[1]
  styles.fontSize = (tokenFontSize as any)[s]
    }

    // rounded, rounded-sm, rounded-full
    const rMatch = cls.match(/^rounded(?:-(sm|md|lg|xl|2xl|3xl|full))?$/)
    if (rMatch) {
      const size = rMatch[1]
      if (!size) styles.borderRadius = tokenRadius.base
      else if (size === 'sm') styles.borderRadius = tokenRadius.sm
      else if (size === 'md') styles.borderRadius = tokenRadius.md
      else if (size === 'lg') styles.borderRadius = tokenRadius.lg
      else if (size === 'xl') styles.borderRadius = tokenRadius.xl
      else if (size === '2xl') styles.borderRadius = tokenRadius['2xl']
      else if (size === '3xl') styles.borderRadius = tokenRadius['3xl']
      else if (size === 'full') styles.borderRadius = tokenRadius.full
    }

    // shadow-sm, shadow-md, shadow-lg -> map to tokens
    const shadowMatch = cls.match(/^shadow(?:-(sm|base|md|lg|xl|2xl))?$/)
    if (shadowMatch) {
      const s = shadowMatch[1] || 'base'
  const shadowToken = (tokenShadows as any)[s]
      if (shadowToken) {
        Object.assign(styles, shadowToken)
      }
    }

    // width/height shortcuts: w-32 h-8 -> map to spacing or numbers
    const wMatch = cls.match(/^w-(\d+)$/)
    if (wMatch) {
      const v = parseInt(wMatch[1], 10)
      styles.width = (tokenSpacing as any)[v] ?? v
    }
    const hMatch = cls.match(/^h-(\d+)$/)
    if (hMatch) {
      const v = parseInt(hMatch[1], 10)
      styles.height = (tokenSpacing as any)[v] ?? v
    }

    // flex, flex-row, items-center, justify-center
    if (cls === 'flex') styles.display = 'flex'
    if (cls === 'flex-row') styles.flexDirection = 'row'
    if (cls === 'flex-col' || cls === 'flex-column') styles.flexDirection = 'column'
    if (cls === 'items-center') styles.alignItems = 'center'
    if (cls === 'justify-center') styles.justifyContent = 'center'
    if (cls === 'self-center') styles.alignSelf = 'center'

    // justify-*, items-* variants
    if (cls === 'justify-start') styles.justifyContent = 'flex-start'
    if (cls === 'justify-end') styles.justifyContent = 'flex-end'
    if (cls === 'justify-between') styles.justifyContent = 'space-between'
    if (cls === 'justify-around') styles.justifyContent = 'space-around'
    if (cls === 'items-start') styles.alignItems = 'flex-start'
    if (cls === 'items-end') styles.alignItems = 'flex-end'

    // border and border color
    if (cls === 'border') styles.borderWidth = 1
    const borderColorMatch = cls.match(/^border-([a-zA-Z0-9]+)(?:-(\d+))?$/)
    if (borderColorMatch) {
      const key = borderColorMatch[1]
      const shade = borderColorMatch[2]
      const colorGroup = (tokenColors as any)[key]
      if (shade && colorGroup && (colorGroup as any)[shade]) styles.borderColor = (colorGroup as any)[shade]
      else if (colorGroup) styles.borderColor = (colorGroup as any)[500] ?? (colorGroup as any)[Object.keys(colorGroup)[0]]
    }

    // text alignment
    if (cls === 'text-center') styles.textAlign = 'center'
    if (cls === 'text-left') styles.textAlign = 'left'
    if (cls === 'text-right') styles.textAlign = 'right'

    // font weight: font-medium, font-bold
    if (cls === 'font-thin') styles.fontWeight = '100'
    if (cls === 'font-light') styles.fontWeight = '300'
    if (cls === 'font-normal') styles.fontWeight = '400'
    if (cls === 'font-medium') styles.fontWeight = '500'
    if (cls === 'font-semibold') styles.fontWeight = '600'
    if (cls === 'font-bold') styles.fontWeight = '700'

    // gap (for Stack/row simulation - adds margin to children container usage)
    const gapMatch = cls.match(/^gap-(\d+)$/)
    if (gapMatch) {
      const v = parseInt(gapMatch[1], 10)
      styles.gap = (tokenSpacing as any)[v] ?? v
    }

    // full width / full height
    if (cls === 'w-full') styles.width = '100%'
    if (cls === 'h-full') styles.height = '100%'

    // text transform
    if (cls === 'uppercase') styles.textTransform = 'uppercase'
    if (cls === 'lowercase') styles.textTransform = 'lowercase'
    if (cls === 'capitalize') styles.textTransform = 'capitalize'

    // opacity
    const opMatch = cls.match(/^opacity-(\d+)$/)
    if (opMatch) {
      const v = parseInt(opMatch[1], 10)
      styles.opacity = v / 100
    }
  })

  return styles
}