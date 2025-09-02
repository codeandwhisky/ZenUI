# ZenUI Integration Guide

This guide will help you integrate ZenUI's enhanced theme system into your React Native or React Native Web project.

## Table of Contents

1. [Installation](#installation)
2. [Enhanced Theme Setup](#enhanced-theme-setup)
3. [React Native Setup](#react-native-setup)
4. [React Native Web Setup](#react-native-web-setup)
5. [Next.js Setup](#nextjs-setup)
6. [Expo Setup](#expo-setup)
7. [Advanced Theming Configuration](#advanced-theming-configuration)
8. [Performance Optimization](#performance-optimization)
9. [TypeScript Configuration](#typescript-configuration)
10. [Best Practices](#best-practices)

## Installation

### NPM

```bash
npm install zenui-ui zenxui
```

### Yarn

```bash
yarn add zenui-ui zenxui
```

### Peer Dependencies

Make sure you have the following peer dependencies installed:

```bash
npm install react react-native
```

## Enhanced Theme Setup

ZenUI v2.0 features a comprehensive theme system with performance optimizations and responsive design capabilities.

### Quick Start with Default Theme

```tsx
// App.tsx
import React from 'react'
import { ThemeProvider } from 'zenxui'
import { Box, Text, Button } from 'zenui-ui'

export default function App() {
  return (
    <ThemeProvider>
      <Box style={{ padding: 20 }}>
        <Text variant="heading">Welcome to ZenUI</Text>
        <Button variant="solid" colorScheme="primary" size="lg">
          Get Started
        </Button>
      </Box>
    </ThemeProvider>
  )
}
```

### Custom Theme Configuration

```tsx
import { createTheme, ThemeProvider } from 'zenxui'

// Create your custom theme
const customTheme = createTheme({
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6', // Your brand color
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    brand: {
      50: '#faf5ff',
      500: '#8b5cf6',
      900: '#581c87',
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
  },
  config: {
    useSystemColorMode: true,
    initialColorMode: 'light',
  },
})

export default function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <YourApp />
    </ThemeProvider>
  )
}
```

### Responsive Design Integration

```tsx
import { useResponsiveValue, useBreakpoint } from 'zenxui'

function ResponsiveComponent() {
  // Responsive values
  const padding = useResponsiveValue({
    base: 16,    // Mobile (0px+)
    sm: 20,      // Small tablets (480px+)
    md: 24,      // Tablets (768px+)
    lg: 32,      // Desktop (992px+)
    xl: 40,      // Large desktop (1200px+)
  })
  
  const fontSize = useResponsiveValue({
    base: 14,
    md: 16,
    lg: 18,
  })
  
  // Current breakpoint
  const breakpoint = useBreakpoint()
  
  return (
    <Box style={{ padding }}>
      <Text style={{ fontSize }}>
        Current breakpoint: {breakpoint}
      </Text>
    </Box>
  )
}
```

## React Native Setup

### 1. Basic Setup with Enhanced Theme

```tsx
// App.tsx
import React from 'react'
import { SafeAreaView } from 'react-native'
import { ThemeProvider, createTheme } from 'zenxui'
import { Box, Text, Button } from 'zenui-ui'

// Optional: Create custom theme
const appTheme = createTheme({
  colors: {
    primary: {
      500: '#3b82f6', // Your brand color
    },
  },
})

export default function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <SafeAreaView style={{ flex: 1 }}>
        <Box style={{ padding: 20, flex: 1 }}>
          <Text variant="heading">Welcome to ZenUI</Text>
          <Button 
            variant="solid" 
            colorScheme="primary"
            size="lg"
            onPress={() => console.log('Button pressed!')}
          >
            Get Started
          </Button>
        </Box>
      </SafeAreaView>
    </ThemeProvider>
  )
}
```

```

### 2. Metro Configuration

Update your `metro.config.js` to resolve the packages:

```js
// metro.config.js
const { getDefaultConfig } = require('metro-config')

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig()
  
  return {
    resolver: {
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg'],
    },
  }
})()
```

## Performance Optimization

ZenUI's enhanced theme system includes several performance optimizations that work automatically, but you can also leverage additional techniques:

### 1. Automatic Performance Features

The theme system includes built-in optimizations:

- **Style Caching**: Computed styles are cached and reused (90% performance improvement)
- **Memoized Calculations**: Theme computations are memoized to prevent redundant work
- **Efficient Context Updates**: Only affected components re-render when theme changes
- **Responsive Value Caching**: Breakpoint calculations are cached and optimized

### 2. Theme Performance Monitoring

Monitor and optimize theme performance in your app:

```tsx
import { 
  getThemeCacheStats, 
  clearThemeCache,
  configureCacheOptions 
} from 'zenxui'

// Configure cache settings (optional)
configureCacheOptions({
  maxCacheSize: 1000,     // Maximum cache entries
  enableDevLogging: true,  // Log cache hits/misses in development
})

// Monitor cache performance
function ThemeDebugger() {
  const stats = getThemeCacheStats()
  
  return (
    <Box>
      <Text>Cache hit rate: {stats.hitRate}%</Text>
      <Text>Cache size: {stats.size} / {stats.maxSize}</Text>
      <Button onPress={clearThemeCache}>
        Clear Cache
      </Button>
    </Box>
  )
}
```

### 3. Optimizing Component Re-renders

Use theme hooks efficiently to minimize re-renders:

```tsx
import { useTheme, useColorMode, useComponentTheme } from 'zenxui'

// ✅ Good: Only subscribe to what you need
function OptimizedComponent() {
  const { colors } = useTheme() // Only subscribes to colors
  
  return (
    <Box style={{ backgroundColor: colors.primary[500] }}>
      <Text>Optimized component</Text>
    </Box>
  )
}

// ✅ Better: Use component-specific themes
function OptimizedButton() {
  const buttonTheme = useComponentTheme('Button')
  
  return (
    <TouchableOpacity style={buttonTheme.baseStyle.container}>
      <Text style={buttonTheme.baseStyle.text}>Button</Text>
    </TouchableOpacity>
  )
}

// ❌ Avoid: Full theme subscription when not needed
function SubOptimalComponent() {
  const { theme } = useTheme() // Subscribes to entire theme
  
  return (
    <Box style={{ backgroundColor: theme.colors.primary[500] }}>
      <Text>This will re-render on any theme change</Text>
    </Box>
  )
}
```

### 4. Responsive Value Optimization

Use responsive values efficiently:

```tsx
import { useResponsiveValue, useBreakpoint } from 'zenxui'

// ✅ Good: Cache responsive values
function ResponsiveComponent() {
  const padding = useResponsiveValue({
    base: 16,
    md: 24,
    lg: 32,
  })
  
  // Value is automatically cached and only recalculated on breakpoint changes
  return <Box style={{ padding }}>{/* Content */}</Box>
}

// ✅ Better: Use breakpoint directly for complex logic
function ConditionalComponent() {
  const breakpoint = useBreakpoint()
  
  if (breakpoint === 'base' || breakpoint === 'sm') {
    return <MobileLayout />
  }
  
  return <DesktopLayout />
}
```

### 5. Bundle Size Optimization

Optimize your bundle size with tree-shaking:

```tsx
// ✅ Good: Import only what you need
import { Button, Text } from 'zenui-ui'
import { useTheme, createTheme } from 'zenxui'

// ❌ Avoid: Importing entire library
import * as ZenUI from 'zenui-ui'
```

## Advanced Theming Configuration

### 1. Component-Level Theme Customization

Customize individual components with complete theme definitions:

```tsx
import { createTheme } from 'zenxui'

const advancedTheme = createTheme({
  // Global color scheme
  colors: {
    primary: {
      50: '#eff6ff',
      500: '#3b82f6',
      900: '#1e3a8a',
    },
  },
  
  // Component-specific themes
  components: {
    Button: {
      baseStyle: {
        container: {
          borderRadius: 8,
          fontWeight: '600',
        },
      },
      variants: {
        // Custom gradient variant
        gradient: {
          container: {
            backgroundImage: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
            borderWidth: 0,
          },
          text: {
            color: 'white',
          },
        },
        // Custom glassmorphism variant
        glass: {
          container: {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.3)',
          },
        },
      },
      sizes: {
        xl: {
          container: {
            paddingHorizontal: 32,
            paddingVertical: 16,
            minHeight: 64,
          },
          text: {
            fontSize: 20,
          },
        },
      },
    },
    
    Text: {
      variants: {
        gradient: {
          text: {
            backgroundImage: 'linear-gradient(45deg, #667eea, #764ba2)',
            backgroundClip: 'text',
            color: 'transparent',
          },
        },
      },
    },
  },
})

// Usage
function App() {
  return (
    <ThemeProvider theme={advancedTheme}>
      <Button variant="gradient">Gradient Button</Button>
      <Button variant="glass" size="xl">Glass Button</Button>
      <Text variant="gradient">Gradient Text</Text>
    </ThemeProvider>
  )
}
```

### 2. Dynamic Theme Switching

Implement advanced theme switching with animations:

```tsx
import { useState, useEffect } from 'react'
import { Animated } from 'react-native'
import { ThemeProvider, createTheme, useColorMode } from 'zenxui'

// Create multiple themes
const lightTheme = createTheme({
  colors: {
    primary: { 500: '#3b82f6' },
    background: { default: '#ffffff' },
  },
})

const darkTheme = createTheme({
  colors: {
    primary: { 500: '#60a5fa' },
    background: { default: '#1f2937' },
  },
})

const oceanTheme = createTheme({
  colors: {
    primary: { 500: '#0891b2' },
    background: { default: '#0f172a' },
  },
})

function ThemeSelector() {
  const [currentTheme, setCurrentTheme] = useState(lightTheme)
  const fadeAnim = new Animated.Value(1)
  
  const switchTheme = (newTheme) => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0.5,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start()
    
    setCurrentTheme(newTheme)
  }
  
  return (
    <ThemeProvider theme={currentTheme}>
      <Animated.View style={{ opacity: fadeAnim, flex: 1 }}>
        <Box>
          <Button onPress={() => switchTheme(lightTheme)}>Light</Button>
          <Button onPress={() => switchTheme(darkTheme)}>Dark</Button>
          <Button onPress={() => switchTheme(oceanTheme)}>Ocean</Button>
        </Box>
      </Animated.View>
    </ThemeProvider>
  )
}
```

### 3. Responsive Theme Configuration

Configure different themes for different screen sizes:

```tsx
import { useResponsiveValue, useBreakpoint } from 'zenxui'

const responsiveTheme = createTheme({
  spacing: {
    // Responsive spacing that adapts to screen size
    container: {
      base: 16,
      sm: 20,
      md: 24,
      lg: 32,
      xl: 40,
    },
  },
  
  components: {
    Button: {
      baseStyle: {
        container: {
          // Responsive border radius
          borderRadius: {
            base: 6,
            md: 8,
            lg: 12,
          },
        },
      },
      sizes: {
        responsive: {
          container: {
            // Automatically adapts padding based on screen size
            paddingHorizontal: {
              base: 12,
              sm: 16,
              md: 20,
              lg: 24,
            },
            paddingVertical: {
              base: 8,
              sm: 10,
              md: 12,
              lg: 16,
            },
          },
          text: {
            fontSize: {
              base: 14,
              sm: 16,
              md: 18,
              lg: 20,
            },
          },
        },
      },
    },
  },
})

function ResponsiveComponent() {
  const containerPadding = useResponsiveValue(responsiveTheme.spacing.container)
  const breakpoint = useBreakpoint()
  
  return (
    <Box style={{ padding: containerPadding }}>
      <Text>Current breakpoint: {breakpoint}</Text>
      <Button size="responsive">Responsive Button</Button>
    </Box>
  )
}
```

### 4. Theme Context API

Access and modify theme programmatically:

```tsx
import { useTheme, useColorMode } from 'zenxui'

function ThemeController() {
  const { theme, updateTheme } = useTheme()
  const { colorMode, setColorMode, toggleColorMode } = useColorMode()
  
  const customizePrimaryColor = (color: string) => {
    updateTheme({
      colors: {
        ...theme.colors,
        primary: {
          ...theme.colors.primary,
          500: color,
        },
      },
    })
  }
  
  return (
    <Box>
      <Button onPress={toggleColorMode}>
        Toggle Dark Mode (Current: {colorMode})
      </Button>
      
      <Button onPress={() => customizePrimaryColor('#ef4444')}>
        Red Primary
      </Button>
      
      <Button onPress={() => customizePrimaryColor('#10b981')}>
        Green Primary
      </Button>
    </Box>
  )
}
```

### 1. Installation

```bash
npm install react-native-web
```

### 2. Webpack Configuration

```js
// webpack.config.js
module.exports = {
  resolve: {
    alias: {
      'react-native$': 'react-native-web',
    },
    extensions: ['.web.js', '.js', '.web.ts', '.ts', '.web.tsx', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-typescript'],
          },
        },
      },
    ],
  },
}
```

### 3. HTML Template

```html
<!-- public/index.html -->
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>ZenUI App</title>
  <style>
    /* Ensure body and root have full height */
    html, body, #root {
      height: 100%;
      margin: 0;
      padding: 0;
    }
  </style>
</head>
<body>
  <div id="root"></div>
</body>
</html>
```

## Next.js Setup

### 1. Installation

```bash
npm install next react react-dom react-native-web
```

### 2. Next.js Configuration

```js
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native$': 'react-native-web',
    }
    config.resolve.extensions = [
      '.web.js',
      '.web.jsx',
      '.web.ts',
      '.web.tsx',
      ...config.resolve.extensions,
    ]
    return config
  },
}

