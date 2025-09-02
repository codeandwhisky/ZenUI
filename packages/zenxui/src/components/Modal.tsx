import React from 'react'
import { Modal as RNModal, View, Text, TouchableOpacity, ModalProps, ViewStyle } from 'react-native'
import { useTheme } from '../theme'

export interface SimpleModalProps extends ModalProps {
  title?: string
  children?: React.ReactNode
  onClose?: () => void
}

export const Modal: React.FC<SimpleModalProps> = ({ visible, title, children, onClose, ...rest }) => {
  const { theme } = useTheme()

  return (
    <RNModal transparent animationType="fade" visible={!!visible} {...rest}>
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 24 }}>
        <View style={{ backgroundColor: theme.colors.white, borderRadius: 12, padding: 20 }}>
          {title ? <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 8 }}>{title}</Text> : null}
          <View>{children}</View>
          <TouchableOpacity onPress={onClose} style={{ marginTop: 12, alignSelf: 'flex-end' }}>
            <Text style={{ color: theme.colors.primary[500] }}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </RNModal>
  )
}

export default Modal
