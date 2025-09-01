import React from 'react'
import { Pressable, PressableProps, ViewStyle } from 'react-native'
import { Text } from './Text'

export interface ButtonProps extends Omit<PressableProps, 'style'> {
  variant?: 'solid' | 'outline'
  colorScheme?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  style?: ViewStyle
  children?: React.ReactNode
}

export const Button = React.forwardRef<any, ButtonProps>(
  ({ variant = 'solid', colorScheme = 'primary', size = 'md', style, children, ...props }, ref) => {
    const buttonStyle: ViewStyle = {
      paddingHorizontal: size === 'sm' ? 12 : size === 'lg' ? 24 : 16,
      paddingVertical: size === 'sm' ? 8 : size === 'lg' ? 16 : 12,
      borderRadius: 6,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: variant === 'outline' ? 'transparent' : (colorScheme === 'primary' ? '#0ea5e9' : '#64748b'),
      ...(variant === 'outline' && {
        borderWidth: 1,
        borderColor: colorScheme === 'primary' ? '#0ea5e9' : '#64748b'
      }),
      ...style,
    }

    const textColor = variant === 'outline' 
      ? (colorScheme === 'primary' ? '#0ea5e9' : '#64748b')
      : '#ffffff'

    return (
      <Pressable ref={ref} style={buttonStyle} {...props}>
        <Text style={{ color: textColor, fontWeight: '600' }}>
          {children}
        </Text>
      </Pressable>
    )
  }
)

Button.displayName = 'Button'