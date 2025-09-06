// Component template generator for copy-paste architecture

type ComponentType = 'button' | 'card' | 'input' | 'modal' | 'toast' | 'badge' | 'avatar' | 
                     'checkbox' | 'radio' | 'switch' | 'spinner' | 'tabs' | 'select' | 
                     'popover' | 'drawer' | 'alert' | 'progress' | 'slider'

export async function getComponentTemplate(componentName: ComponentType): Promise<string> {
  const templates: Record<ComponentType, () => string> = {
    button: generateButtonTemplate,
    card: generateCardTemplate,
    input: generateInputTemplate,
    modal: generateModalTemplate,
    toast: generateToastTemplate,
    badge: generateBadgeTemplate,
    avatar: generateAvatarTemplate,
    checkbox: generateCheckboxTemplate,
    radio: generateRadioTemplate,
    switch: generateSwitchTemplate,
    spinner: generateSpinnerTemplate,
    tabs: generateTabsTemplate,
    select: generateSelectTemplate,
    popover: generatePopoverTemplate,
    drawer: generateDrawerTemplate,
    alert: generateAlertTemplate,
    progress: generateProgressTemplate,
    slider: generateSliderTemplate,
  }
  
  const generator = templates[componentName]
  if (!generator) {
    throw new Error(`Component template not found: ${componentName}`)
  }
  
  return generator()
}

function generateButtonTemplate(): string {
  return `import React from 'react'
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native'
import { createStyleObject } from 'zenxui'

// Type-safe variant system
interface ButtonVariants {
  variant: 'solid' | 'outline' | 'ghost' | 'link'
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  colorScheme: 'primary' | 'secondary' | 'success' | 'warning' | 'error'
}

type VariantProps<T extends keyof ButtonVariants> = {
  [K in T]?: ButtonVariants[K]
}

export interface ButtonProps extends VariantProps<keyof ButtonVariants> {
  children: React.ReactNode
  isDisabled?: boolean
  isLoading?: boolean
  leftSlot?: React.ReactNode
  rightSlot?: React.ReactNode
  loadingText?: string
  className?: string
  style?: ViewStyle
  onPress?: () => void
}

// Slot-based architecture
const ButtonSlots = {
  Root: TouchableOpacity,
  Content: Text,
  LeftSlot: React.Fragment,
  RightSlot: React.Fragment,
  LoadingIndicator: ActivityIndicator,
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'solid',
  size = 'md',
  colorScheme = 'primary',
  isDisabled = false,
  isLoading = false,
  leftSlot,
  rightSlot,
  loadingText,
  className,
  style,
  onPress,
  ...props
}) => {
  // Memoized style computation for performance
  const buttonStyle = React.useMemo((): ViewStyle => {
    const baseStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
    }
    
    // Size variants
    const sizeStyles: Record<ButtonVariants['size'], ViewStyle> = {
      xs: { paddingHorizontal: 8, paddingVertical: 4, minHeight: 24 },
      sm: { paddingHorizontal: 12, paddingVertical: 6, minHeight: 32 },
      md: { paddingHorizontal: 16, paddingVertical: 8, minHeight: 40 },
      lg: { paddingHorizontal: 20, paddingVertical: 12, minHeight: 48 },
      xl: { paddingHorizontal: 24, paddingVertical: 16, minHeight: 56 },
    }
    
    // Variant styles
    const variantStyles: Record<ButtonVariants['variant'], ViewStyle> = {
      solid: { backgroundColor: '#0ea5e9' },
      outline: { borderWidth: 1, borderColor: '#0ea5e9', backgroundColor: 'transparent' },
      ghost: { backgroundColor: 'transparent' },
      link: { backgroundColor: 'transparent', paddingHorizontal: 0 },
    }
    
    // Apply styles
    Object.assign(baseStyle, sizeStyles[size], variantStyles[variant])
    
    // Disabled state
    if (isDisabled || isLoading) {
      baseStyle.opacity = 0.6
    }
    
    return baseStyle
  }, [variant, size, isDisabled, isLoading])
  
  const textStyle = React.useMemo((): TextStyle => {
    const baseTextStyle: TextStyle = {
      fontWeight: '600',
      textAlign: 'center',
    }
    
    // Size-based text styles
    const textSizeStyles: Record<ButtonVariants['size'], TextStyle> = {
      xs: { fontSize: 12 },
      sm: { fontSize: 14 },
      md: { fontSize: 16 },
      lg: { fontSize: 18 },
      xl: { fontSize: 20 },
    }
    
    // Variant-based text colors
    const textColorStyles: Record<ButtonVariants['variant'], TextStyle> = {
      solid: { color: '#ffffff' },
      outline: { color: '#0ea5e9' },
      ghost: { color: '#0ea5e9' },
      link: { color: '#0ea5e9', textDecorationLine: 'underline' },
    }
    
    Object.assign(baseTextStyle, textSizeStyles[size], textColorStyles[variant])
    return baseTextStyle
  }, [variant, size])
  
  // Custom className styles
  const clsStyle = className ? createStyleObject(className) : {}
  
  // Render loading indicator
  const renderLoadingIndicator = () => {
    if (!isLoading) return null
    return (
      <ButtonSlots.LoadingIndicator
        size="small"
        color={textStyle.color as string}
        style={{ marginRight: loadingText ? 8 : 0 }}
      />
    )
  }
  
  return (
    <ButtonSlots.Root
      style={[buttonStyle, clsStyle, style]}
      onPress={onPress}
      disabled={isDisabled || isLoading}
      accessibilityRole="button"
      accessibilityState={{
        disabled: isDisabled,
        busy: isLoading,
      }}
      {...props}
    >
      {leftSlot && (
        <ButtonSlots.LeftSlot>
          {leftSlot}
        </ButtonSlots.LeftSlot>
      )}
      
      {renderLoadingIndicator()}
      
      {(isLoading && loadingText) ? (
        <ButtonSlots.Content style={textStyle}>
          {loadingText}
        </ButtonSlots.Content>
      ) : !isLoading && (
        <ButtonSlots.Content style={textStyle}>
          {children}
        </ButtonSlots.Content>
      )}
      
      {rightSlot && (
        <ButtonSlots.RightSlot>
          {rightSlot}
        </ButtonSlots.RightSlot>
      )}
    </ButtonSlots.Root>
  )
}

// Export slots for customization
export { ButtonSlots }
export type { ButtonProps, ButtonVariants }`
}

