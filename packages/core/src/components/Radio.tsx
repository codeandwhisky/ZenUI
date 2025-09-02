import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import { useTheme } from '../theme'

export interface RadioProps {
  selected?: boolean
  onPress?: () => void
  label?: string
  disabled?: boolean
}

export const Radio: React.FC<RadioProps> = ({ selected = false, onPress, label, disabled = false }) => {
  const { theme } = useTheme()
  return (
    <TouchableOpacity accessibilityRole="radio" accessibilityState={{ selected, disabled }} onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ width: 20, height: 20, borderRadius: 10, borderWidth: 1, borderColor: theme.colors.gray[400], alignItems: 'center', justifyContent: 'center' }}>
        {selected ? <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: theme.colors.primary[500] }} /> : null}
      </View>
      {label ? <Text style={{ marginLeft: 8 }}>{label}</Text> : null}
    </TouchableOpacity>
  )
}

export default Radio
