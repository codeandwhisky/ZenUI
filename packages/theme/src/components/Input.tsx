import React from 'react'
import { TextInput, TextInputProps, TextStyle, View, ViewStyle } from 'react-native'
import { createStyleObject } from '../utils'
import { useTheme } from '../theme'

export interface InputProps extends TextInputProps {
  className?: string
}

export const Input: React.FC<InputProps> = ({ className = '', style, ...rest }) => {
  const { theme } = useTheme()
  const baseStyle: ViewStyle = {
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
  }

  const clsStyle = className ? (createStyleObject(className) as ViewStyle) : {}

  return (
    <View style={{}}>
      <TextInput style={[baseStyle, clsStyle, style] as TextStyle} {...rest} />
    </View>
  )
}

export default Input
