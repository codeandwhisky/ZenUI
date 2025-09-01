import React from 'react'
import { View, ViewProps } from 'react-native'

export interface BoxProps extends ViewProps {
  children?: React.ReactNode
}

export const Box = React.forwardRef<View, BoxProps>(
  ({ children, ...props }, ref) => {
    return (
      <View ref={ref} {...props}>
        {children}
      </View>
    )
  }
)

Box.displayName = 'Box'