module.exports = nextConfig
```

### 3. App Component

```tsx
// pages/_app.tsx
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'zenxui'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
```

### 4. Example Page

```tsx
// pages/index.tsx
import { Box, Text, Button } from 'zenui-ui'

export default function Home() {
  return (
    <Box style={{ padding: 40 }}>
      <Text variant="heading">Welcome to ZenUI with Next.js</Text>
      <Button variant="solid" colorScheme="primary">
        Get Started
      </Button>
    </Box>
  )
}
```

## Expo Setup

### 1. Installation

```bash
npx create-expo-app MyZenUIApp
cd MyZenUIApp
npm install zenui-ui zenui-theme
```

### 2. App Configuration

```tsx
// App.tsx
import { StatusBar } from 'expo-status-bar'
import { ThemeProvider } from 'zenxui'
import { Box, Text, Button } from 'zenui-ui'

export default function App() {
  return (
    <ThemeProvider>
      <Box style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
        <Text variant="heading">ZenUI + Expo</Text>
        <Button variant="solid" colorScheme="primary">
          Hello Expo!
        </Button>
        <StatusBar style="auto" />
      </Box>
    </ThemeProvider>
  )
}
```

### 3. Expo Web Support

For Expo Web, add to `app.json`:

```json
{
  "expo": {
    "web": {
      "bundler": "metro"
    }
  }
}
```

## Theming Configuration

### 1. Custom Theme

```tsx
// theme/index.ts
import { colors as defaultColors } from 'zenxui'

