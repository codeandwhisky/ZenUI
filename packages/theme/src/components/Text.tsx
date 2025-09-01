import React from 'react'
import { Text as RNText, TextProps, TextStyle } from 'react-native'
import { createStyleObject } from '../utils'

export interface TextPropsExtended extends TextProps {
  className?: string
  style?: TextStyle
}

export const Text: React.FC<TextPropsExtended> = ({ className = '', style, children, ...rest }) => {
  const clsStyle = className ? createStyleObject(className) : {}
  return (
    <RNText style={[clsStyle as TextStyle, style]} {...rest}>
      {children}
    </RNText>
  )
}

export default Text
