import React from 'react'
import { View, Text, ViewStyle, TextStyle } from 'react-native'

export interface BadgeProps {
  children?: React.ReactNode
  color?: string
  size?: 'sm' | 'md' | 'lg'
}

export const Badge: React.FC<BadgeProps> = ({ children, color = '#0ea5e9', size = 'md' }) => {
  const padding = size === 'sm' ? 4 : size === 'lg' ? 8 : 6
  const textSize = size === 'sm' ? 12 : size === 'lg' ? 14 : 13
  const containerStyle: ViewStyle = { backgroundColor: color, paddingHorizontal: padding, paddingVertical: 2, borderRadius: 999 }
  const textStyle: TextStyle = { color: '#fff', fontSize: textSize }
  return (
    <View style={containerStyle}>
      <Text style={textStyle as TextStyle}>{children}</Text>
    </View>
  )
}

export default Badge
