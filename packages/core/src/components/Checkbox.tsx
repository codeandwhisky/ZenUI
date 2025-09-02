import React from 'react'
import { TouchableOpacity, View, Text, GestureResponderEvent } from 'react-native'
import { useTheme } from '../theme'

export interface CheckboxProps {
  checked?: boolean
  onChange?: (checked: boolean) => void
  label?: string
  disabled?: boolean
}

export const Checkbox: React.FC<CheckboxProps> = ({ checked = false, onChange, label, disabled = false }) => {
  const { theme } = useTheme()

  const handlePress = (e: GestureResponderEvent) => {
    if (disabled) return
    onChange && onChange(!checked)
  }

  return (
    <TouchableOpacity accessible accessibilityRole="checkbox" accessibilityState={{ checked, disabled }} onPress={handlePress} style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ width: 20, height: 20, borderRadius: 4, borderWidth: 1, borderColor: theme.colors.gray[400], alignItems: 'center', justifyContent: 'center', backgroundColor: checked ? theme.colors.primary[500] : 'transparent' }}>
        {checked ? <View style={{ width: 10, height: 10, backgroundColor: theme.colors.white }} /> : null}
      </View>
      {label ? <Text style={{ marginLeft: 8 }}>{label}</Text> : null}
    </TouchableOpacity>
  )
}

export default Checkbox
