import React from 'react'
import { TouchableOpacity, Text as RNText, TouchableOpacityProps, ViewStyle, TextStyle } from 'react-native'
import { createStyleObject } from '../utils'
import { useTheme } from '../theme'

export interface ButtonProps extends TouchableOpacityProps {
  children: React.ReactNode
  variant?: 'solid' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'solid', size = 'md', className = '', style, ...rest }) => {
  const { theme } = useTheme()

  const baseStyle: ViewStyle = {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    paddingVertical: size === 'sm' ? 6 : size === 'lg' ? 14 : 10,
    paddingHorizontal: size === 'sm' ? 10 : size === 'lg' ? 20 : 14,
    backgroundColor: variant === 'solid' ? theme.colors.primary[500] : 'transparent',
    borderWidth: variant === 'outline' ? 1 : 0,
    borderColor: variant === 'outline' ? theme.colors.primary[500] : 'transparent',
  }

  const textStyle: TextStyle = {
    color: variant === 'solid' ? theme.colors.white : theme.colors.primary[500],
    fontSize: 16,
    fontWeight: '600',
  }

  const clsStyle = className ? (createStyleObject(className) as ViewStyle) : {}

  return (
    <TouchableOpacity accessibilityRole="button" style={[baseStyle, clsStyle, style] as ViewStyle} {...rest}>
      <RNText style={textStyle as TextStyle}>{children}</RNText>
    </TouchableOpacity>
  )
}

export default Button