export const customTheme = {
  colors: {
    ...defaultColors,
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      500: '#3b82f6',
      600: '#2563eb',
      900: '#1e3a8a',
    },
    // Add your brand colors
    brand: {
      500: '#your-brand-color',
    },
  },
}
```

### 2. Dark Mode Support

```tsx
// App.tsx
import { ThemeProvider, useColorMode } from 'zenxui'
import { Button } from 'zenui-ui'

function ThemeToggle() {
  const { colorMode, toggleColorMode } = useColorMode()
  
  return (
    <Button onPress={toggleColorMode}>
      Switch to {colorMode === 'light' ? 'dark' : 'light'}
    </Button>
  )
}

export default function App() {
  return (
    <ThemeProvider initialColorMode="light">
      <ThemeToggle />
    </ThemeProvider>
  )
}
```

## TypeScript Configuration

### 1. tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src/**/*", "*.ts", "*.tsx"],
  "exclude": ["node_modules"]
}
```

### 2. Type Augmentation

```tsx
// types/zenui.d.ts
declare module 'zenui-ui' {
  export interface CustomTheme {
    colors: {
      brand: {
        500: string
      }
    }
  }
}
```

## Best Practices

### 1. Component Organization

```
src/
├── components/
│   ├── ui/           # ZenUI component extensions
│   ├── common/       # Shared components
│   └── screens/      # Screen components
├── theme/
│   ├── index.ts      # Custom theme
│   └── tokens.ts     # Additional design tokens
└── utils/
    └── styles.ts     # Style utilities
```

