import React from 'react'
import { TextInput, TextInputProps, ViewStyle } from 'react-native'
import { cn, colors, borderRadius, spacing, fontSize } from 'zenui-theme'
import { Box } from '../primitives/Box'
import { Text } from '../primitives/Text'
import { VStack } from '../primitives/Stack'

export interface InputProps extends Omit<TextInputProps, 'style'> {
  /**
   * Input variant
   */
  variant?: 'outline' | 'filled' | 'underlined'
  /**
   * Input size
   */
  size?: 'sm' | 'md' | 'lg'
  /**
   * Whether input is invalid
   */
  isInvalid?: boolean
  /**
   * Whether input is disabled
   */
  isDisabled?: boolean
  /**
   * Whether input is required
   */
  isRequired?: boolean
  /**
   * Input label
   */
  label?: string
  /**
   * Helper text
   */
  helperText?: string
  /**
   * Error text
   */
  errorText?: string
  /**
   * Additional CSS classes
   */
  className?: string
  /**
   * Custom style
   */
  style?: ViewStyle
}

const getSizeStyles = (size: InputProps['size']) => {
  switch (size) {
    case 'sm':
      return {
        paddingHorizontal: spacing[3],
        paddingVertical: spacing[2],
        fontSize: fontSize.sm,
        height: 36,
      }
    case 'md':
      return {
        paddingHorizontal: spacing[4],
        paddingVertical: spacing[3],
        fontSize: fontSize.base,
        height: 44,
      }
    case 'lg':
      return {
        paddingHorizontal: spacing[5],
        paddingVertical: spacing[4],
        fontSize: fontSize.lg,
        height: 52,
      }
    default:
      return getSizeStyles('md')
  }
}

const getVariantStyles = (
  variant: InputProps['variant'],
  isInvalid: boolean,
  isDisabled: boolean,
  isFocused: boolean
) => {
  const borderColor = 
    isInvalid ? colors.error[500] :
    isFocused ? colors.primary[500] :
    isDisabled ? colors.gray[300] :
    colors.gray[300]

  switch (variant) {
    case 'outline':
      return {
        borderWidth: 1,
        borderColor,
        backgroundColor: isDisabled ? colors.gray[50] : colors.white,
        borderRadius: borderRadius.md,
      }
    case 'filled':
      return {
        borderWidth: 0,
        backgroundColor: isDisabled ? colors.gray[100] : colors.gray[50],
        borderRadius: borderRadius.md,
        borderBottomWidth: 2,
        borderBottomColor: borderColor,
      }
    case 'underlined':
      return {
        borderWidth: 0,
        backgroundColor: 'transparent',
        borderBottomWidth: 1,
        borderBottomColor: borderColor,
        borderRadius: 0,
      }
    default:
      return getVariantStyles('outline', isInvalid, isDisabled, isFocused)
  }
}

/**
 * Input component - A text input with multiple variants and built-in validation.
 */
export const Input = React.forwardRef<TextInput, InputProps>(
  ({
    variant = 'outline',
    size = 'md',
    isInvalid = false,
    isDisabled = false,
    isRequired = false,
    label,
    helperText,
    errorText,
    
    style,
    placeholder,
    ...props
  }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)
    
    const sizeStyles = getSizeStyles(size)
    const variantStyles = getVariantStyles(variant, isInvalid, isDisabled, isFocused)

    const inputStyle = {
      ...sizeStyles,
      ...variantStyles,
      color: isDisabled ? colors.gray[400] : colors.gray[900],
      ...style,
    }

    const displayText = errorText || helperText
    const textColor = errorText ? colors.error[500] : colors.gray[600]

    return (
      <VStack space={spacing[2]}>
        {label && (
          <Text 
            variant="caption" 
            weight="medium"
            color={colors.gray[700]}
          >
            {label}
            {isRequired && (
              <Text color={colors.error[500]}> *</Text>
            )}
          </Text>
        )}
        
        <TextInput
          ref={ref}
            className={undefined}
          style={inputStyle}
          placeholder={placeholder}
          placeholderTextColor={colors.gray[400]}
          editable={!isDisabled}
          accessibilityLabel={label}
          accessibilityState={{ disabled: isDisabled }}
          onFocus={(e) => {
            setIsFocused(true)
            props.onFocus?.(e)
          }}
          onBlur={(e) => {
            setIsFocused(false)
            props.onBlur?.(e)
          }}
          {...props}
        />
        
        {displayText && (
          <Text 
            variant="caption" 
            color={textColor}
          >
            {displayText}
          </Text>
        )}
      </VStack>
    )
  }
)

Input.displayName = 'Input'

/**
 * Textarea component - Multi-line text input
 */
export interface TextareaProps extends InputProps {
  /**
   * Number of visible text lines
   */
  numberOfLines?: number
}

export const Textarea = React.forwardRef<TextInput, TextareaProps>(
  ({ numberOfLines = 4, style, ...props }, ref) => {
    const textareaStyle = {
      height: undefined,
      minHeight: numberOfLines * 20 + 24, // Approximate line height + padding
      textAlignVertical: 'top' as const,
      ...style,
    }

    return (
      <Input
        ref={ref}
        style={textareaStyle}
        multiline
        numberOfLines={numberOfLines}
        {...props}
      />
    )
  }
)

Textarea.displayName = 'Textarea'