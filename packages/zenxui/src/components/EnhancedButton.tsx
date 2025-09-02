import React from 'react'
import {
  TouchableOpacity,
  Text as RNText,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native'
import { createStyleObject } from '../utils'
import { useTheme } from '../theme'
// TODO: Import from enhanced theme when ready
// import { useComponentTheme } from '../theme'
import type { ComponentState } from '../theme/types'
import { buttonTheme } from '../theme/componentThemes'

export interface ButtonProps extends TouchableOpacityProps {
  children: React.ReactNode
  variant?: 'solid' | 'outline' | 'ghost' | 'link' | 'unstyled'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  colorScheme?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
  isLoading?: boolean
  isDisabled?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  loadingText?: string
  className?: string
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'solid',
  size = 'md',
  colorScheme = 'primary',
  isLoading = false,
  isDisabled = false,
  leftIcon,
  rightIcon,
  loadingText,
  className = '',
  style,
  onPressIn,
  onPressOut,
  onFocus,
  onBlur,
  ...rest
}) => {
  const { theme } = useTheme()
  // Use static button theme for now
  const componentTheme = buttonTheme
  
  // Component state for pseudo styling
  const [componentState, setComponentState] = React.useState<ComponentState>({
    isPressed: false,
    isFocused: false,
    isHovered: false,
  })

  // Compute effective state
  const effectiveState: ComponentState = {
    ...componentState,
    isDisabled,
    isLoading,
  }

  // Get theme styles with state resolution
  const containerStyle = React.useMemo(() => {
    let baseStyle = componentTheme.baseStyle?.container || {}
    
    // Apply variant styles
    if (variant && componentTheme.variants?.[variant]?.container) {
      baseStyle = {
        ...baseStyle,
        ...componentTheme.variants[variant].container,
      }
    }
    
    // Apply size styles
    if (size && componentTheme.sizes?.[size]?.container) {
      baseStyle = {
        ...baseStyle,
        ...componentTheme.sizes[size].container,
      }
    }
    
    // Apply color scheme styles
    if (colorScheme && componentTheme.colorSchemes?.[colorScheme]?.container) {
      baseStyle = {
        ...baseStyle,
        ...componentTheme.colorSchemes[colorScheme].container,
      }
    }
    
    // Apply pseudo state styles
    if (effectiveState.isPressed && baseStyle._pressed) {
      baseStyle = { ...baseStyle, ...baseStyle._pressed }
    } else if (effectiveState.isFocused && baseStyle._focus) {
      baseStyle = { ...baseStyle, ...baseStyle._focus }
    } else if (effectiveState.isHovered && baseStyle._hover) {
      baseStyle = { ...baseStyle, ...baseStyle._hover }
    }
    
    if (effectiveState.isDisabled && baseStyle._disabled) {
      baseStyle = { ...baseStyle, ...baseStyle._disabled }
    }
    
    if (effectiveState.isLoading && baseStyle._loading) {
      baseStyle = { ...baseStyle, ...baseStyle._loading }
    }
    
    return baseStyle
  }, [componentTheme, variant, size, colorScheme, effectiveState])

  const textStyle = React.useMemo(() => {
    let baseStyle = componentTheme.baseStyle?.text || {}
    
    // Apply variant styles
    if (variant && componentTheme.variants?.[variant]?.text) {
      baseStyle = {
        ...baseStyle,
        ...componentTheme.variants[variant].text,
      }
    }
    
    // Apply size styles
    if (size && componentTheme.sizes?.[size]?.text) {
      baseStyle = {
        ...baseStyle,
        ...componentTheme.sizes[size].text,
      }
    }
    
    // Apply color scheme styles
    if (colorScheme && componentTheme.colorSchemes?.[colorScheme]?.text) {
      baseStyle = {
        ...baseStyle,
        ...componentTheme.colorSchemes[colorScheme].text,
      }
    }
    
    return baseStyle
  }, [componentTheme, variant, size, colorScheme])

  // Handle press events with state updates
  const handlePressIn = React.useCallback((event: any) => {
    setComponentState(prev => ({ ...prev, isPressed: true }))
    onPressIn?.(event)
  }, [onPressIn])

  const handlePressOut = React.useCallback((event: any) => {
    setComponentState(prev => ({ ...prev, isPressed: false }))
    onPressOut?.(event)
  }, [onPressOut])

  const handleFocus = React.useCallback((event: any) => {
    setComponentState(prev => ({ ...prev, isFocused: true }))
    onFocus?.(event)
  }, [onFocus])

  const handleBlur = React.useCallback((event: any) => {
    setComponentState(prev => ({ ...prev, isFocused: false }))
    onBlur?.(event)
  }, [onBlur])

  // Custom className styles
  const clsStyle = className ? (createStyleObject(className) as ViewStyle) : {}

  // Render loading indicator
  const renderLoadingIndicator = () => {
    if (!isLoading) return null
    
    // Extract color from textStyle safely
    const baseTextStyle = textStyle as any
    const spinnerColor = baseTextStyle?.color || theme.colors.primary[500]
    
    return (
      <ActivityIndicator 
        size="small" 
        color={spinnerColor}
        style={{ marginRight: loadingText ? 8 : 0 }}
      />
    )
  }

  // Render content
  const renderContent = () => {
    if (isLoading && loadingText) {
      return loadingText
    }
    
    if (isLoading && !loadingText) {
      return null
    }
    
    return children
  }

  // Render left icon
  const renderLeftIcon = () => {
    if (isLoading || !leftIcon) return null
    
    return (
      <React.Fragment>
        {leftIcon}
      </React.Fragment>
    )
  }

  // Render right icon
  const renderRightIcon = () => {
    if (isLoading || !rightIcon) return null
    
    return (
      <React.Fragment>
        {rightIcon}
      </React.Fragment>
    )
  }

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={{
        disabled: isDisabled,
        busy: isLoading,
      }}
      disabled={isDisabled || isLoading}
      style={[containerStyle, clsStyle, style] as ViewStyle}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...rest}
    >
      {renderLeftIcon()}
      {renderLoadingIndicator()}
      {renderContent() && (
        <RNText style={textStyle as TextStyle}>
          {renderContent()}
        </RNText>
      )}
      {renderRightIcon()}
    </TouchableOpacity>
  )
}

export default Button
