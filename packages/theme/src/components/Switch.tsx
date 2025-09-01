import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { useTheme } from '../theme'

export interface SwitchProps {
  on?: boolean
  onChange?: (on: boolean) => void
  disabled?: boolean
}

export const Switch: React.FC<SwitchProps> = ({ on = false, onChange, disabled = false }) => {
  const { theme } = useTheme()

  return (
    <TouchableOpacity accessibilityRole="switch" accessibilityState={{ checked: on, disabled }} onPress={() => !disabled && onChange && onChange(!on)} style={{ opacity: disabled ? 0.5 : 1 }}>
      <View style={{ width: 44, height: 26, borderRadius: 16, backgroundColor: on ? theme.colors.primary[500] : '#e5e7eb', padding: 2 }}>
        <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: '#fff', transform: [{ translateX: on ? 18 : 0 }] }} />
      </View>
    </TouchableOpacity>
  )
}

export default Switch
