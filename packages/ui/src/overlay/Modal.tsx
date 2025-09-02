import React from 'react'
import { Modal as RNModal, ModalProps as RNModalProps, Pressable, ViewStyle } from 'react-native'
import { cn, colors, borderRadius, spacing } from 'zenui-theme'
import { Box } from '../primitives/Box'
import { VStack } from '../primitives/Stack'

export interface ModalProps extends Omit<RNModalProps, 'children'> {
  /**
   * Whether modal is open
   */
  isOpen: boolean
  /**
   * Called when modal should close
   */
  onClose: () => void
  /**
   * Modal size
   */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  /**
   * Whether to close on overlay press
   */
  closeOnOverlayClick?: boolean
  /**
   * Additional CSS classes
   */
  className?: string
  /**
   * Custom overlay style
   */
  overlayStyle?: ViewStyle
  /**
   * Custom content style
   */
  contentStyle?: ViewStyle
  /**
   * Modal content
   */
  children?: React.ReactNode
}

const getSizeStyles = (size: ModalProps['size']) => {
  switch (size) {
    case 'sm':
      return {
        maxWidth: 400,
        width: '90%',
      }
    case 'md':
      return {
        maxWidth: 500,
        width: '90%',
      }
    case 'lg':
      return {
        maxWidth: 800,
        width: '95%',
      }
    case 'xl':
      return {
        maxWidth: 1200,
        width: '95%',
      }
    case 'full':
      return {
        width: '100%',
        height: '100%',
        maxWidth: '100%',
        maxHeight: '100%',
      }
    default:
      return getSizeStyles('md')
  }
}

/**
 * Modal component - A dialog overlay for displaying content above the main interface.
 */
export const Modal = React.forwardRef<any, ModalProps>(
  ({
    isOpen,
    onClose,
    size = 'md',
    closeOnOverlayClick = true,
    
    overlayStyle,
    contentStyle,
    children,
    ...props
  }, ref) => {
    const sizeStyles = getSizeStyles(size)

    const overlayStyles = {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      padding: spacing[4],
      ...overlayStyle,
    }

    const contentStyles = {
      backgroundColor: colors.white,
      borderRadius: size === 'full' ? 0 : borderRadius.lg,
      padding: spacing[6],
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.25,
      shadowRadius: 20,
      elevation: 10,
      ...sizeStyles,
      ...contentStyle,
    }

    const handleOverlayPress = () => {
      if (closeOnOverlayClick) {
        onClose()
      }
    }

    return (
      <RNModal
        ref={ref}
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={onClose}
        accessibilityViewIsModal
        {...props}
      >
        <Pressable style={overlayStyles} onPress={handleOverlayPress}>
          <Pressable onPress={(e) => e.stopPropagation()}>
            <Box style={contentStyles as any}>
              {children}
            </Box>
          </Pressable>
        </Pressable>
      </RNModal>
    )
  }
)

Modal.displayName = 'Modal'

/**
 * ModalContent component - Container for modal content
 */
export interface ModalContentProps {
  className?: string
  style?: ViewStyle
  children?: React.ReactNode
}

export const ModalContent = React.forwardRef<any, ModalContentProps>(
  ({  style, children, ...props }, ref) => {
    return (
      <VStack ref={ref} style={style} space={spacing[4]} {...props}>
        {children}
      </VStack>
    )
  }
)

ModalContent.displayName = 'ModalContent'

/**
 * ModalHeader component - Header section of modal
 */
export interface ModalHeaderProps {
  className?: string
  style?: ViewStyle
  children?: React.ReactNode
}

export const ModalHeader = React.forwardRef<any, ModalHeaderProps>(
  ({  style, children, ...props }, ref) => {
    return (
      <Box
        ref={ref}
        style={{
          borderBottomWidth: 1,
          borderBottomColor: colors.gray[200],
          paddingBottom: spacing[4],
          ...style as any,
        }}
        {...props}
      >
        {children}
      </Box>
    )
  }
)

ModalHeader.displayName = 'ModalHeader'

/**
 * ModalBody component - Body section of modal
 */
export interface ModalBodyProps {
  className?: string
  style?: ViewStyle
  children?: React.ReactNode
}

export const ModalBody = React.forwardRef<any, ModalBodyProps>(
  ({  style, children, ...props }, ref) => {
    return (
      <Box ref={ref} style={style} {...props}>
        {children}
      </Box>
    )
  }
)

ModalBody.displayName = 'ModalBody'

/**
 * ModalFooter component - Footer section of modal
 */
export interface ModalFooterProps {
  className?: string
  style?: ViewStyle
  children?: React.ReactNode
}

export const ModalFooter = React.forwardRef<any, ModalFooterProps>(
  ({  style, children, ...props }, ref) => {
    return (
      <Box
        ref={ref}
        style={{
          borderTopWidth: 1,
          borderTopColor: colors.gray[200],
          paddingTop: spacing[4],
          ...(style as any),
        }}
        {...props}
      >
        {children}
      </Box>
    )
  }
)

ModalFooter.displayName = 'ModalFooter'