function generateCardTemplate(): string {
  return `import React from 'react'
import { View, ViewStyle } from 'react-native'
import { createStyleObject } from 'zenxui'

export interface CardProps {
  children: React.ReactNode
  variant?: 'elevated' | 'outline' | 'filled'
  className?: string
  style?: ViewStyle
  headerSlot?: React.ReactNode
  footerSlot?: React.ReactNode
}

const CardSlots = {
  Root: View,
  Header: View,
  Content: View,
  Footer: View,
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'elevated',
  className,
  style,
  headerSlot,
  footerSlot,
}) => {
  const cardStyle = React.useMemo((): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: 12,
      padding: 16,
    }
    
    const variantStyles: Record<NonNullable<CardProps['variant']>, ViewStyle> = {
      elevated: {
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
      },
      outline: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#e5e7eb',
      },
      filled: {
        backgroundColor: '#f9fafb',
      },
    }
    
    return { ...baseStyle, ...variantStyles[variant!] }
  }, [variant])
  
  const clsStyle = className ? createStyleObject(className) : {}
  
  return (
    <CardSlots.Root style={[cardStyle, clsStyle, style]}>
      {headerSlot && (
        <CardSlots.Header style={{ marginBottom: 12 }}>
          {headerSlot}
        </CardSlots.Header>
      )}
      
      <CardSlots.Content>
        {children}
      </CardSlots.Content>
      
      {footerSlot && (
        <CardSlots.Footer style={{ marginTop: 12 }}>
          {footerSlot}
        </CardSlots.Footer>
      )}
    </CardSlots.Root>
  )
}

export { CardSlots }`
}

