# ZenUI Theme

A cross-platform, utility-first theming solution for React Native and React Native Web, built for the [ZenUI](https://github.com/codeandwhisky/ZenUI) design system.

---

## 🚀 Features

- **Design Tokens**: Consistent colors, spacing, typography, and more.
- **ThemeProvider**: Easily enable light/dark themes.
- **TypeScript Support**: Full typings and IntelliSense.
- **React Native + Web**: Works seamlessly across platforms.
- **Accessible**: Built with accessibility in mind.

---

## 📦 Installation

# ZenUI Theme

A cross-platform, mobile-first, utility-focused theming package for React Native and React Native Web. Provides design tokens, a lightweight ThemeProvider, small set of theme-aware prebuilt components, and a Tailwind-like utility parser for rapid styling on mobile.

Key goals:
- Mobile-first components (touchable, accessible, and performant on devices)
- Consistent design tokens (colors, spacing, typography, radii, shadows)
- Utility-first styling support for quick prototyping (subset of Tailwind classes)

---

## What this package provides

1) Design tokens (exported): `colors`, `spacing`, `fontSize`, `fontWeight`, `lineHeight`, `borderRadius`, `shadows`, `zIndex`.

2) Theming primitives:
- `ThemeProvider` — provides light/dark color mode and theme object.
- `useTheme`, `useColorMode` — hooks for accessing theme and toggling color mode.

3) Utility helpers:
- `cn(...)` — className joiner
- `createStyleObject(className)` — converts a small subset of Tailwind-like classes into React Native style objects. Supports:
  - spacing: p-, px-, py-, pt-, pr-, pb-, pl-, m- (maps to token spacing)
  - colors: bg-{color}-{shade}, text-{color}-{shade}
  - typography: text-xs|sm|base|lg|xl|2xl
  - rounded: rounded, rounded-sm|md|lg|xl|2xl|3xl|full
  - shadow: shadow, shadow-sm|md|lg|xl|2xl
  - layout: flex, flex-row, flex-col, items-center, justify-center
  - width/height: w-<n>, h-<n> (maps to spacing tokens)

4) Small prebuilt, theme-aware components (mobile-focused):
- Box, Text, Button, Input, Stack (VStack/HStack), Modal (simple), Avatar, Badge, Spinner

Note: This package implements a practical subset to get started quickly. For production-grade, full Tailwind support consider integrating NativeWind or similar tools; this package focuses on a consistent token system, mobile defaults, and small accessible components.

---

## Installation

Install the package and ensure peer deps are present:

```bash
npm install zenui-theme
# or
yarn add zenui-theme
```

Peer dependencies: react, react-native (or react-native-web when used on web).

---

## Quick usage (mobile)

Wrap your app with `ThemeProvider`:

```tsx
import React from 'react'
import { ThemeProvider } from 'zenui-theme'

export default function App() {
  return (
    <ThemeProvider initialColorMode="light">
      {/* your app */}
    </ThemeProvider>
  )
}
```

Using components with utility classes and tokens:

```tsx
import React from 'react'
import { Box, Text, Button, Input, Stack, Avatar, Badge } from 'zenui-theme'

export function Example() {
  return (
    <Box className="p-4 bg-primary-50">
      <Stack spacing={12}>
        <Avatar size={48} />
        <Text className="text-lg text-primary-700">Hello</Text>
        <Input placeholder="Enter name" />
        <Button>Save</Button>
        <Badge>New</Badge>
      </Stack>
    </Box>
  )
}
```

The `className` prop accepts the small Tailwind-like subset documented above and converts it to React Native styles using the internal token set.

---

## Prebuilt components coverage

This package provides a curated set of components that are:
- theme-aware (use tokens from the `ThemeProvider`)
- accessible for mobile (touch targets, accessibilityRole where applicable)
- configurable via `className` (utility classes) and direct `style` prop

Category-wise mapping:

- Forms: Input (basic). Textarea can be used as `TextInput` multiline; Checkbox/Radio/Switch/Slider not included in this minimal set — consider integrating community packages or adding later.
- Buttons: Button (solid/outline/ghost variants, sizes)
- Overlays: Modal (simple modal). Toast, Tooltip, Actionsheet, AlertDialog not included — can be layered on top with the Modal and tokens.
- Layout: Box, Stack (VStack/HStack via `direction`), Center achieved via `className` utilities
- Feedback: Spinner (ActivityIndicator), Badge, basic skeletons not included (can be added)
- Data Display: Avatar, Text, Badge, Icon hooks are left to consumers (icons vary by platform)
- Navigation: Tabs/Link not included in this package (use react-navigation or web router)
- Typography: Heading and Text available via `Text` component and `fontSize` tokens

If you need the full comprehensive set (Checkbox, Slider, Toast, Actionsheet, Tabs), I can add them next — they require additional accessibility and platform-specific behavior.

---

## Theming and tokens

You can import tokens directly when building custom components or styles:

```ts
import { colors, spacing, fontSize } from 'zenui-theme'

console.log(colors.primary[500], spacing[4], fontSize.lg)
```

Switching color mode at runtime:

```tsx
import { useColorMode } from '@codeandwhisky/theme'

function Toggle() {
  const { colorMode, toggleColorMode } = useColorMode()
  return <Button onPress={toggleColorMode}>Switch to {colorMode === 'light' ? 'dark' : 'light'}</Button>
}
```

---

## Development notes (for contributors)

- Tokens live in `packages/theme/src/tokens.ts` and are mirrored in `lib/` builds.
- Utilities live in `packages/theme/src/utils.ts` — the `createStyleObject` parser is intentionally small and easy to extend.
- Components are in `packages/theme/src/components/` and aim to be minimal, mobile-first, and easy to extend.

Suggested next steps to reach full feature parity with the checklist in the project request:
- Add controlled form primitives (Checkbox, Radio, Switch, Slider) with accessibility and tests.
- Add overlay primitives (Toast, Tooltip, Actionsheet) with safe stacking/z-index using tokens.
- Add full NativeWind/Tailwind integration for larger projects that want complete utility coverage.

---

## License

Apache License 2.0 — see LICENSE in the repository root.