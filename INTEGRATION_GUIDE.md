# ZenUI Integration Guide

This guide will help you integrate ZenUI into your React Native or React Native Web project.

## Table of Contents

1. [Installation](#installation)
2. [React Native Setup](#react-native-setup)
3. [React Native Web Setup](#react-native-web-setup)
4. [Next.js Setup](#nextjs-setup)
5. [Expo Setup](#expo-setup)
6. [Theming Configuration](#theming-configuration)
7. [TypeScript Configuration](#typescript-configuration)
8. [Best Practices](#best-practices)

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

## React Native Setup

### 1. Basic Setup

In your main App component:

```tsx
// App.tsx
import React from 'react'
import { SafeAreaView } from 'react-native'
import { ThemeProvider } from 'zenxui'
import { Box, Text, Button } from 'zenui-ui'

export default function App() {
  return (
    <ThemeProvider initialColorMode="light">
      <SafeAreaView style={{ flex: 1 }}>
        <Box style={{ padding: 20, flex: 1 }}>
          <Text variant="heading">Welcome to ZenUI</Text>
          <Button 
            variant="solid" 
            colorScheme="primary"
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

## React Native Web Setup

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

### 5. Performance

```tsx
// Use React.memo for expensive components
import React from 'react'

export const ExpensiveComponent = React.memo(({ data }) => {
  // Component implementation
})

// Use useCallback for event handlers
const handlePress = useCallback(() => {
  // Handle press
}, [dependency])
```

## Troubleshooting

### Common Issues

1. **Metro bundler issues**: Clear cache with `npx react-native start --reset-cache`
2. **TypeScript errors**: Ensure peer dependencies are correctly installed
3. **Web compatibility**: Make sure react-native-web is properly configured

### Getting Help

- Check the [GitHub Issues](https://github.com/codeandwhisky/ZenUI/issues)
- Read the [API Documentation](https://zenui-docs.example.com)
- Join our [Discord Community](https://discord.gg/zenui)

---

Happy coding with ZenUI! 🚀