function generateInputTemplate(): string {
  return `import React from 'react'
import { TextInput, View, Text, ViewStyle, TextStyle } from 'react-native'
import { createStyleObject } from 'zenxui'

export interface InputProps {
  value?: string
  onChangeText?: (text: string) => void
  placeholder?: string
  isDisabled?: boolean
  isInvalid?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'outline' | 'filled' | 'underlined'
  leftSlot?: React.ReactNode
  rightSlot?: React.ReactNode
  helperText?: string
  errorText?: string
  className?: string
  style?: ViewStyle
}

const InputSlots = {
  Root: View,
  Field: TextInput,
  LeftSlot: View,
  RightSlot: View,
  HelperText: Text,
  ErrorText: Text,
}

export const Input: React.FC<InputProps> = ({
  value,
  onChangeText,
  placeholder,
  isDisabled = false,
  isInvalid = false,
  size = 'md',
  variant = 'outline',
  leftSlot,
  rightSlot,
  helperText,
  errorText,
  className,
  style,
  ...props
}) => {
  const containerStyle = React.useMemo((): ViewStyle => {
    const baseStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
    }
    
    const sizeStyles = {
      sm: { minHeight: 32, paddingHorizontal: 8 },
      md: { minHeight: 40, paddingHorizontal: 12 },
      lg: { minHeight: 48, paddingHorizontal: 16 },
    }
    
    const variantStyles = {
      outline: {
        borderWidth: 1,
        borderColor: isInvalid ? '#ef4444' : '#d1d5db',
        borderRadius: 6,
        backgroundColor: '#ffffff',
      },
      filled: {
        backgroundColor: '#f9fafb',
        borderRadius: 6,
      },
      underlined: {
        borderBottomWidth: 1,
        borderBottomColor: isInvalid ? '#ef4444' : '#d1d5db',
        borderRadius: 0,
        backgroundColor: 'transparent',
      },
    }
    
    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
      opacity: isDisabled ? 0.6 : 1,
    }
  }, [size, variant, isDisabled, isInvalid])
  
  const inputStyle = React.useMemo((): TextStyle => ({
    flex: 1,
    fontSize: size === 'sm' ? 14 : size === 'lg' ? 18 : 16,
    color: isDisabled ? '#9ca3af' : '#111827',
  }), [size, isDisabled])
  
  const clsStyle = className ? createStyleObject(className) : {}
  const displayText = errorText || helperText
  
  return (
    <View>
      <InputSlots.Root style={[containerStyle, clsStyle, style]}>
        {leftSlot && (
          <InputSlots.LeftSlot style={{ marginRight: 8 }}>
            {leftSlot}
          </InputSlots.LeftSlot>
        )}
        
        <InputSlots.Field
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          editable={!isDisabled}
          style={inputStyle}
          placeholderTextColor="#9ca3af"
          {...props}
        />
        
        {rightSlot && (
          <InputSlots.RightSlot style={{ marginLeft: 8 }}>
            {rightSlot}
          </InputSlots.RightSlot>
        )}
      </InputSlots.Root>
      
      {displayText && (
        <View style={{ marginTop: 4 }}>
          {errorText ? (
            <InputSlots.ErrorText
              style={{ fontSize: 12, color: '#ef4444' }}
            >
              {errorText}
            </InputSlots.ErrorText>
          ) : (
            <InputSlots.HelperText
              style={{ fontSize: 12, color: '#6b7280' }}
            >
              {helperText}
            </InputSlots.HelperText>
          )}
        </View>
      )}
    </View>
  )
}

export { InputSlots }`
}

// Simplified templates for other components
function generateModalTemplate(): string {
  return generateSimpleTemplate('Modal', {
    isVisible: 'boolean',
    onClose: '() => void',
    size: "'sm' | 'md' | 'lg' | 'xl'"
  })
}