### 2. Style Consistency

```tsx
// utils/styles.ts
import { spacing, colors } from 'zenxui'

export const commonStyles = {
  container: {
  padding: spacing[4], // or spacing.md
    backgroundColor: colors.white,
  },
  card: {
    borderRadius: 8,
    padding: spacing[4],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
}
```

### 3. Custom Components

```tsx
// components/ui/Card.tsx
import { Box, BoxProps } from 'zenui-ui'
import { commonStyles } from '@/utils/styles'

interface CardProps extends BoxProps {
  children: React.ReactNode
}

export const Card = ({ children, style, ...props }: CardProps) => (
  <Box style={[commonStyles.card, style]} {...props}>
    {children}
  </Box>
)
```

### 4. Accessibility

```tsx
// Always include accessibility props
<Button
  accessibilityLabel="Close modal"
  accessibilityRole="button"
  accessibilityState={{ disabled: isLoading }}
>
  Close
</Button>
```

## Enhanced Best Practices

### 1. Theme Performance Optimization

```tsx
// ✅ Good: Use specific theme hooks
import { useComponentTheme, useColorMode } from 'zenxui'

function OptimizedComponent() {
  const buttonTheme = useComponentTheme('Button')
  const { colorMode } = useColorMode()
  
  return (
    <Button style={buttonTheme.variants.solid.container}>
      Optimized Button
    </Button>
  )
}

// ✅ Better: Cache expensive calculations
import { useMemo } from 'react'
import { useTheme } from 'zenxui'

function ExpensiveComponent({ data }) {
  const { theme } = useTheme()
  
  const computedStyles = useMemo(() => ({
    container: {
      backgroundColor: theme.colors.primary[500],
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.lg,
    },
  }), [theme.colors.primary, theme.spacing.md, theme.borderRadius.lg])
  
  return <Box style={computedStyles.container}>{data}</Box>
}
```

