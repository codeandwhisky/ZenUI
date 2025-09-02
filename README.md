# ZenUI

A cross-platform, utility-first, themeable design UI library for React Native and Web applications. ZenUI provides a comprehensive set of accessible, customizable components that work seamlessly across mobile and web platforms.

## 🌟 Features

- **Cross-Platform**: Works with React Native and Web (via react-native-web)
- **Utility-First**: Designed for maximum flexibility and customization
- **Accessible**: WCAG 2.1 compliant components with built-in accessibility features
- **TypeScript**: Full TypeScript support with intelligent IntelliSense
- **Themeable**: Comprehensive theming system with light/dark mode support
- **Modern**: Built with latest React patterns and best practices
- **Performant**: Optimized for fast rendering and minimal re-renders

## 🚀 Quick Start

### Installation

```bash
npm install @zenui/ui zenui-theme
# or
yarn add @zenui/ui zenui-theme
```

### Basic Usage

```tsx
import React from 'react'
import { ThemeProvider } from '@zenui/theme'
import { Box, Text, Button } from '@zenui/ui'

export default function App() {
  return (
    <ThemeProvider>
      <Box style={{ padding: 20 }}>
        <Text variant="heading">Welcome to ZenUI</Text>
        <Text variant="body">A beautiful, accessible UI library</Text>
        <Button variant="solid" colorScheme="primary">
          Get Started
        </Button>
      </Box>
    </ThemeProvider>
  )
}
```

## 📦 Components

### Primitives
- **Box** - Flexible container for layout
- **Text** - Typography-aware text component

### Actions
- **Button** - Pressable button with multiple variants

### Layout
- **Stack, HStack, VStack** - Layout components for arranging children

### Inputs
- **Input, Textarea** - Text input components
- **Checkbox, Switch, Radio** - Form controls

### Display
- **Avatar** - User profile images and initials
- **Badge** - Status indicators and labels
- **Progress** - Progress indicators
- **Skeleton** - Loading placeholders

### Overlay
- **Modal** - Dialog overlays
- **AlertDialog** - Confirmation dialogs
- **Toast** - Notification messages
- **Tooltip** - Contextual information

## 🎨 Theming

ZenUI includes a comprehensive theming system with design tokens:

```tsx
import { ThemeProvider, useTheme } from 'zenui-theme'

function MyComponent() {
  const { theme, colorMode, toggleColorMode } = useTheme()
  
  return (
    <Button onPress={toggleColorMode}>
      Switch to {colorMode === 'light' ? 'dark' : 'light'} mode
    </Button>
  )
}
```

### Design Tokens

```tsx
import { colors, spacing, fontSize, borderRadius } from 'zenui-theme'

const customStyle = {
  // nested or flattened access
  backgroundColor: colors.primary500,
  padding: spacing.md,
  borderRadius: borderRadius.md,
  fontSize: fontSize.lg,
}
```

## 📱 Component Examples

### Button

```tsx
import { Button } from '@zenui/ui'

function ButtonExample() {
  return (
    <>
      <Button variant="solid" colorScheme="primary">
        Primary Button
      </Button>
      <Button variant="outline" colorScheme="secondary">
        Secondary Button
      </Button>
      <Button variant="ghost" size="lg">
        Ghost Button
      </Button>
    </>
  )
}
```

### Text

```tsx
import { Text } from '@zenui/ui'

function TextExample() {
  return (
    <>
      <Text variant="heading">Main Heading</Text>
      <Text variant="subheading">Subheading</Text>
      <Text variant="body">Body text content</Text>
      <Text variant="caption">Caption text</Text>
    </>
  )
}
```

### Layout

```tsx
import { Box, VStack, HStack } from '@zenui/ui'

function LayoutExample() {
  return (
    <Box style={{ padding: 20 }}>
      <VStack space={16}>
        <Text>Vertical stack item 1</Text>
        <Text>Vertical stack item 2</Text>
        <HStack space={12}>
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </HStack>
      </VStack>
    </Box>
  )
}
```

## 🛠️ Customization

### Custom Theme

```tsx
import { ThemeProvider } from '@zenui/theme'

const customTheme = {
  colors: {
    primary: {
      500: '#your-primary-color',
      600: '#your-primary-dark',
    },
  },
}

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <YourApp />
    </ThemeProvider>
  )
}
```

### Styled Components

```tsx
import { Box, Text } from '@zenui/ui'

const Card = ({ children, ...props }) => (
  <Box
    style={{
      backgroundColor: '#ffffff',
      borderRadius: 8,
      padding: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    }}
    {...props}
  >
    {children}
  </Box>
)
```

## 🌐 Web Support

ZenUI works seamlessly with React Native Web:

```bash
npm install react-native-web
```

Configure your bundler (webpack/Next.js) to alias React Native components to React Native Web.

## 📚 Documentation

Visit our [documentation site](https://zenui-docs.example.com) for:
- Complete component API reference
- Advanced usage patterns
- Accessibility guidelines
- Migration guides
- Playground examples

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

Apache License 2.0 - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

ZenUI is inspired by and builds upon the excellent work of:
- [gluestack-ui](https://ui.gluestack.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [NativeWind](https://www.nativewind.dev/)
- [React Native](https://reactnative.dev/)

---

**Built with ❤️ for the React Native and Web community**