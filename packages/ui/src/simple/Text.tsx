import React from 'react'
import { Text as RNText, TextProps as RNTextProps } from 'react-native'

export interface TextProps extends RNTextProps {
  variant?: 'heading' | 'body' | 'caption'
  children?: React.ReactNode
}

export const Text = React.forwardRef<RNText, TextProps>(
  ({ variant = 'body', style, children, ...props }, ref) => {
    const getVariantStyle = () => {
      switch (variant) {
        case 'heading':
          return { fontSize: 24, fontWeight: '700' as const }
        case 'body':
          return { fontSize: 16, fontWeight: '400' as const }
        case 'caption':
          return { fontSize: 14, fontWeight: '400' as const }
        default:
          return {}
      }
    }

    return (
      <RNText
        ref={ref}
        style={[getVariantStyle(), style]}
        {...props}
      >
        {children}
      </RNText>
    )
  }
)

Text.displayName = 'Text'