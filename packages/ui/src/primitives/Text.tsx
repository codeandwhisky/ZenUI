import React from 'react'
import { Text as RNText, TextProps as RNTextProps } from 'react-native'

const colors = {
  gray: {
    900: '#111827',
    600: '#4b5563',
    500: '#6b7280',
    400: '#9ca3af',
  },
  white: '#ffffff',
}

const fontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
}

const fontWeight = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
}

const lineHeight = {
  tight: 1.25,
  normal: 1.5,
}

export interface TextProps extends Omit<RNTextProps, 'style'> {
  /**
   * Custom style object
   */
  style?: RNTextProps['style']
  /**
   * Typography variant
   */
  variant?: 'heading' | 'subheading' | 'body' | 'caption' | 'overline'
  /**
   * Text size
   */
  size?: keyof typeof fontSize
  /**
   * Font weight
   */
  weight?: keyof typeof fontWeight
  /**
   * Text color
   */
  color?: string
  /**
   * Text alignment
   */
  align?: 'left' | 'center' | 'right' | 'justify'
  /**
   * Children elements
   */
  children?: React.ReactNode
}

const getVariantStyles = (variant: TextProps['variant']) => {
  switch (variant) {
    case 'heading':
      return {
        fontSize: fontSize['2xl'],
        fontWeight: fontWeight.bold,
        lineHeight: lineHeight.tight * fontSize['2xl'],
      }
    case 'subheading':
      return {
        fontSize: fontSize.lg,
        fontWeight: fontWeight.semibold,
        lineHeight: lineHeight.normal * fontSize.lg,
      }
    case 'body':
      return {
        fontSize: fontSize.base,
        fontWeight: fontWeight.normal,
        lineHeight: lineHeight.normal * fontSize.base,
      }
    case 'caption':
      return {
        fontSize: fontSize.sm,
        fontWeight: fontWeight.normal,
        lineHeight: lineHeight.normal * fontSize.sm,
      }
    case 'overline':
      return {
        fontSize: fontSize.xs,
        fontWeight: fontWeight.medium,
        lineHeight: lineHeight.normal * fontSize.xs,
        textTransform: 'uppercase' as const,
        letterSpacing: 0.5,
      }
    default:
      return {}
  }
}

/**
 * Text component - Typography-aware text component with consistent styling.
 */
export const Text = React.forwardRef<RNText, TextProps>(
  ({ 
    style, 
    variant = 'body',
    size,
    weight,
    color = colors.gray[900],
    align = 'left',
    children, 
    ...props 
  }, ref) => {
    const variantStyles = getVariantStyles(variant)
    
  const computedStyle = Object.assign({}, variantStyles, (size && { fontSize: fontSize[size] }) as any, (weight && { fontWeight: fontWeight[weight] }) as any, { color, textAlign: align }, style as any)

    return (
      <RNText
        ref={ref}
        style={computedStyle}
        {...props}
      >
        {children}
      </RNText>
    )
  }
)

Text.displayName = 'Text'