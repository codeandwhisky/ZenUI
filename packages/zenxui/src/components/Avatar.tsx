import React from 'react'
import { Image, ImageProps, View, ViewStyle } from 'react-native'

export interface AvatarProps extends ImageProps {
  size?: number
  fallback?: React.ReactNode
}

export const Avatar: React.FC<AvatarProps> = ({ size = 40, source, fallback, style, ...rest }) => {
  if (source) {
    return <Image source={source as any} style={[{ width: size, height: size, borderRadius: size / 2 }, style]} {...rest} />
  }
  return <View style={[{ width: size, height: size, borderRadius: size / 2, backgroundColor: '#e5e7eb', alignItems: 'center', justifyContent: 'center' }, style] as ViewStyle}>{fallback}</View>
}

export default Avatar
