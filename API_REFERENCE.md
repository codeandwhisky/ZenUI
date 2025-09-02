# ZenUI API Reference

Complete API documentation for ZenUI components and enhanced theme system.

## Enhanced Theme System API

### ThemeProvider

The enhanced theme provider with performance optimizations and responsive design support.

```tsx
import { ThemeProvider } from 'zenxui'

interface ThemeProviderProps {
  theme?: Theme                    // Custom theme configuration
  children: React.ReactNode        // Child components
  initialColorMode?: ColorMode     // Initial color mode ('light' | 'dark' | 'system')
}
```

### createTheme

Creates a custom theme by merging with the default theme configuration.

```tsx
import { createTheme } from 'zenxui'

const customTheme = createTheme({
  colors: {
    primary: {
      500: '#3b82f6',
    },
  },
  spacing: {
    xl: 40,
  },
})
```

### useResponsiveValue

Resolve responsive values based on current screen breakpoint.

```tsx
import { useResponsiveValue } from 'zenxui'

function ResponsiveComponent() {
  const padding = useResponsiveValue({
    base: 16,    // Mobile
    sm: 20,      // Small tablets
    md: 24,      // Tablets
    lg: 32,      // Desktop
  })
  
  return <Box style={{ padding }}>{/* Content */}</Box>
}
```

### Performance Utilities

```tsx
import { 
  getThemeCacheStats,
  clearThemeCache,
  configureCacheOptions 
} from 'zenxui'

// Monitor cache performance
const stats = getThemeCacheStats()
console.log(`Cache hit rate: ${stats.hitRate}%`)

// Configure cache
configureCacheOptions({
  maxCacheSize: 1000,
  enableDevLogging: true,
})
```

## Core Components

### Box

A flexible container component that serves as the foundation for layout.

```tsx
import { Box } from 'zenui-ui'

interface BoxProps extends ViewProps {
  children?: React.ReactNode
}
```

**Example:**
```tsx
<Box style={{ padding: 20, backgroundColor: '#f5f5f5' }}>
  <Text>Content inside box</Text>
</Box>
```

### Text

Typography-aware text component with consistent styling.

```tsx
import { Text } from 'zenui-ui'

interface TextProps extends TextProps {
  variant?: 'heading' | 'body' | 'caption'
  children?: React.ReactNode
}
```

**Variants:**
- `heading` - Large, bold text for headlines (24px, weight: 700)
- `body` - Regular text for content (16px, weight: 400)
- `caption` - Smaller text for captions (14px, weight: 400)

**Example:**
```tsx
<Text variant="heading">Welcome to ZenUI</Text>
<Text variant="body">This is body text content</Text>
<Text variant="caption">Additional information</Text>
```

### Button (Enhanced)

Pressable button component with comprehensive theming, states, and variants.

```tsx
import { Button } from 'zenui-ui'

interface ButtonProps extends TouchableOpacityProps {
  children: React.ReactNode
  variant?: 'solid' | 'outline' | 'ghost' | 'link' | 'unstyled'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  colorScheme?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
  isLoading?: boolean
  isDisabled?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  loadingText?: string
}
```

**Variants:**
- `solid` - Filled button with background color
- `outline` - Transparent button with border
- `ghost` - Transparent button without border
- `link` - Text-style button with underline
- `unstyled` - No default styling applied

**Color Schemes:**
- `primary` - Primary brand color
- `secondary` - Secondary brand color
- `success` - Green success color
- `warning` - Orange warning color
- `error` - Red error color
- `info` - Blue info color

**Sizes:**
- `xs` - Extra small (padding: 8x4px, min-height: 24px)
- `sm` - Small (padding: 12x6px, min-height: 32px)
- `md` - Medium (padding: 16x8px, min-height: 40px)
- `lg` - Large (padding: 20x12px, min-height: 48px)
- `xl` - Extra large (padding: 24x16px, min-height: 56px)

**States:**
- `isLoading` - Shows loading indicator
- `isDisabled` - Disabled state with reduced opacity

**Example:**
```tsx
{/* Basic usage */}
<Button variant="solid" colorScheme="primary" size="lg">
  Primary Button
</Button>

{/* With icons */}
<Button 
  variant="outline" 
  leftIcon={<Icon name="save" />}
  rightIcon={<Icon name="arrow-right" />}
>
  Save & Continue
</Button>

{/* Loading states */}
<Button isLoading>Loading...</Button>
<Button isLoading loadingText="Saving...">Save</Button>

{/* All variants */}
<Button variant="solid">Solid</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

{/* All sizes */}
<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>

{/* All color schemes */}
<Button colorScheme="primary">Primary</Button>
<Button colorScheme="success">Success</Button>
<Button colorScheme="warning">Warning</Button>
<Button colorScheme="error">Error</Button>
```

## Enhanced Theme System

### ThemeProvider

Provides theme context to all child components.

```tsx
import { ThemeProvider } from 'zenxui'

interface ThemeProviderProps {
  children: ReactNode
  initialColorMode?: 'light' | 'dark'
}
```

**Example:**
```tsx
import { ThemeProvider } from 'zenxui'

function App() {
  return (
    <ThemeProvider initialColorMode="light">
      <YourApp />
    </ThemeProvider>
  )
}
```

### useTheme Hook

Access theme values and functions.

