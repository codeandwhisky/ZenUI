import React from 'react'
import { Pressable, PressableProps, ViewStyle } from 'react-native'
import { cn, colors, borderRadius, spacing } from 'zenui-theme'
import { Text } from '../primitives/Text'
import { HStack } from '../primitives/Stack'
import { Icon } from '../primitives/Icon'

export interface ButtonProps extends Omit<PressableProps, 'style'> {
  /**
   * Button variant
   */
  variant?: 'solid' | 'outline' | 'ghost' | 'link'
  /**
   * Button color scheme
   */
  colorScheme?: 'primary' | 'secondary' | 'success' | 'warning' | 'error'
  /**
   * Button size
   */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /**
   * Whether button is disabled
   */
  isDisabled?: boolean
  /**
   * Whether button is loading
   */
  isLoading?: boolean
  /**
   * Loading text
   */
  loadingText?: string
  /**
   * Left icon
   */
  leftIcon?: string
  /**
   * Right icon
   */
  rightIcon?: string
  /**
   * Additional CSS classes
   */
  className?: string
  /**
   * Custom style
   */
  style?: ViewStyle
  /**
   * Button text or children
   */
  children?: React.ReactNode
}

const getSizeStyles = (size: ButtonProps['size']) => {
  switch (size) {
    case 'sm':
      return {
        paddingHorizontal: spacing[3],
        paddingVertical: spacing[2],
        fontSize: 14,
        iconSize: 16,
      }
    case 'md':
      return {
        paddingHorizontal: spacing[4],
        paddingVertical: spacing[3],
        fontSize: 16,
        iconSize: 18,
      }
    case 'lg':
      return {
        paddingHorizontal: spacing[6],
        paddingVertical: spacing[4],
        fontSize: 18,
        iconSize: 20,
      }
    case 'xl':
      return {
        paddingHorizontal: spacing[8],
        paddingVertical: spacing[5],
        fontSize: 20,
        iconSize: 24,
      }
    default:
      return getSizeStyles('md')
  }
}

const getVariantStyles = (
  variant: ButtonProps['variant'],
  colorScheme: ButtonProps['colorScheme'],
  isDisabled: boolean
) => {
  const colorPalette = 
    colorScheme === 'primary' ? colors.primary :
    colorScheme === 'success' ? colors.success :
    colorScheme === 'warning' ? colors.warning :
    colorScheme === 'error' ? colors.error :
    colors.secondary

  const baseColor = colorPalette[500]
  const hoverColor = colorPalette[600]
  const textColor = variant === 'solid' ? colors.white : baseColor

  switch (variant) {
    case 'solid':
      return {
        backgroundColor: isDisabled ? colors.gray[300] : baseColor,
        borderWidth: 0,
        textColor: isDisabled ? colors.gray[500] : colors.white,
      }
    case 'outline':
      return {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: isDisabled ? colors.gray[300] : baseColor,
        textColor: isDisabled ? colors.gray[400] : baseColor,
      }
    case 'ghost':
      return {
        backgroundColor: 'transparent',
        borderWidth: 0,
        textColor: isDisabled ? colors.gray[400] : baseColor,
      }
    case 'link':
      return {
        backgroundColor: 'transparent',
        borderWidth: 0,
        textColor: isDisabled ? colors.gray[400] : baseColor,
      }
    default:
      return getVariantStyles('solid', colorScheme, isDisabled)
  }
}

/**
 * Button component - A pressable button with multiple variants and sizes.
 */
export const Button = React.forwardRef<any, ButtonProps>(
  ({
    variant = 'solid',
    colorScheme = 'primary',
    size = 'md',
    isDisabled = false,
    isLoading = false,
    loadingText,
    leftIcon,
    rightIcon,
    
    style,
    children,
    ...props
  }, ref) => {
    const sizeStyles = getSizeStyles(size)
    const variantStyles = getVariantStyles(variant, colorScheme, isDisabled || isLoading)

    const buttonStyle = {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      borderRadius: borderRadius.md,
      paddingHorizontal: sizeStyles.paddingHorizontal,
      paddingVertical: sizeStyles.paddingVertical,
      backgroundColor: variantStyles.backgroundColor,
      borderWidth: variantStyles.borderWidth,
      borderColor: variantStyles.borderColor,
      opacity: isDisabled ? 0.6 : 1,
      ...style,
    }

    const textContent = isLoading ? (loadingText || 'Loading...') : children

    return (
      <Pressable
        ref={ref}
        style={({ pressed }) => [
          buttonStyle,
          pressed && !isDisabled && !isLoading && {
            opacity: 0.8,
          },
        ]}
        disabled={isDisabled || isLoading}
        accessibilityRole="button"
        accessibilityState={{ disabled: isDisabled || isLoading }}
        {...props}
      >
        <HStack space={spacing[2]} align="center">
          {leftIcon && !isLoading && (
            <Icon 
              name={leftIcon} 
              size={sizeStyles.iconSize}
              color={variantStyles.textColor}
            />
          )}
          {isLoading && (
            <Icon 
              name="⟳" 
              size={sizeStyles.iconSize}
              color={variantStyles.textColor}
            />
          )}
          <Text
            style={{
              fontSize: sizeStyles.fontSize,
              fontWeight: '600',
              color: variantStyles.textColor,
            }}
          >
            {textContent}
          </Text>
          {rightIcon && !isLoading && (
            <Icon 
              name={rightIcon} 
              size={sizeStyles.iconSize}
              color={variantStyles.textColor}
            />
          )}
        </HStack>
      </Pressable>
    )
  }
)

Button.displayName = 'Button'