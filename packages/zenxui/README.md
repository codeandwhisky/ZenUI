# ZenXUI Core

A powerful, cross-platform design system core for React Native and React Native Web. ZenXUI Core provides design tokens, theming utilities, and essential UI components that work seamlessly across mobile and web platforms.

[![npm version](https://badge.fury.io/js/zenxui.svg)](https://badge.fury.io/js/zenxui)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

---

## ✨ Features

- 🎨 **Design Tokens** - Consistent colors, spacing, typography, and more
- 🧩 **Essential Components** - Pre-built, accessible UI components
- 🌗 **Theme System** - Light/dark mode support out of the box
- 🛠️ **Utility Classes** - Tailwind-inspired utility system
- 📱 **Mobile-First** - Optimized for touch interfaces and performance
- 🌐 **Cross-Platform** - Works on React Native, React Native Web, and Expo
- 🎯 **TypeScript** - Full type safety with excellent IntelliSense
- ♿ **Accessible** - Built with accessibility best practices

---

## 🚀 Quick Start

### Installation

```bash
npm install zenxui
# or
yarn add zenxui
# or
pnpm add zenxui
```

### Basic Setup

Wrap your app with the `ThemeProvider`:

```tsx
import React from 'react';
import { ThemeProvider } from 'zenxui';
import { SafeAreaView } from 'react-native';

export default function App() {
  return (
    <ThemeProvider initialColorMode="light">
      <SafeAreaView style={{ flex: 1 }}>
        {/* Your app content */}
      </SafeAreaView>
    </ThemeProvider>
  );
}
```

### Your First Component

```tsx
import React from 'react';
import { Box, Text, Button, Stack } from 'zenxui';

export function WelcomeScreen() {
  return (
    <Box className="flex-1 p-lg bg-gray50">
      <Stack spacing={16} className="items-center justify-center flex-1">
        <Text className="text-2xl font-bold text-gray900">
          Welcome to ZenXUI!
        </Text>
        <Text className="text-base text-gray600 text-center">
          Build beautiful, accessible apps with ease
        </Text>
        <Button 
          variant="solid" 
          colorScheme="primary"
          onPress={() => console.log('Getting started!')}
        >
          Get Started
        </Button>
      </Stack>
    </Box>
  );
}
```

---

## 🎨 Design Tokens

ZenXUI Core provides a comprehensive set of design tokens for consistent styling across your app.

### Colors

```tsx
import { colors } from 'zenxui';

// Access colors in nested format
colors.primary[500]   // #3B82F6
colors.gray[100]      // #F3F4F6
colors.success[600]   // #059669

// Or use flattened format
colors.primary500     // #3B82F6
colors.gray100        // #F3F4F6
colors.success600     // #059669

// Available color palettes
const availableColors = [
  'primary', 'secondary', 'success', 'warning', 
  'error', 'info', 'gray', 'white', 'black'
];
```

### Spacing

```tsx
import { spacing } from 'zenxui';

// Numeric spacing (4px increments)
spacing[1]    // 4px
spacing[2]    // 8px
spacing[4]    // 16px
spacing[8]    // 32px

// Named spacing aliases
spacing.xs    // 4px
spacing.sm    // 8px
spacing.md    // 16px
spacing.lg    // 24px
spacing.xl    // 32px
spacing['2xl'] // 48px
```

### Typography

```tsx
import { fontSize, fontWeight, lineHeight } from 'zenxui';

// Font sizes
fontSize.xs       // 12px
fontSize.sm       // 14px
fontSize.base     // 16px
fontSize.lg       // 18px
fontSize.xl       // 20px
fontSize['2xl']   // 24px

// Font weights
fontWeight.normal     // '400'
fontWeight.medium     // '500'
fontWeight.semibold   // '600'
fontWeight.bold       // '700'

// Line heights
lineHeight.tight   // 1.25
lineHeight.normal  // 1.5
lineHeight.loose   // 2
```

### Border Radius

```tsx
import { borderRadius } from 'zenxui';

borderRadius.none    // 0
borderRadius.sm      // 2px
borderRadius.base    // 4px
borderRadius.md      // 6px
borderRadius.lg      // 8px
borderRadius.xl      // 12px
borderRadius.full    // 9999px
```

---

## 🌗 Theme System

### Basic Theme Usage

```tsx
import { useTheme } from 'zenxui';

function MyComponent() {
  const { theme, colorMode } = useTheme();
  
  return (
    <View style={{
      backgroundColor: theme.colors.background,
      padding: theme.spacing.md,
    }}>
      <Text>Current mode: {colorMode}</Text>
    </View>
  );
}
```

### Color Mode Toggle

```tsx
import { useColorMode } from 'zenxui';
import { Button } from 'zenxui';

function ThemeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();
  
  return (
    <Button onPress={toggleColorMode}>
      Switch to {colorMode === 'light' ? 'dark' : 'light'} mode
    </Button>
  );
}
```

### Custom Theme

```tsx
import { ThemeProvider, colors } from 'zenxui';

const customTheme = {
  colors: {
    ...colors,
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      500: '#3b82f6',
      600: '#2563eb',
      900: '#1e3a8a',
    },
    brand: {
      500: '#8B5CF6',
      600: '#7C3AED',
    },
  },
};

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      {/* Your app */}
    </ThemeProvider>
  );
}
```

---

## 🧩 Components

### Box - The Foundation

```tsx
import { Box } from 'zenxui';

function Example() {
  return (
    <Box 
      className="p-lg bg-white rounded-lg shadow-md"
      style={{ minHeight: 100 }}
    >
      <Text>Content goes here</Text>
    </Box>
  );
}
```

### Text - Typography Made Easy

```tsx
import { Text } from 'zenxui';

function TextExample() {
  return (
    <>
      <Text className="text-2xl font-bold text-gray900">
        Main Heading
      </Text>
      <Text className="text-lg font-medium text-gray700">
        Subheading
      </Text>
      <Text className="text-base text-gray600">
        Body text content with good readability
      </Text>
      <Text className="text-sm text-gray500">
        Caption or helper text
      </Text>
    </>
  );
}
```

### Button - Interactive Elements

```tsx
import { Button } from 'zenxui';

function ButtonExample() {
  return (
    <Stack spacing={12}>
      {/* Primary Actions */}
      <Button variant="solid" colorScheme="primary">
        Primary Action
      </Button>
      
      {/* Secondary Actions */}
      <Button variant="outline" colorScheme="primary">
        Secondary Action
      </Button>
      
      {/* Subtle Actions */}
      <Button variant="ghost" colorScheme="gray">
        Subtle Action
      </Button>
      
      {/* Different Sizes */}
      <Button size="sm">Small Button</Button>
      <Button size="md">Medium Button</Button>
      <Button size="lg">Large Button</Button>
      
      {/* Loading State */}
      <Button loading>Loading...</Button>
      
      {/* Disabled State */}
      <Button disabled>Disabled</Button>
    </Stack>
  );
}
```

### Input - Form Elements

```tsx
import { Input, Stack } from 'zenxui';

function FormExample() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  return (
    <Stack spacing={16}>
      <Input
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <Input
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <Input
        placeholder="Disabled input"
        disabled
      />
      
      <Input
        placeholder="With error"
        error="This field is required"
      />
    </Stack>
  );
}
```

### Stack - Layout Management

```tsx
import { Stack, Box, Text } from 'zenxui';

function LayoutExample() {
  return (
    <>
      {/* Vertical Stack */}
      <Stack spacing={16} direction="column">
        <Box className="p-md bg-blue100 rounded">Item 1</Box>
        <Box className="p-md bg-blue100 rounded">Item 2</Box>
        <Box className="p-md bg-blue100 rounded">Item 3</Box>
      </Stack>
      
      {/* Horizontal Stack */}
      <Stack spacing={12} direction="row" className="mt-lg">
        <Box className="p-md bg-green100 rounded flex-1">Left</Box>
        <Box className="p-md bg-green100 rounded flex-1">Right</Box>
      </Stack>
      
      {/* Centered Stack */}
      <Stack 
        spacing={8} 
        className="items-center justify-center flex-1"
      >
        <Text>Centered content</Text>
        <Button>Action</Button>
      </Stack>
    </>
  );
}
```

### Avatar - User Representation

```tsx
import { Avatar, Stack } from 'zenxui';

function AvatarExample() {
  return (
    <Stack spacing={16} direction="row">
      {/* Different Sizes */}
      <Avatar size={32} name="John Doe" />
      <Avatar size={48} name="Jane Smith" />
      <Avatar size={64} name="Bob Johnson" />
      
      {/* With Image */}
      <Avatar 
        size={48} 
        name="Sarah Wilson"
        source={{ uri: 'https://example.com/avatar.jpg' }}
      />
      
      {/* Different Variants */}
      <Avatar size={48} name="Mike Davis" variant="rounded" />
    </Stack>
  );
}
```

### Badge - Status Indicators

```tsx
import { Badge, Stack, Text } from 'zenxui';

function BadgeExample() {
  return (
    <Stack spacing={12}>
      {/* Different Variants */}
      <Stack spacing={8} direction="row">
        <Badge variant="solid" colorScheme="primary">New</Badge>
        <Badge variant="outline" colorScheme="success">Active</Badge>
        <Badge variant="subtle" colorScheme="warning">Pending</Badge>
      </Stack>
      
      {/* Different Sizes */}
      <Stack spacing={8} direction="row">
        <Badge size="sm">Small</Badge>
        <Badge size="md">Medium</Badge>
        <Badge size="lg">Large</Badge>
      </Stack>
      
      {/* With Text */}
      <Stack spacing={8} direction="row" className="items-center">
        <Text>Status:</Text>
        <Badge colorScheme="success">Online</Badge>
      </Stack>
    </Stack>
  );
}
```

### Modal - Overlays

```tsx
import { Modal, Button, Text, Stack } from 'zenxui';
import { useState } from 'react';

function ModalExample() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <Button onPress={() => setIsOpen(true)}>
        Open Modal
      </Button>
      
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Stack spacing={16} className="p-lg">
          <Text className="text-xl font-bold">Modal Title</Text>
          <Text className="text-base text-gray600">
            This is a modal with some content.
          </Text>
          <Stack spacing={8} direction="row">
            <Button 
              variant="outline" 
              onPress={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button onPress={() => setIsOpen(false)}>
              Confirm
            </Button>
          </Stack>
        </Stack>
      </Modal>
    </>
  );
}
```

### Spinner - Loading States

```tsx
import { Spinner, Stack, Button, Text } from 'zenxui';

function SpinnerExample() {
  return (
    <Stack spacing={16}>
      {/* Different Sizes */}
      <Stack spacing={8} direction="row" className="items-center">
        <Spinner size="sm" />
        <Spinner size="md" />
        <Spinner size="lg" />
      </Stack>
      
      {/* Different Colors */}
      <Stack spacing={8} direction="row" className="items-center">
        <Spinner colorScheme="primary" />
        <Spinner colorScheme="success" />
        <Spinner colorScheme="warning" />
      </Stack>
      
      {/* With Text */}
      <Stack spacing={8} direction="row" className="items-center">
        <Spinner size="sm" />
        <Text>Loading...</Text>
      </Stack>
    </Stack>
  );
}
```

---

## 🛠️ Utility Classes

ZenXUI Core includes a Tailwind-inspired utility class system for rapid styling:

### Spacing Utilities

```tsx
// Padding
<Box className="p-md">Padding medium</Box>
<Box className="px-lg py-sm">Horizontal large, vertical small</Box>
<Box className="pt-xl pr-md pb-lg pl-sm">Individual sides</Box>

// Margin
<Box className="m-lg">Margin large</Box>
<Box className="mx-auto">Horizontal auto margin</Box>
<Box className="mt-sm mb-md">Top small, bottom medium</Box>
```

### Layout Utilities

```tsx
// Flexbox
<Box className="flex flex-row items-center justify-between">
  <Text>Start</Text>
  <Text>End</Text>
</Box>

<Box className="flex flex-col items-stretch">
  <Box>Item 1</Box>
  <Box>Item 2</Box>
</Box>

// Dimensions
<Box className="w-full h-32">Full width, height 32</Box>
<Box className="w-md h-lg">Width medium, height large</Box>
```

### Color Utilities

```tsx
// Background colors
<Box className="bg-primary500">Primary background</Box>
<Box className="bg-gray100">Light gray background</Box>

// Text colors
<Text className="text-primary600">Primary text</Text>
<Text className="text-gray700">Dark gray text</Text>
```

### Border Utilities

```tsx
// Border radius
<Box className="rounded">Default rounded</Box>
<Box className="rounded-lg">Large rounded</Box>
<Box className="rounded-full">Fully rounded</Box>
```

### Shadow Utilities

```tsx
// Shadows
<Box className="shadow">Default shadow</Box>
<Box className="shadow-md">Medium shadow</Box>
<Box className="shadow-lg">Large shadow</Box>
```

---

## 📖 Complete Example

Here's a complete example showing how to build a profile card:

```tsx
import React from 'react';
import { 
  Box, 
  Text, 
  Button, 
  Avatar, 
  Badge, 
  Stack,
  useTheme,
  useColorMode 
} from 'zenxui';

interface ProfileCardProps {
  user: {
    name: string;
    email: string;
    role: string;
    avatar?: string;
    isOnline: boolean;
  };
}

export function ProfileCard({ user }: ProfileCardProps) {
  const { theme } = useTheme();
  const { colorMode, toggleColorMode } = useColorMode();
  
  return (
    <Box className="bg-white rounded-xl shadow-lg p-lg m-md">
      <Stack spacing={16}>
        {/* Header */}
        <Stack spacing={12} direction="row" className="items-center">
          <Avatar 
            size={64} 
            name={user.name}
            source={user.avatar ? { uri: user.avatar } : undefined}
          />
          <Stack spacing={4} className="flex-1">
            <Stack spacing={8} direction="row" className="items-center">
              <Text className="text-lg font-bold text-gray900">
                {user.name}
              </Text>
              <Badge 
                colorScheme={user.isOnline ? "success" : "gray"}
                size="sm"
              >
                {user.isOnline ? "Online" : "Offline"}
              </Badge>
            </Stack>
            <Text className="text-sm text-gray600">{user.email}</Text>
            <Text className="text-sm text-gray500">{user.role}</Text>
          </Stack>
        </Stack>
        
        {/* Actions */}
        <Stack spacing={8} direction="row">
          <Button variant="solid" colorScheme="primary" className="flex-1">
            Message
          </Button>
          <Button variant="outline" colorScheme="primary" className="flex-1">
            Call
          </Button>
          <Button 
            variant="ghost" 
            onPress={toggleColorMode}
            className="px-md"
          >
            {colorMode === 'light' ? '🌙' : '☀️'}
          </Button>
        </Stack>
        
        {/* Stats */}
        <Box className="bg-gray50 rounded-lg p-md">
          <Stack spacing={12} direction="row" className="justify-around">
            <Stack spacing={4} className="items-center">
              <Text className="text-xl font-bold text-gray900">47</Text>
              <Text className="text-xs text-gray600">Projects</Text>
            </Stack>
            <Stack spacing={4} className="items-center">
              <Text className="text-xl font-bold text-gray900">1.2k</Text>
              <Text className="text-xs text-gray600">Followers</Text>
            </Stack>
            <Stack spacing={4} className="items-center">
              <Text className="text-xl font-bold text-gray900">890</Text>
              <Text className="text-xs text-gray600">Following</Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

// Usage
export function App() {
  const user = {
    name: "Sarah Wilson",
    email: "sarah@example.com",
    role: "Senior Developer",
    avatar: "https://example.com/avatar.jpg",
    isOnline: true,
  };
  
  return (
    <ThemeProvider>
      <Box className="flex-1 bg-gray100 p-md">
        <ProfileCard user={user} />
      </Box>
    </ThemeProvider>
  );
}
```

---

## 🔧 Advanced Usage

### Creating Custom Components

```tsx
import { Box, Text, colors, spacing, borderRadius } from 'zenxui';
import { TouchableOpacity } from 'react-native';

interface CustomButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onPress?: () => void;
}

export function CustomButton({ 
  children, 
  variant = 'primary', 
  onPress 
}: CustomButtonProps) {
  const styles = {
    backgroundColor: variant === 'primary' ? colors.primary500 : colors.gray200,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center' as const,
  };
  
  return (
    <TouchableOpacity onPress={onPress}>
      <Box style={styles}>
        <Text className={variant === 'primary' ? 'text-white' : 'text-gray900'}>
          {children}
        </Text>
      </Box>
    </TouchableOpacity>
  );
}
```

### Responsive Design

```tsx
import { Box, useTheme } from 'zenxui';
import { Dimensions } from 'react-native';

function ResponsiveComponent() {
  const { theme } = useTheme();
  const { width } = Dimensions.get('window');
  const isTablet = width > 768;
  
  return (
    <Box 
      className={`p-${isTablet ? 'xl' : 'md'} bg-white`}
      style={{
        maxWidth: isTablet ? 600 : '100%',
        alignSelf: 'center',
      }}
    >
      <Text className={`text-${isTablet ? '2xl' : 'lg'} font-bold`}>
        Responsive Content
      </Text>
    </Box>
  );
}
```

---

## 📚 API Reference

### ThemeProvider Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | App content |
| `theme` | `Theme` | Default theme | Custom theme object |
| `initialColorMode` | `'light' \| 'dark'` | `'light'` | Initial color mode |

### useTheme Hook

Returns the current theme object and color mode:

```tsx
const { theme, colorMode, toggleColorMode, setColorMode } = useTheme();
```

### useColorMode Hook

Simplified hook for color mode management:

```tsx
const { colorMode, toggleColorMode, setColorMode } = useColorMode();
```

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](../../CONTRIBUTING.md) for details.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/codeandwhisky/ZenXUI.git

# Install dependencies
cd ZenXUI
npm install

# Start development
npm run dev
```

---

## 📄 License

Apache License 2.0 - see [LICENSE](../../LICENSE) for details.

---

## 🙏 Support

- 📖 [Documentation](https://ZenXUI.dev)
- 🐛 [Issue Tracker](https://github.com/codeandwhisky/ZenXUI/issues)
- 💬 [Discussions](https://github.com/codeandwhisky/ZenXUI/discussions)
- 🐦 [Twitter](https://twitter.com/ZenXUI_dev)

---

Made with ❤️ by the ZenXUI team