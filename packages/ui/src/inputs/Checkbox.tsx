import React from 'react'
import { Pressable, ViewStyle } from 'react-native'
import { cn, colors, borderRadius, spacing } from 'zenui-theme'
import { Box } from '../primitives/Box'
import { Text } from '../primitives/Text'
import { HStack } from '../primitives/Stack'
import { Icon } from '../primitives/Icon'

export interface CheckboxProps {
  /**
   * Whether checkbox is checked
   */
  isChecked?: boolean
  /**
   * Whether checkbox is indeterminate
   */
  isIndeterminate?: boolean
  /**
   * Whether checkbox is disabled
   */
  isDisabled?: boolean
  /**
   * Whether checkbox is invalid
   */
  isInvalid?: boolean
  /**
   * Checkbox size
   */
  size?: 'sm' | 'md' | 'lg'
  /**
   * Color scheme
   */
  colorScheme?: 'primary' | 'secondary' | 'success' | 'warning' | 'error'
  /**
   * Checkbox label
   */
  label?: string
  /**
   * Called when checkbox state changes
   */
  onChange?: (isChecked: boolean) => void
  /**
   * Additional CSS classes
   */
  className?: string
  /**
   * Custom style
   */
  style?: ViewStyle
  /**
   * Children (alternative to label)
   */
  children?: React.ReactNode
}

const getSizeStyles = (size: CheckboxProps['size']) => {
  switch (size) {
    case 'sm':
      return {
        size: 16,
        iconSize: 12,
        spacing: spacing[2],
      }
    case 'md':
      return {
        size: 20,
        iconSize: 14,
        spacing: spacing[3],
      }
    case 'lg':
      return {
        size: 24,
        iconSize: 18,
        spacing: spacing[4],
      }
    default:
      return getSizeStyles('md')
  }
}

/**
 * Checkbox component - A checkbox input with label support.
 */
export const Checkbox = React.forwardRef<any, CheckboxProps>(
  ({
    isChecked = false,
    isIndeterminate = false,
    isDisabled = false,
    isInvalid = false,
    size = 'md',
    colorScheme = 'primary',
    label,
    onChange,
    
    style,
    children,
    ...props
  }, ref) => {
    const sizeStyles = getSizeStyles(size)
    
    const colorPalette = 
      colorScheme === 'primary' ? colors.primary :
      colorScheme === 'success' ? colors.success :
      colorScheme === 'warning' ? colors.warning :
      colorScheme === 'error' ? colors.error :
      colors.secondary

    const backgroundColor = 
      isChecked || isIndeterminate ? colorPalette[500] :
      isDisabled ? colors.gray[100] : 
      colors.white

    const borderColor = 
      isInvalid ? colors.error[500] :
      isChecked || isIndeterminate ? colorPalette[500] :
      isDisabled ? colors.gray[300] :
      colors.gray[300]

    const checkboxStyle = {
      width: sizeStyles.size,
      height: sizeStyles.size,
      borderRadius: borderRadius.sm,
      borderWidth: 1,
      borderColor,
      backgroundColor,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      ...style,
    }

    const handlePress = () => {
      if (!isDisabled && onChange) {
        onChange(!isChecked)
      }
    }

    const getIcon = () => {
      if (isIndeterminate) {
        return '−' // minus sign
      }
      if (isChecked) {
        return '✓' // checkmark
      }
      return ''
    }

    const content = children || label

    return (
      <Pressable
        ref={ref}
        onPress={handlePress}
        disabled={isDisabled}
        accessibilityRole="checkbox"
        accessibilityState={{ 
          checked: isIndeterminate ? 'mixed' : isChecked,
          disabled: isDisabled 
        }}
        accessibilityLabel={typeof content === 'string' ? content : undefined}
        {...props}
      >
        <HStack space={sizeStyles.spacing} align="center">
          <Box style={checkboxStyle}>
            {(isChecked || isIndeterminate) && (
              <Icon
                name={getIcon()}
                size={sizeStyles.iconSize}
                color={colors.white}
              />
            )}
          </Box>
          
          {content && (
            <Text
              variant="body"
              color={isDisabled ? colors.gray[400] : colors.gray[900]}
            >
              {content}
            </Text>
          )}
        </HStack>
      </Pressable>
    )
  }
)

Checkbox.displayName = 'Checkbox'