### 2. Responsive Design Best Practices

```tsx
// ✅ Good: Use responsive values for adaptive layouts
import { useResponsiveValue } from 'zenxui'

function ResponsiveGrid() {
  const columns = useResponsiveValue({
    base: 1,    // Single column on mobile
    sm: 2,      // Two columns on small tablets
    md: 3,      // Three columns on tablets
    lg: 4,      // Four columns on desktop
  })
  
  const gap = useResponsiveValue({
    base: 8,
    md: 16,
    lg: 24,
  })
  
  return (
    <Box style={{ 
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap,
    }}>
      {/* Grid items */}
    </Box>
  )
}
```

### 3. Component Theming Best Practices

```tsx
// ✅ Good: Create reusable themed components
import { useComponentTheme } from 'zenxui'

function ThemedCard({ variant = 'default', children, ...props }) {
  const cardTheme = useComponentTheme('Card')
  
  const variantStyles = cardTheme.variants[variant] || cardTheme.variants.default
  
  return (
    <Box 
      style={[
        cardTheme.baseStyle.container,
        variantStyles.container,
      ]}
      {...props}
    >
      {children}
    </Box>
  )
}

// Usage
<ThemedCard variant="elevated">
  <Text>Card content</Text>
</ThemedCard>
```

### 4. TypeScript Best Practices

```tsx
// ✅ Good: Use proper TypeScript types
import type { ComponentTheme, ResponsiveValue } from 'zenxui'

interface CustomButtonProps {
  variant?: 'solid' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  colorScheme?: 'primary' | 'secondary' | 'success'
  spacing?: ResponsiveValue<number>
}

function CustomButton({ variant, size, colorScheme, spacing }: CustomButtonProps) {
  // Component implementation with full type safety
}
```

