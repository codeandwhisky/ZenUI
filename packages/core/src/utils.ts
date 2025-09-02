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
    // Padding: p-4, px-4, py-2, pt-1 etc. Also support named spacing: p-xs, p-sm, p-md, p-lg, p-xl, p-2xl
    const pMatch = cls.match(/^p(?:([trblxy])?)-([a-z0-9]+)$/)
    if (pMatch) {
      const dir = pMatch[1]
      const raw = pMatch[2]
      const valNum = /^[0-9]+$/.test(raw) ? parseInt(raw, 10) : undefined
      const size = valNum !== undefined ? (tokenSpacing as any)[valNum] ?? valNum * 4 : (tokenSpacing as any)[raw]
      if (!dir) styles.padding = size
      if (dir === 'x') { styles.paddingHorizontal = size }
      if (dir === 'y') { styles.paddingVertical = size }
      if (dir === 't') { styles.paddingTop = size }
      if (dir === 'r') { styles.paddingRight = size }
      if (dir === 'b') { styles.paddingBottom = size }
      if (dir === 'l') { styles.paddingLeft = size }
    }

    // Margin: m-4, mx-2 etc. Also support named spacing: m-xs, m-sm, m-md, m-lg, m-xl, m-2xl
    const mMatch = cls.match(/^m(?:([trblxy])?)-([a-z0-9]+)$/)
    if (mMatch) {
      const dir = mMatch[1]
      const raw = mMatch[2]
      const valNum = /^[0-9]+$/.test(raw) ? parseInt(raw, 10) : undefined
      const size = valNum !== undefined ? (tokenSpacing as any)[valNum] ?? valNum * 4 : (tokenSpacing as any)[raw]
      if (!dir) styles.margin = size
      if (dir === 'x') { styles.marginHorizontal = size }
      if (dir === 'y') { styles.marginVertical = size }
      if (dir === 't') { styles.marginTop = size }
      if (dir === 'r') { styles.marginRight = size }
      if (dir === 'b') { styles.marginBottom = size }
      if (dir === 'l') { styles.marginLeft = size }
    }

    // Background color: support bg-primary-500, bg-primary, and flattened bg-primary500
    const bgMatch = cls.match(/^bg-([a-zA-Z0-9]+)(?:-(\d+))?$/)
    const bgFlatMatch = cls.match(/^bg-([a-zA-Z]+)([0-9]{2,3})$/)
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
    } else if (bgFlatMatch) {
      const key = bgFlatMatch[1]
      const shade = bgFlatMatch[2]
      const flatKey = `${key}${shade}`
      if ((tokenColors as any)[flatKey]) styles.backgroundColor = (tokenColors as any)[flatKey]
    }

    // Text color: support text-primary-500, text-primary, and flattened text-primary500
    const textMatch = cls.match(/^text-([a-zA-Z0-9]+)(?:-(\d+))?$/)
    const textFlatMatch = cls.match(/^text-([a-zA-Z]+)([0-9]{2,3})$/)
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
    } else if (textFlatMatch) {
      const key = textFlatMatch[1]
      const shade = textFlatMatch[2]
      const flatKey = `${key}${shade}`
      if ((tokenColors as any)[flatKey]) styles.color = (tokenColors as any)[flatKey]
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

    // width/height shortcuts: support numeric and named spacing keys: w-32, w-sm, w-md
    const wMatch = cls.match(/^w-([a-z0-9]+)$/)
    if (wMatch) {
      const raw = wMatch[1]
      const vNum = /^[0-9]+$/.test(raw) ? parseInt(raw, 10) : undefined
      styles.width = vNum !== undefined ? (tokenSpacing as any)[vNum] ?? vNum : (tokenSpacing as any)[raw] ?? raw
    }
    const hMatch = cls.match(/^h-([a-z0-9]+)$/)
    if (hMatch) {
      const raw = hMatch[1]
      const vNum = /^[0-9]+$/.test(raw) ? parseInt(raw, 10) : undefined
      styles.height = vNum !== undefined ? (tokenSpacing as any)[vNum] ?? vNum : (tokenSpacing as any)[raw] ?? raw
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
    const borderFlatMatch = cls.match(/^border-([a-zA-Z]+)([0-9]{2,3})$/)
    if (borderColorMatch) {
      const key = borderColorMatch[1]
      const shade = borderColorMatch[2]
      const colorGroup = (tokenColors as any)[key]
      if (shade && colorGroup && (colorGroup as any)[shade]) styles.borderColor = (colorGroup as any)[shade]
      else if (colorGroup) styles.borderColor = (colorGroup as any)[500] ?? (colorGroup as any)[Object.keys(colorGroup)[0]]
    } else if (borderFlatMatch) {
      const key = borderFlatMatch[1]
      const shade = borderFlatMatch[2]
      const flatKey = `${key}${shade}`
      if ((tokenColors as any)[flatKey]) styles.borderColor = (tokenColors as any)[flatKey]
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
    const gapMatch = cls.match(/^gap-([a-z0-9]+)$/)
    if (gapMatch) {
      const raw = gapMatch[1]
      const vNum = /^[0-9]+$/.test(raw) ? parseInt(raw, 10) : undefined
      styles.gap = vNum !== undefined ? (tokenSpacing as any)[vNum] ?? vNum : (tokenSpacing as any)[raw]
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