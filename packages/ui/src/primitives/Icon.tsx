import React from 'react'
import { Text, TextProps } from './Text'

export interface IconProps extends Omit<TextProps, 'children' | 'size'> {
  /**
   * Icon name or unicode character
   */
  name: string
  /**
   * Icon size
   */
  size?: number
}

/**
 * Icon component - A simple text-based icon component.
 * For a production app, you'd typically use a proper icon library like react-native-vector-icons
 */
export const Icon = React.forwardRef<any, IconProps>(
  ({ name, size = 24, style, ...props }, ref) => {
    const iconStyle = Object.assign({
      fontSize: size,
      lineHeight: size,
    }, style as any)

    return (
      <Text
        ref={ref}
        style={iconStyle}
        {...props}
      >
        {name}
      </Text>
    )
  }
)

Icon.displayName = 'Icon'