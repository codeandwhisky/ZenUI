import { Platform } from 'react-native'

/**
 * Utility functions for accessibility
 */

/**
 * Generate a unique ID for accessibility labels
 */
export function generateId(prefix: string = 'zenxui'): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Check if an element is focusable
 */
export function isFocusable(element: HTMLElement): boolean {
  if (Platform.OS !== 'web') return false
  
  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ]
  
  return focusableSelectors.some(selector => element.matches(selector))
}

/**
 * Get all focusable elements within a container
 */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  if (Platform.OS !== 'web') return []
  
  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(', ')
  
  return Array.from(container.querySelectorAll(focusableSelectors))
}

/**
 * Check if reduced motion is preferred
 */
export function prefersReducedMotion(): boolean {
  if (Platform.OS !== 'web') return false
  
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Check if high contrast is preferred
 */
export function prefersHighContrast(): boolean {
  if (Platform.OS !== 'web') return false
  
  return window.matchMedia('(prefers-contrast: high)').matches
}

/**
 * Get contrast ratio between two colors
 */
export function getContrastRatio(color1: string, color2: string): number {
  // Simple contrast ratio calculation
  // In a real implementation, you'd want a more robust color parsing library
  
  function getLuminance(color: string): number {
    // Convert hex to RGB
    const hex = color.replace('#', '')
    const r = parseInt(hex.substr(0, 2), 16) / 255
    const g = parseInt(hex.substr(2, 2), 16) / 255
    const b = parseInt(hex.substr(4, 2), 16) / 255
    
    // Calculate relative luminance
    const rs = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4)
    const gs = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4)
    const bs = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4)
    
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
  }
  
  const lum1 = getLuminance(color1)
  const lum2 = getLuminance(color2)
  
  const lightest = Math.max(lum1, lum2)
  const darkest = Math.min(lum1, lum2)
  
  return (lightest + 0.05) / (darkest + 0.05)
}

/**
 * Check if contrast ratio meets WCAG guidelines
 */
export function meetsContrastRequirement(
  foreground: string,
  background: string,
  level: 'AA' | 'AAA' = 'AA',
  size: 'normal' | 'large' = 'normal'
): boolean {
  const ratio = getContrastRatio(foreground, background)
  
  if (level === 'AAA') {
    return size === 'large' ? ratio >= 4.5 : ratio >= 7
  } else {
    return size === 'large' ? ratio >= 3 : ratio >= 4.5
  }
}

/**
 * Create aria-describedby string from array of IDs
 */
export function createAriaDescribedBy(ids: (string | undefined | null)[]): string | undefined {
  const validIds = ids.filter(Boolean) as string[]
  return validIds.length > 0 ? validIds.join(' ') : undefined
}

/**
 * Screen reader utilities
 */
export const screenReader = {
  /**
   * Hide element from screen readers but keep it visually available
   */
  hide: (element: HTMLElement) => {
    if (Platform.OS === 'web') {
      element.setAttribute('aria-hidden', 'true')
    }
  },
  
  /**
   * Show element to screen readers
   */
  show: (element: HTMLElement) => {
    if (Platform.OS === 'web') {
      element.removeAttribute('aria-hidden')
    }
  },
  
  /**
   * Make element visible only to screen readers
   */
  onlyVisible: {
    position: 'absolute' as const,
    left: '-10000px',
    width: '1px',
    height: '1px',
    overflow: 'hidden' as const,
  },
}

/**
 * ARIA role definitions for common patterns
 */
export const ariaRoles = {
  button: 'button',
  link: 'link',
  menu: 'menu',
  menuitem: 'menuitem',
  tablist: 'tablist',
  tab: 'tab',
  tabpanel: 'tabpanel',
  dialog: 'dialog',
  alertdialog: 'alertdialog',
  tooltip: 'tooltip',
  combobox: 'combobox',
  listbox: 'listbox',
  option: 'option',
  checkbox: 'checkbox',
  radio: 'radio',
  slider: 'slider',
  progressbar: 'progressbar',
  status: 'status',
  alert: 'alert',
  log: 'log',
  marquee: 'marquee',
  timer: 'timer',
} as const

/**
 * Common ARIA attributes helper
 */
export function createAriaAttributes(props: {
  role?: keyof typeof ariaRoles
  label?: string
  labelledBy?: string
  describedBy?: string
  expanded?: boolean
  selected?: boolean
  checked?: boolean
  disabled?: boolean
  hidden?: boolean
  live?: 'polite' | 'assertive' | 'off'
  atomic?: boolean
}) {
  const attrs: Record<string, any> = {}
  
  if (Platform.OS === 'web') {
    if (props.role) attrs.role = ariaRoles[props.role]
    if (props.label) attrs['aria-label'] = props.label
    if (props.labelledBy) attrs['aria-labelledby'] = props.labelledBy
    if (props.describedBy) attrs['aria-describedby'] = props.describedBy
    if (props.expanded !== undefined) attrs['aria-expanded'] = props.expanded
    if (props.selected !== undefined) attrs['aria-selected'] = props.selected
    if (props.checked !== undefined) attrs['aria-checked'] = props.checked
    if (props.disabled !== undefined) attrs['aria-disabled'] = props.disabled
    if (props.hidden !== undefined) attrs['aria-hidden'] = props.hidden
    if (props.live) attrs['aria-live'] = props.live
    if (props.atomic !== undefined) attrs['aria-atomic'] = props.atomic
  } else {
    // React Native accessibility props
    if (props.role) attrs.accessibilityRole = props.role
    if (props.label) attrs.accessibilityLabel = props.label
    if (props.disabled !== undefined || props.selected !== undefined || props.checked !== undefined) {
      attrs.accessibilityState = {
        disabled: props.disabled,
        selected: props.selected,
        checked: props.checked,
      }
    }
    if (props.hidden) attrs.accessibilityElementsHidden = true
  }
  
  return attrs
}