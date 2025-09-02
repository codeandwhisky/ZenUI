# ZenUI Component API Reference

## Core Components

### Box

A flexible container component that serves as the foundation for layout.

```tsx
import { Box } from '@zenui/ui'

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
import { Text } from '@zenui/ui'

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

### Button

Pressable button component with multiple variants and sizes.

```tsx
import { Button } from '@zenui/ui'

interface ButtonProps extends Omit<PressableProps, 'style'> {
  variant?: 'solid' | 'outline'
  colorScheme?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  style?: ViewStyle
  children?: React.ReactNode
}
```

**Variants:**
- `solid` - Filled button with background color
- `outline` - Transparent button with border

**Color Schemes:**
- `primary` - Blue color scheme (#0ea5e9)
- `secondary` - Gray color scheme (#64748b)

**Sizes:**
- `sm` - Small button (padding: 12x8px)
- `md` - Medium button (padding: 16x12px) 
- `lg` - Large button (padding: 24x16px)

**Example:**
```tsx
<Button 
  variant="solid" 
  colorScheme="primary" 
  size="md"
  onPress={() => console.log('Pressed!')}
>
  Click Me
</Button>

<Button variant="outline" colorScheme="secondary">
  Secondary Action
</Button>
```

## Theme System

### ThemeProvider

Provides theme context to all child components.

```tsx
import { ThemeProvider } from '@zenui/theme'

interface ThemeProviderProps {
  children: ReactNode
  initialColorMode?: 'light' | 'dark'
}
```

**Example:**
```tsx
import { ThemeProvider } from '@zenui/theme'

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
import { useTheme } from '@zenui/theme'

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
import { useColorMode } from '@zenui/theme'

const { colorMode, toggleColorMode, setColorMode } = useColorMode()
```

## Design Tokens

### Colors

```tsx
import { colors } from '@zenui/theme'

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
import { spacing } from '@zenui/theme'

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
import { fontSize, fontWeight, lineHeight } from '@zenui/theme'

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
import { borderRadius } from '@zenui/theme'

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