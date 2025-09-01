import { clsx } from 'clsx'

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
 */
export function createStyleObject(className: string) {
  // This is a simplified implementation
  // In a full implementation, this would parse Tailwind-like classes
  const styles: { [key: string]: any } = {}
  
  const classes = className.split(' ')
  
  classes.forEach(cls => {
    // Handle common utility classes
    if (cls.startsWith('p-')) {
      const value = parseInt(cls.replace('p-', ''))
      if (!isNaN(value)) {
        styles.padding = value * 4 // Convert to pixels
      }
    }
    if (cls.startsWith('m-')) {
      const value = parseInt(cls.replace('m-', ''))
      if (!isNaN(value)) {
        styles.margin = value * 4
      }
    }
    if (cls.startsWith('bg-')) {
      // This would be expanded to handle full color palette
      const colorClass = cls.replace('bg-', '')
      if (colorClass === 'primary') {
        styles.backgroundColor = '#0ea5e9'
      }
    }
  })
  
  return styles
}