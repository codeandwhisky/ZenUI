export function createPackageJson(projectName: string) {
  return {
    name: projectName,
    version: "0.1.0",
    private: true,
    scripts: {
      "start": "expo start",
      "android": "expo start --android",
      "ios": "expo start --ios",
      "web": "expo start --web",
      "build": "expo build",
      "eject": "expo eject"
    },
    dependencies: {
      "react": "^18.2.0",
      "react-native": "^0.72.6",
      "expo": "~49.0.0",
      "zenxui": "^0.1.1"
    },
    devDependencies: {
      "@types/react": "^18.2.37",
      "@types/react-native": "^0.72.6",
      "typescript": "^5.2.2"
    }
  }
}

export function createThemeFile() {
  return `import { tokens } from './tokens'
import type { Theme } from 'zenxui'

// Create custom theme extending base tokens
export const theme: Theme = {
  colors: tokens.colors,
  spacing: tokens.spacing,
  radii: tokens.radii,
  // Add custom theme extensions here
  components: {
    Button: {
      baseStyle: {
        borderRadius: tokens.radii.md,
        fontWeight: '600',
      },
      variants: {
        solid: {
          backgroundColor: tokens.colors.primary[500],
          color: '#ffffff',
        },
        outline: {
          borderWidth: 1,
          borderColor: tokens.colors.primary[500],
          backgroundColor: 'transparent',
          color: tokens.colors.primary[500],
        },
        ghost: {
          backgroundColor: 'transparent',
          color: tokens.colors.primary[500],
        }
      },
      sizes: {
        sm: {
          paddingHorizontal: 12,
          paddingVertical: 6,
          fontSize: 14,
        },
        md: {
          paddingHorizontal: 16,
          paddingVertical: 8,
          fontSize: 16,
        },
        lg: {
          paddingHorizontal: 20,
          paddingVertical: 12,
          fontSize: 18,
        }
      }
    }
  }
}

export default theme`
}

export function createIndexFile(components: string[]) {
  const exports = components.map(comp => 
    `export { ${comp.charAt(0).toUpperCase() + comp.slice(1)} } from './${comp}'`
  ).join('\n')
  
  return `// ZenXUI Components
// Auto-generated exports

export * from './ui'

${exports}

// Re-export core ZenXUI components
export { 
  Box, 
  Text, 
  Stack,
  ThemeProvider,
  useTheme,
  useColorMode 
} from 'zenxui'`
}