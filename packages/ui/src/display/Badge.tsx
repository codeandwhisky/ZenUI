import React from 'react'
import { ViewStyle } from 'react-native'
import { cn, colors, borderRadius, spacing, fontSize } from '@zenui/theme'
import { Box } from '../primitives/Box'
import { Text } from '../primitives/Text'

export interface BadgeProps {
  /**
   * Badge variant
   */
  variant?: 'solid' | 'outline' | 'subtle'
  /**
   * Color scheme
   */
  colorScheme?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
  /**
   * Badge size
   */
  size?: 'sm' | 'md' | 'lg'
  /**
   * Additional CSS classes
   */
  className?: string
  /**
   * Custom style
   */
  style?: ViewStyle
  /**
   * Badge content
   */
  children?: React.ReactNode
}

const getSizeStyles = (size: BadgeProps['size']) => {
  switch (size) {
    case 'sm':
      return {
        paddingHorizontal: spacing[2],
        paddingVertical: spacing[1],
        fontSize: fontSize.xs,
        borderRadius: borderRadius.sm,
      }
    case 'md':
      return {
        paddingHorizontal: spacing[3],
        paddingVertical: spacing[1],
        fontSize: fontSize.sm,
        borderRadius: borderRadius.base,
      }
    case 'lg':
      return {
        paddingHorizontal: spacing[4],
        paddingVertical: spacing[2],
        fontSize: fontSize.base,
        borderRadius: borderRadius.md,
      }
    default:
      return getSizeStyles('md')
  }
}

const getVariantStyles = (
  variant: BadgeProps['variant'],
  colorScheme: BadgeProps['colorScheme']
) => {
  const colorPalette = 
    colorScheme === 'primary' ? colors.primary :
    colorScheme === 'success' ? colors.success :
    colorScheme === 'warning' ? colors.warning :
    colorScheme === 'error' ? colors.error :
    colorScheme === 'info' ? colors.info :
    colors.secondary

  switch (variant) {
    case 'solid':
      return {
        backgroundColor: colorPalette[500],
        borderWidth: 0,
        textColor: colors.white,
      }
    case 'outline':
      return {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colorPalette[500],
        textColor: colorPalette[500],
      }
    case 'subtle':
      return {
        backgroundColor: colorPalette[100],
        borderWidth: 0,
        textColor: colorPalette[800],
      }
    default:
      return getVariantStyles('solid', colorScheme)
  }
}

/**
 * Badge component - A small status indicator or label.
 */
export const Badge = React.forwardRef<any, BadgeProps>(
  ({
    variant = 'solid',
    colorScheme = 'primary',
    size = 'md',
    
    style,
    children,
    ...props
  }, ref) => {
    const sizeStyles = getSizeStyles(size)
    const variantStyles = getVariantStyles(variant, colorScheme)

    const badgeStyle = {
      alignSelf: 'flex-start' as const,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      paddingHorizontal: sizeStyles.paddingHorizontal,
      paddingVertical: sizeStyles.paddingVertical,
      borderRadius: sizeStyles.borderRadius,
      backgroundColor: variantStyles.backgroundColor,
      borderWidth: variantStyles.borderWidth,
      borderColor: variantStyles.borderColor,
      ...style,
    }

    return (
      <Box ref={ref} style={badgeStyle} {...props}>
        <Text
          style={{
            fontSize: sizeStyles.fontSize,
            fontWeight: '600',
            color: variantStyles.textColor,
            textAlign: 'center',
          }}
        >
          {children}
        </Text>
      </Box>
    )
  }
)

Badge.displayName = 'Badge'