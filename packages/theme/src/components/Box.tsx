import React from 'react'
import { View, ViewProps, StyleProp, ViewStyle } from 'react-native'
import { createStyleObject } from '../utils'

export interface BoxProps extends ViewProps {
  className?: string
  style?: StyleProp<ViewStyle>
}

export const Box: React.FC<BoxProps> = ({ className = '', style, children, ...rest }) => {
  const clsStyle = className ? createStyleObject(className) : {}
  return (
    <View style={[clsStyle as ViewStyle, style]} {...rest}>
      {children}
    </View>
  )
}

export default Box