function generateToastTemplate(): string {
  return generateSimpleTemplate('Toast', {
    message: 'string',
    status: "'success' | 'error' | 'warning' | 'info'",
    duration: 'number'
  })
}

function generateBadgeTemplate(): string {
  return generateSimpleTemplate('Badge', {
    variant: "'solid' | 'outline' | 'subtle'",
    colorScheme: "'primary' | 'secondary' | 'success' | 'warning' | 'error'"
  })
}

function generateAvatarTemplate(): string {
  return generateSimpleTemplate('Avatar', {
    src: 'string',
    name: 'string',
    size: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'"
  })
}

function generateCheckboxTemplate(): string {
  return generateSimpleTemplate('Checkbox', {
    isChecked: 'boolean',
    onChange: '(checked: boolean) => void',
    isDisabled: 'boolean'
  })
}

function generateRadioTemplate(): string {
  return generateSimpleTemplate('Radio', {
    isSelected: 'boolean',
    onChange: '() => void',
    value: 'string'
  })
}

function generateSwitchTemplate(): string {
  return generateSimpleTemplate('Switch', {
    isOn: 'boolean',
    onToggle: '() => void',
    isDisabled: 'boolean'
  })
}

function generateSpinnerTemplate(): string {
  return generateSimpleTemplate('Spinner', {
    size: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    color: 'string'
  })
}

function generateTabsTemplate(): string {
  return generateSimpleTemplate('Tabs', {
    defaultIndex: 'number',
    onChange: '(index: number) => void',
    variant: "'line' | 'enclosed' | 'soft-rounded'"
  })
}

function generateSelectTemplate(): string {
  return generateSimpleTemplate('Select', {
    value: 'string',
    onChange: '(value: string) => void',
    placeholder: 'string'
  })
}

function generatePopoverTemplate(): string {
  return generateSimpleTemplate('Popover', {
    isOpen: 'boolean',
    onClose: '() => void',
    placement: "'top' | 'bottom' | 'left' | 'right'"
  })
}

function generateDrawerTemplate(): string {
  return generateSimpleTemplate('Drawer', {
    isOpen: 'boolean',
    onClose: '() => void',
    placement: "'left' | 'right' | 'top' | 'bottom'"
  })
}

function generateAlertTemplate(): string {
  return generateSimpleTemplate('Alert', {
    status: "'success' | 'error' | 'warning' | 'info'",
    variant: "'solid' | 'subtle' | 'left-accent' | 'top-accent'"
  })
}

function generateProgressTemplate(): string {
  return generateSimpleTemplate('Progress', {
    value: 'number',
    max: 'number',
    size: "'xs' | 'sm' | 'md' | 'lg'"
  })
}

function generateSliderTemplate(): string {
  return generateSimpleTemplate('Slider', {
    value: 'number',
    onChange: '(value: number) => void',
    min: 'number',
    max: 'number',
    step: 'number'
  })
}

function generateSimpleTemplate(componentName: string, props: Record<string, string>): string {
  const propEntries = Object.entries(props)
  const propsInterface = propEntries
    .map(([key, type]) => `  ${key}?: ${type}`)
    .join('\n')
  
  const propsDestructure = propEntries
    .map(([key]) => key)
    .join(',\n  ')
  
  return `import React from 'react'
import { View, ViewStyle } from 'react-native'
import { createStyleObject } from 'zenxui'

export interface ${componentName}Props {
  children?: React.ReactNode
${propsInterface}
  className?: string
  style?: ViewStyle
}

const ${componentName}Slots = {
  Root: View,
  Content: View,
}

export const ${componentName}: React.FC<${componentName}Props> = ({
  children,
  ${propsDestructure},
  className,
  style,
  ...props
}) => {
  const clsStyle = className ? createStyleObject(className) : {}
  
  return (
    <${componentName}Slots.Root style={[{}, clsStyle, style]} {...props}>
      <${componentName}Slots.Content>
        {children}
      </${componentName}Slots.Content>
    </${componentName}Slots.Root>
  )
}

export { ${componentName}Slots }`
}