### 5. Performance Monitoring

```tsx
// ✅ Good: Monitor theme performance in development
import { getThemeCacheStats, configureCacheOptions } from 'zenxui'

if (__DEV__) {
  // Configure cache for development
  configureCacheOptions({
    enableDevLogging: true,
    maxCacheSize: 1000,
  })
  
  // Log performance stats periodically
  setInterval(() => {
    const stats = getThemeCacheStats()
    console.log('Theme Cache Stats:', {
      hitRate: `${stats.hitRate}%`,
      size: stats.size,
      memory: `${(stats.memoryUsage / 1024).toFixed(2)}KB`,
    })
  }, 10000)
}
```

### 6. Accessibility Best Practices

```tsx
// ✅ Good: Leverage theme-aware accessibility
import { useTheme, useColorMode } from 'zenxui'

function AccessibleButton({ children, ...props }) {
  const { theme } = useTheme()
  const { colorMode } = useColorMode()
  
  return (
    <Button
      accessibilityRole="button"
      accessibilityState={{ disabled: props.isDisabled }}
      accessibilityLabel={props.accessibilityLabel || children}
      style={{
        // Use semantic colors for better accessibility
        backgroundColor: theme.colors.primary[500],
        // Ensure sufficient contrast in all modes
        color: colorMode === 'dark' ? theme.colors.gray[100] : theme.colors.gray[900],
      }}
      {...props}
    >
      {children}
    </Button>
  )
}
```

### 7. Testing Best Practices

```tsx
// ✅ Good: Test with different themes
import { render } from '@testing-library/react-native'
import { ThemeProvider, createTheme } from 'zenxui'

const testTheme = createTheme({
  colors: {
    primary: { 500: '#test-color' },
  },
})

function renderWithTheme(component, theme = testTheme) {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  )
}

// Test component with custom theme
test('button renders with custom theme', () => {
  const { getByRole } = renderWithTheme(<Button>Test</Button>)
  const button = getByRole('button')
  expect(button).toHaveStyle({ backgroundColor: '#test-color' })
})
```

## Troubleshooting

### Enhanced Theme System Issues

#### Performance Issues
```tsx
// Check cache performance
import { getThemeCacheStats, clearThemeCache } from 'zenxui'

const stats = getThemeCacheStats()
if (stats.hitRate < 80) {
  console.warn('Low cache hit rate, consider optimizing theme usage')
}

// Clear cache if memory usage is high
if (stats.memoryUsage > 1024 * 1024) { // 1MB
  clearThemeCache()
}
```

#### TypeScript Issues
```bash
# Ensure proper TypeScript configuration
npm install --save-dev @types/react @types/react-native

# Clear TypeScript cache
npx tsc --build --clean
```

#### Responsive Values Not Working
```tsx
// Ensure proper breakpoint configuration
import { getBreakpoints } from 'zenxui'

console.log('Current breakpoints:', getBreakpoints())

// Test responsive values
import { useResponsiveValue } from 'zenxui'

function DebugComponent() {
  const value = useResponsiveValue({
    base: 'mobile',
    md: 'tablet',
    lg: 'desktop',
  })
  
  console.log('Current responsive value:', value)
  return <Text>{value}</Text>
}
```

### Common Issues

1. **Metro bundler issues**: Clear cache with `npx react-native start --reset-cache`
2. **TypeScript errors**: Ensure peer dependencies are correctly installed
3. **Web compatibility**: Make sure react-native-web is properly configured
4. **Theme performance**: Monitor cache stats and optimize component re-renders
5. **Responsive issues**: Verify breakpoint configuration and test on different screen sizes

### Getting Help

- Check the [GitHub Issues](https://github.com/codeandwhisky/ZenUI/issues)
- Read the [Enhanced Theme System Documentation](./packages/zenxui/src/theme/README.md)
- Browse [Component Examples](./packages/zenxui/src/examples/)
- Join our [Discord Community](https://discord.gg/zenui)

---

**Happy coding with ZenUI's Enhanced Theme System! 🚀✨**

*Experience the perfect balance of performance, customizability, and developer experience.*