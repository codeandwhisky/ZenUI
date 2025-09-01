import React from 'react'
import { Animated, View, Text, StyleProp, ViewStyle } from 'react-native'
import { useTheme } from '../theme'

export interface ToastProps {
  message: string
  duration?: number
  style?: StyleProp<ViewStyle>
}

export const Toast: React.FC<ToastProps> = ({ message, duration = 3000, style }) => {
  const { theme } = useTheme()
  const [visible] = React.useState(true)
  const translate = React.useRef(new Animated.Value(0)).current

  React.useEffect(() => {
    Animated.timing(translate, { toValue: 1, duration: 200, useNativeDriver: true }).start()
    const t = setTimeout(() => {
      Animated.timing(translate, { toValue: 0, duration: 200, useNativeDriver: true }).start()
    }, duration)
    return () => clearTimeout(t)
  }, [duration, translate])

  if (!visible) return null

  return (
    <Animated.View style={[{ position: 'absolute', left: 12, right: 12, top: 40, backgroundColor: theme.colors.gray[900], padding: 12, borderRadius: 8 }, style, { opacity: translate }]}>
      <Text style={{ color: '#fff' }}>{message}</Text>
    </Animated.View>
  )
}

export default Toast