```tsx
import { useTheme } from 'zenxui'

const { theme, colorMode, toggleColorMode, setColorMode } = useTheme()
```

**Returns:**
- `theme` - Current theme object with colors and tokens
- `colorMode` - Current color mode ('light' | 'dark')
- `toggleColorMode` - Function to toggle between light/dark
- `setColorMode` - Function to set specific color mode

### useColorMode Hook

Simplified hook for color mode management.

```tsx
import { useColorMode } from 'zenxui'

const { colorMode, toggleColorMode, setColorMode } = useColorMode()
```

## Design Tokens

### Colors

```tsx
import { colors } from 'zenxui'

// Primary colors (nested and flattened access)
colors.primary[50]   // Lightest
colors.primary[500]  // Base
colors.primary[900]  // Darkest
// Flattened access
colors.primary50
colors.primary500
colors.primary900

// Available color palettes:
// primary, secondary, success, warning, error, info, gray
```

### Spacing

```tsx
import { spacing } from 'zenxui'

// Named spacing aliases
spacing[1]  // 4px
spacing[2]  // 8px
spacing[4]  // 16px
spacing[8]  // 32px
spacing.xs  // 4px (alias)
spacing.sm  // 8px (alias)
spacing.md  // 16px (alias)
spacing.lg  // 24px (alias)
// ... up to spacing[96] (384px)
```

### Typography

```tsx
import { fontSize, fontWeight, lineHeight } from 'zenxui'

fontSize.xs    // 12px
fontSize.sm    // 14px
fontSize.base  // 16px
fontSize.lg    // 18px
fontSize['2xl'] // 24px

fontWeight.normal    // '400'
fontWeight.medium    // '500'
fontWeight.semibold  // '600'
fontWeight.bold      // '700'

lineHeight.tight   // 1.25
lineHeight.normal  // 1.5
lineHeight.loose   // 2
```

### Border Radius

```tsx
import { borderRadius } from 'zenxui'

borderRadius.none  // 0
borderRadius.sm    // 2px
borderRadius.base  // 4px
borderRadius.md    // 6px
borderRadius.lg    // 8px
borderRadius.full  // 9999px
```

## Accessibility

All ZenUI components include built-in accessibility features:

### Button Accessibility
```tsx
<Button
  accessibilityLabel="Close modal"
  accessibilityRole="button"
  accessibilityState={{ disabled: false }}
>
  Close
</Button>
```

### Text Accessibility
```tsx
<Text accessibilityRole="header">
  Page Title
</Text>
```

## Styling Guide

### Custom Styles

You can extend components with custom styles:

```tsx
const customButtonStyle = {
  backgroundColor: '#custom-color',
  borderRadius: 12,
  paddingHorizontal: 24,
}

<Button style={customButtonStyle}>
  Custom Button
</Button>
```

### Responsive Design

```tsx
// Use conditional styling for different screen sizes
const isTablet = Dimensions.get('window').width > 768

<Box style={{
  padding: isTablet ? 32 : 16,
  flexDirection: isTablet ? 'row' : 'column'
}}>
  <Text>Responsive content</Text>
</Box>
```

### Platform Differences

```tsx
import { Platform } from 'react-native'

const platformStyle = {
  ...Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
    },
    android: {
      elevation: 4,
    },
    web: {
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.25)',
    },
  }),
}
```

## Performance Tips

### 1. Use React.memo for Complex Components

```tsx
import React from 'react'

const ExpensiveComponent = React.memo(({ data }) => {
  return (
    <Box>
      {/* Expensive rendering logic */}
    </Box>
  )
})
```

### 2. Optimize Re-renders

```tsx
const handlePress = useCallback(() => {
  // Handle press logic
}, [dependency])

<Button onPress={handlePress}>
  Optimized Button
</Button>
```

### 3. Use StyleSheet for Static Styles

```tsx
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  button: {
    backgroundColor: '#0ea5e9',
    borderRadius: 6,
  },
})
```

## Migration Guide

### From Other UI Libraries

#### From NativeBase:
```tsx
// Before (NativeBase)
<VStack space={4}>
  <Heading>Title</Heading>
  <Button colorScheme="blue">Action</Button>
</VStack>

// After (ZenUI)
<Box style={{ gap: 16 }}>
  <Text variant="heading">Title</Text>
  <Button colorScheme="primary">Action</Button>
</Box>
```

#### From React Native Elements:
```tsx
// Before (RNE)
<Header centerComponent={{ text: 'Title' }} />
<Button title="Click me" />

// After (ZenUI)
<Box style={{ padding: 16, alignItems: 'center' }}>
  <Text variant="heading">Title</Text>
</Box>
<Button>Click me</Button>
```

## Contributing

To contribute new components:

1. Follow the existing component patterns
2. Include TypeScript definitions
3. Add accessibility props
4. Include examples and documentation
5. Test on both React Native and Web

### Component Template

```tsx
import React from 'react'
import { View, ViewProps } from 'react-native'

export interface YourComponentProps extends ViewProps {
  // Your prop definitions
  variant?: 'default' | 'alternative'
  children?: React.ReactNode
}

export const YourComponent = React.forwardRef<View, YourComponentProps>(
  ({ variant = 'default', children, ...props }, ref) => {
    return (
      <View ref={ref} {...props}>
        {children}
      </View>
    )
  }
)

YourComponent.displayName = 'YourComponent'
```