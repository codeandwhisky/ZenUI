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

```bash
npm install cw-zenui
# or
yarn add cw-zenui
```

**Peer dependencies:**  
Make sure you have `react` and `react-native` installed.

---

## 🛠️ Usage

```tsx
import React from 'react';
import { ThemeProvider, useColorMode } from 'cw-zenui/theme';

export default function App() {
  return (
    <ThemeProvider initialColorMode="light">
      {/* Your app content */}
    </ThemeProvider>
  );
}
```

Example to toggle color mode:

```tsx
import React from 'react';
import { useColorMode } from 'cw-zenui/theme';

function ThemeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <button onClick={toggleColorMode}>
      Switch to {colorMode === 'light' ? 'dark' : 'light'} mode
    </button>
  );
}
```

---

## 🎨 Theming

- Access design tokens via import:
  ```ts
  import { colors, spacing, typography } from 'cw-zenui/theme';
  ```
- Customize themes using `<ThemeProvider>` props.

---

## 📚 Documentation

Full docs: [ZenUI Documentation](https://zenui-docs.example.com)

---

## 🤝 Contributing

We welcome contributions!  
See our [Contributing Guide](https://github.com/codeandwhisky/ZenUI/blob/main/CONTRIBUTING.md).

---

## 📄 License

Apache License 2.0 — See [LICENSE](https://github.com/codeandwhisky/ZenUI/blob/main/LICENSE)

---

## ✨ Credits

Built with ❤️ by [codeandwhisky](https://github.com/codeandwhisky) for the React Native community.