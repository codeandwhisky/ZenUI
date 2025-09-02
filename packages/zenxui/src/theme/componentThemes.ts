/**
 * Component Themes
 * 
 * Default theme definitions for all ZenXUI components.
 * These themes provide consistent styling while allowing full customization.
 */

import type { ComponentTheme, ComponentThemes } from './types'

/**
 * Button Component Theme
 * 
 * Comprehensive button theming with variants, sizes, and color schemes
 */
export const buttonTheme: ComponentTheme = {
  baseStyle: {
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      borderRadius: 6,
      position: 'relative',
      overflow: 'hidden',
      _disabled: {
        opacity: 0.6,
      },
      _loading: {
        opacity: 0.8,
      },
    },
    text: {
      fontWeight: '600',
      textAlign: 'center',
    },
  },
  
  variants: {
    solid: {
      container: {
        backgroundColor: 'primary.500',
        _hover: {
          backgroundColor: 'primary.600',
        },
        _pressed: {
          backgroundColor: 'primary.700',
        },
        _focus: {
          backgroundColor: 'primary.600',
        },
      },
      text: {
        color: 'white',
      },
    },
    
    outline: {
      container: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: 'primary.500',
        _hover: {
          backgroundColor: 'primary.50',
        },
        _pressed: {
          backgroundColor: 'primary.100',
        },
        _focus: {
          backgroundColor: 'primary.50',
          borderColor: 'primary.600',
        },
      },
      text: {
        color: 'primary.500',
      },
    },
    
    ghost: {
      container: {
        backgroundColor: 'transparent',
        _hover: {
          backgroundColor: 'primary.50',
        },
        _pressed: {
          backgroundColor: 'primary.100',
        },
        _focus: {
          backgroundColor: 'primary.50',
        },
      },
      text: {
        color: 'primary.500',
      },
    },
    
    link: {
      container: {
        backgroundColor: 'transparent',
        padding: 0,
        minHeight: 'auto',
        _hover: {
          opacity: 0.8,
        },
        _pressed: {
          opacity: 0.6,
        },
      },
      text: {
        color: 'primary.500',
        textDecorationLine: 'underline',
      },
    },
    
    unstyled: {
      container: {
        backgroundColor: 'transparent',
        padding: 0,
        minHeight: 'auto',
        borderRadius: 0,
      },
      text: {
        color: 'inherit',
      },
    },
  },
  
  sizes: {
    xs: {
      container: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        minHeight: 24,
      },
      text: {
        fontSize: 12,
        lineHeight: 16,
      },
    },
    
    sm: {
      container: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        minHeight: 32,
      },
      text: {
        fontSize: 14,
        lineHeight: 18,
      },
    },
    
    md: {
      container: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        minHeight: 40,
      },
      text: {
        fontSize: 16,
        lineHeight: 20,
      },
    },
    
    lg: {
      container: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        minHeight: 48,
      },
      text: {
        fontSize: 18,
        lineHeight: 22,
      },
    },
    
    xl: {
      container: {
        paddingHorizontal: 24,
        paddingVertical: 16,
        minHeight: 56,
      },
      text: {
        fontSize: 20,
        lineHeight: 24,
      },
    },
  },
  
  colorSchemes: {
    primary: {
      // Already defined in variants, will override base primary colors
    },
    
    secondary: {
      container: {
        backgroundColor: 'secondary.500',
        _hover: {
          backgroundColor: 'secondary.600',
        },
        _pressed: {
          backgroundColor: 'secondary.700',
        },
      },
    },
    
    success: {
      container: {
        backgroundColor: 'success.500',
        _hover: {
          backgroundColor: 'success.600',
        },
        _pressed: {
          backgroundColor: 'success.700',
        },
      },
    },
    
    warning: {
      container: {
        backgroundColor: 'warning.500',
        _hover: {
          backgroundColor: 'warning.600',
        },
        _pressed: {
          backgroundColor: 'warning.700',
        },
      },
    },
    
    error: {
      container: {
        backgroundColor: 'error.500',
        _hover: {
          backgroundColor: 'error.600',
        },
        _pressed: {
          backgroundColor: 'error.700',
        },
      },
    },
    
    info: {
      container: {
        backgroundColor: 'info.500',
        _hover: {
          backgroundColor: 'info.600',
        },
        _pressed: {
          backgroundColor: 'info.700',
        },
      },
    },
  },
  
  defaultProps: {
    variant: 'solid',
    size: 'md',
    colorScheme: 'primary',
  },
}

/**
 * Input Component Theme
 */
