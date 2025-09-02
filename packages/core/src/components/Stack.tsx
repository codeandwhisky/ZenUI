import React from 'react'
import { View, ViewProps, ViewStyle } from 'react-native'
import { createStyleObject } from '../utils'

export interface StackProps extends ViewProps {
  direction?: 'row' | 'column'
  spacing?: number
  className?: string
}

export const Stack: React.FC<StackProps> = ({ direction = 'column', spacing = 0, className = '', style, children, ...rest }) => {
  const clsStyle = className ? (createStyleObject(className) as ViewStyle) : {}

  const childified = React.Children.toArray(children).map((child, idx) => {
    const marginProp = direction === 'row' ? { marginLeft: idx === 0 ? 0 : spacing } : { marginTop: idx === 0 ? 0 : spacing }
    return (
      <View key={idx} style={marginProp as ViewStyle}>
        {child}
      </View>
    )
  })

  return (
    <View style={[{ flexDirection: direction }, clsStyle as ViewStyle, style]} {...rest}>
      {childified}
    </View>
  )
}

export default Stack
