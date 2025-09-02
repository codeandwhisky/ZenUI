/**
 * Enhanced Theme System Demo
 * 
 * This file demonstrates the capabilities of the new enhanced theme system
 * including responsive design, semantic colors, component theming, and performance optimizations.
 */

import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { ThemeProvider, useTheme } from '../theme'
import { Button } from '../components/EnhancedButton'

// Demo component showcasing button variants and states
const ButtonVariantsDemo: React.FC = () => {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ 
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 20,
        color: '#1f2937',
      }}>
        Enhanced Button Component
      </Text>
      
      {/* Solid variants with different color schemes */}
      <View style={{ marginBottom: 16 }}>
        <Text style={{ fontSize: 14, fontWeight: '500', marginBottom: 8, color: '#6b7280' }}>
          Solid Variants (Different Color Schemes)
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          <Button variant="solid" colorScheme="primary">Primary</Button>
          <Button variant="solid" colorScheme="success">Success</Button>
          <Button variant="solid" colorScheme="warning">Warning</Button>
          <Button variant="solid" colorScheme="error">Error</Button>
        </View>
      </View>

      {/* Different variants */}
      <View style={{ marginBottom: 16 }}>
        <Text style={{ fontSize: 14, fontWeight: '500', marginBottom: 8, color: '#6b7280' }}>
          Different Variants
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          <Button variant="solid">Solid</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </View>
      </View>

      {/* Different sizes */}
      <View style={{ marginBottom: 16 }}>
        <Text style={{ fontSize: 14, fontWeight: '500', marginBottom: 8, color: '#6b7280' }}>
          Different Sizes
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          <Button size="xs">Extra Small</Button>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="xl">Extra Large</Button>
        </View>
      </View>

      {/* Loading and disabled states */}
      <View style={{ marginBottom: 16 }}>
        <Text style={{ fontSize: 14, fontWeight: '500', marginBottom: 8, color: '#6b7280' }}>
          States
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          <Button isLoading>Loading</Button>
          <Button isLoading loadingText="Saving...">Loading with Text</Button>
          <Button isDisabled>Disabled</Button>
        </View>
      </View>
    </View>
  )
}

// Demo component showcasing theme features
const ThemeFeaturesDemo: React.FC = () => {
  const { theme, colorMode, toggleColorMode } = useTheme()
  
  return (
    <View style={{ 
      padding: 20,
      backgroundColor: theme.colors.gray[50],
      borderRadius: 8,
      margin: 20,
    }}>
      <Text style={{ 
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 16,
        color: theme.colors.gray[900],
      }}>
        Enhanced Theme System Features
      </Text>
      
      <View style={{ marginBottom: 12 }}>
        <Text style={{ fontSize: 14, color: theme.colors.gray[700] }}>
          ✨ Component-level theming with variants, sizes, and color schemes
        </Text>
      </View>
      
      <View style={{ marginBottom: 12 }}>
        <Text style={{ fontSize: 14, color: theme.colors.gray[700] }}>
          🎨 Semantic color tokens with comprehensive color scales
        </Text>
      </View>
      
      <View style={{ marginBottom: 12 }}>
        <Text style={{ fontSize: 14, color: theme.colors.gray[700] }}>
          📱 Responsive design system with breakpoint-based values
        </Text>
      </View>
      
      <View style={{ marginBottom: 12 }}>
        <Text style={{ fontSize: 14, color: theme.colors.gray[700] }}>
          ⚡ Performance optimizations with caching and memoization
        </Text>
      </View>
      
      <View style={{ marginBottom: 12 }}>
        <Text style={{ fontSize: 14, color: theme.colors.gray[700] }}>
          🔧 TypeScript support with comprehensive type definitions
        </Text>
      </View>
      
      <View style={{ marginBottom: 16 }}>
        <Text style={{ fontSize: 14, color: theme.colors.gray[700] }}>
          🌓 Dark/light mode support with system preference detection
        </Text>
      </View>
      
      <Button
        variant="outline"
        onPress={toggleColorMode}
        style={{ alignSelf: 'flex-start' }}
      >
        Current Mode: {colorMode} (Tap to Toggle)
      </Button>
    </View>
  )
}

// Architecture overview component
const ArchitectureDemo: React.FC = () => {
  return (
    <View style={{ padding: 20, backgroundColor: '#f8fafc', margin: 20, borderRadius: 8 }}>
      <Text style={{ 
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 16,
        color: '#1e293b',
      }}>
        Architecture Overview
      </Text>
      
      <Text style={{ fontSize: 14, color: '#475569', marginBottom: 12 }}>
        The enhanced theme system is built with a modular architecture:
      </Text>
      
      <View style={{ marginLeft: 16 }}>
        <Text style={{ fontSize: 14, color: '#475569', marginBottom: 8 }}>
          • <Text style={{ fontWeight: '600' }}>types.ts</Text> - Comprehensive TypeScript definitions
        </Text>
        <Text style={{ fontSize: 14, color: '#475569', marginBottom: 8 }}>
          • <Text style={{ fontWeight: '600' }}>defaultTheme.ts</Text> - Semantic colors and design tokens
        </Text>
        <Text style={{ fontSize: 14, color: '#475569', marginBottom: 8 }}>
          • <Text style={{ fontWeight: '600' }}>utils.ts</Text> - Performance utilities and responsive helpers
        </Text>
        <Text style={{ fontSize: 14, color: '#475569', marginBottom: 8 }}>
          • <Text style={{ fontWeight: '600' }}>provider.tsx</Text> - Enhanced theme provider with system integration
        </Text>
        <Text style={{ fontSize: 14, color: '#475569', marginBottom: 8 }}>
          • <Text style={{ fontWeight: '600' }}>componentThemes.ts</Text> - Component-specific theme definitions
        </Text>
      </View>
    </View>
  )
}

// Main demo app
export const ThemeSystemDemo: React.FC = () => {
  return (
    <ThemeProvider>
      <ScrollView style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <View style={{ paddingVertical: 20 }}>
          <Text style={{
            fontSize: 24,
            fontWeight: '700',
            textAlign: 'center',
            marginBottom: 8,
            color: '#111827',
          }}>
            ZenUI Enhanced Theme System
          </Text>
          
          <Text style={{
            fontSize: 16,
            textAlign: 'center',
            marginBottom: 32,
            color: '#6b7280',
            paddingHorizontal: 20,
          }}>
            Phase 1.1: Performance + Customizability + Great DX
          </Text>

          <ButtonVariantsDemo />
          <ThemeFeaturesDemo />
          <ArchitectureDemo />
        </View>
      </ScrollView>
    </ThemeProvider>
  )
}

export default ThemeSystemDemo
