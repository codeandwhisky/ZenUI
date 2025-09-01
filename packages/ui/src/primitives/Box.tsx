import React from 'react'
import { View, ViewProps as RNViewProps } from 'react-native'

export interface BoxProps extends Omit<RNViewProps, 'style'> {
  /**
   * Additional CSS classes for styling (for web compatibility)
   */
  className?: string
  /**
   * Custom style object
   */
  style?: RNViewProps['style']
  /**
   * Children elements
   */
  children?: React.ReactNode
}

/**
 * Box component - A flexible container that serves as the foundation for layout.
 * It's equivalent to a div in web and View in React Native.
 */
export const Box = React.forwardRef<View, BoxProps>(
  ({  style, children, ...props }, ref) => {
    return (
      <View
        ref={ref}
        style={style}
        {...props}
      >
        {children}
      </View>
    )
  }
)

Box.displayName = 'Box'