export const inputTheme: ComponentTheme = {
  baseStyle: {
    container: {
      borderWidth: 1,
      borderColor: 'border.default',
      borderRadius: 6,
      backgroundColor: 'background.default',
      _focus: {
        borderColor: 'border.focus',
        borderWidth: 2,
      },
      _invalid: {
        borderColor: 'border.error',
      },
      _disabled: {
        backgroundColor: 'background.muted',
        opacity: 0.6,
      },
    },
    text: {
      color: 'foreground.default',
      fontSize: 16,
      _placeholder: {
        color: 'foreground.placeholder',
      },
    },
  },
  
  variants: {
    outline: {
      // Default variant - already defined in baseStyle
    },
    
    filled: {
      container: {
        backgroundColor: 'background.subtle',
        borderColor: 'transparent',
        _focus: {
          backgroundColor: 'background.default',
          borderColor: 'border.focus',
        },
      },
    },
    
    flushed: {
      container: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        borderBottomWidth: 1,
        borderRadius: 0,
        paddingHorizontal: 0,
        _focus: {
          borderBottomWidth: 2,
        },
      },
    },
    
    unstyled: {
      container: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        borderRadius: 0,
        paddingHorizontal: 0,
        paddingVertical: 0,
      },
    },
  },
  
  sizes: {
    sm: {
      container: {
        paddingHorizontal: 8,
        paddingVertical: 6,
        minHeight: 32,
      },
      text: {
        fontSize: 14,
      },
    },
    
    md: {
      container: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        minHeight: 40,
      },
      text: {
        fontSize: 16,
      },
    },
    
    lg: {
      container: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        minHeight: 48,
      },
      text: {
        fontSize: 18,
      },
    },
  },
  
  defaultProps: {
    variant: 'outline',
    size: 'md',
  },
}

/**
 * Card Component Theme
 */
export const cardTheme: ComponentTheme = {
  baseStyle: {
    container: {
      backgroundColor: 'card.default',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: 'card.border',
      padding: 16,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
    },
    text: {
      color: 'card.foreground',
    },
  },
  
  variants: {
    elevated: {
      container: {
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 6,
      },
    },
    
    outlined: {
      container: {
        shadowOpacity: 0,
        elevation: 0,
        borderWidth: 1,
      },
    },
    
    filled: {
      container: {
        backgroundColor: 'background.subtle',
        borderWidth: 0,
        shadowOpacity: 0,
        elevation: 0,
      },
    },
    
    ghost: {
      container: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        shadowOpacity: 0,
        elevation: 0,
      },
    },
  },
  
  sizes: {
    sm: {
      container: {
        padding: 12,
        borderRadius: 6,
      },
    },
    
    md: {
      container: {
        padding: 16,
        borderRadius: 8,
      },
    },
    
    lg: {
      container: {
        padding: 24,
        borderRadius: 12,
      },
    },
  },
  
  defaultProps: {
    variant: 'elevated',
    size: 'md',
  },
}

/**
 * Text Component Theme
 */
export const textTheme: ComponentTheme = {
  baseStyle: {
    text: {
      color: 'foreground.default',
      fontFamily: 'System',
    },
  },
  
  variants: {
    heading: {
      text: {
        fontSize: 24,
        fontWeight: '700',
        lineHeight: 32,
      },
    },
    
    subheading: {
      text: {
        fontSize: 20,
        fontWeight: '600',
        lineHeight: 28,
      },
    },
    
    body: {
      text: {
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 24,
      },
    },
    
    caption: {
      text: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 20,
        color: 'foreground.muted',
      },
    },
    
    label: {
      text: {
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 20,
      },
    },
  },
  
  sizes: {
    xs: {
      text: {
        fontSize: 12,
        lineHeight: 16,
      },
    },
    
    sm: {
      text: {
        fontSize: 14,
        lineHeight: 20,
      },
    },
    
    md: {
      text: {
        fontSize: 16,
        lineHeight: 24,
      },
    },
    
    lg: {
      text: {
        fontSize: 18,
        lineHeight: 28,
      },
    },
    
    xl: {
      text: {
        fontSize: 20,
        lineHeight: 28,
      },
    },
    
    '2xl': {
      text: {
        fontSize: 24,
        lineHeight: 32,
      },
    },
  },
  
  defaultProps: {
    variant: 'body',
    size: 'md',
  },
}

/**
 * Default Component Themes Registry
 * 
 * Contains all default component themes that can be customized
 */
export const defaultComponentThemes: ComponentThemes = {
  Button: buttonTheme,
  Input: inputTheme,
  Card: cardTheme,
  Text: textTheme,
  // Box intentionally left without theme for maximum flexibility
  Box: {
    baseStyle: {
      container: {
        flexDirection: 'column',
      },
    },
    defaultProps: {},
  },
}
