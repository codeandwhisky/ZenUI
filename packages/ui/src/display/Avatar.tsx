import React from 'react'
import { Image, ImageProps, ViewStyle } from 'react-native'
import { cn, colors, borderRadius } from 'zenui-theme'
import { Box } from '../primitives/Box'
import { Text } from '../primitives/Text'

export interface AvatarProps {
  /**
   * Avatar size
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | number
  /**
   * Image source
   */
  source?: ImageProps['source']
  /**
   * Alternative text for accessibility
   */
  alt?: string
  /**
   * Name to generate initials from
   */
  name?: string
  /**
   * Custom background color
   */
  bg?: string
  /**
   * Additional CSS classes
   */
  className?: string
  /**
   * Custom style
   */
  style?: ViewStyle
  /**
   * Children (custom content)
   */
  children?: React.ReactNode
}

const getSizeValue = (size: AvatarProps['size']): number => {
  if (typeof size === 'number') return size
  
  switch (size) {
    case 'xs': return 24
    case 'sm': return 32
    case 'md': return 40
    case 'lg': return 48
    case 'xl': return 64
    case '2xl': return 80
    default: return 40
  }
}

const getInitials = (name: string): string => {
  const names = name.trim().split(' ')
  if (names.length >= 2) {
    return (names[0][0] + names[names.length - 1][0]).toUpperCase()
  }
  return name.charAt(0).toUpperCase()
}

const getRandomColor = (name: string): string => {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', 
    '#FECA57', '#FF9FF3', '#54A0FF', '#5F27CD',
    '#00D2D3', '#FF9F43', '#10AC84', '#EE5A24'
  ]
  
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  
  return colors[Math.abs(hash) % colors.length]
}

/**
 * Avatar component - Displays user profile pictures, initials, or custom content.
 */
export const Avatar = React.forwardRef<any, AvatarProps>(
  ({
    size = 'md',
    source,
    alt,
    name,
    bg,
    
    style,
    children,
    ...props
  }, ref) => {
    const [imageError, setImageError] = React.useState(false)
    const sizeValue = getSizeValue(size)
    
    const avatarStyle = {
      width: sizeValue,
      height: sizeValue,
      borderRadius: borderRadius.full,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      overflow: 'hidden' as const,
      ...style,
    }

    // Show image if source is provided and no error occurred
    if (source && !imageError) {
      return (
        <Box ref={ref} style={avatarStyle} {...props}>
          <Image
            source={source}
            style={{
              width: sizeValue,
              height: sizeValue,
              borderRadius: borderRadius.full,
            }}
            accessibilityLabel={alt || name}
            onError={() => setImageError(true)}
          />
        </Box>
      )
    }

    // Show custom children if provided
    if (children) {
      const childrenStyle = {
        ...avatarStyle,
        backgroundColor: bg || colors.gray[300],
      }
      
      return (
        <Box ref={ref} style={childrenStyle} {...props}>
          {children}
        </Box>
      )
    }

    // Show initials if name is provided
    if (name) {
      const initials = getInitials(name)
      const backgroundColor = bg || getRandomColor(name)
      const fontSize = Math.round(sizeValue * 0.4)
      
      const initialsStyle = {
        ...avatarStyle,
        backgroundColor,
      }
      
      return (
        <Box ref={ref} style={initialsStyle} {...props}>
          <Text
            style={{
              fontSize,
              fontWeight: '600',
              color: colors.white,
              textAlign: 'center',
            }}
            accessibilityLabel={`${name} avatar`}
          >
            {initials}
          </Text>
        </Box>
      )
    }

    // Fallback: empty avatar
    const fallbackStyle = {
      ...avatarStyle,
      backgroundColor: bg || colors.gray[300],
    }
    
    return (
      <Box ref={ref} style={fallbackStyle} {...props}>
        <Text
          style={{
            fontSize: Math.round(sizeValue * 0.4),
            color: colors.gray[600],
          }}
        >
          ?
        </Text>
      </Box>
    )
  }
)

Avatar.displayName = 'Avatar'