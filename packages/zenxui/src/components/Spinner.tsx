import React from 'react'
import { ActivityIndicator, ActivityIndicatorProps, View } from 'react-native'
import { useTheme } from '../theme'

export const Spinner: React.FC<ActivityIndicatorProps> = (props) => {
  const { theme } = useTheme()
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator color={theme.colors.primary[500]} {...props} />
    </View>
  )
}

export default Spinner
