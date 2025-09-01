import React, { useState } from 'react'
import { ScrollView, SafeAreaView } from 'react-native'
import { ThemeProvider, useColorMode } from '@zenui/theme'
import { Box, Text, Button } from '@zenui/ui'

// Theme toggle component
function ThemeToggle() {
  const { colorMode, toggleColorMode } = useColorMode()
  
  return (
    <Button 
      variant="outline" 
      size="sm"
      onPress={toggleColorMode}
    >
      {colorMode === 'light' ? '🌙' : '☀️'} {colorMode} mode
    </Button>
  )
}

// Component showcase
function ComponentShowcase() {
  const [count, setCount] = useState(0)
  
  return (
    <Box style={{ padding: 20 }}>
      {/* Header */}
      <Box style={{ marginBottom: 30 }}>
        <Text variant="heading" style={{ marginBottom: 8 }}>
          ZenUI Component Library
        </Text>
        <Text variant="body" style={{ marginBottom: 16 }}>
          A cross-platform, utility-first design system
        </Text>
        <ThemeToggle />
      </Box>

      {/* Typography Section */}
      <Box style={{ marginBottom: 30 }}>
        <Text variant="heading" style={{ marginBottom: 16 }}>
          Typography
        </Text>
        <Text variant="heading" style={{ marginBottom: 8 }}>
          Heading Text
        </Text>
        <Text variant="body" style={{ marginBottom: 8 }}>
          This is body text that provides readable content for users.
        </Text>
        <Text variant="caption" style={{ marginBottom: 8 }}>
          Caption text for additional information
        </Text>
      </Box>

      {/* Buttons Section */}
      <Box style={{ marginBottom: 30 }}>
        <Text variant="heading" style={{ marginBottom: 16 }}>
          Buttons
        </Text>
        
        <Box style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
          <Button variant="solid" colorScheme="primary">
            Primary
          </Button>
          <Button variant="solid" colorScheme="secondary">
            Secondary
          </Button>
          <Button variant="outline" colorScheme="primary">
            Outline
          </Button>
        </Box>

        <Box style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
          <Button size="sm" variant="solid" colorScheme="primary">
            Small
          </Button>
          <Button size="md" variant="solid" colorScheme="primary">
            Medium
          </Button>
          <Button size="lg" variant="solid" colorScheme="primary">
            Large
          </Button>
        </Box>
      </Box>

      {/* Interactive Section */}
      <Box style={{ marginBottom: 30 }}>
        <Text variant="heading" style={{ marginBottom: 16 }}>
          Interactive Demo
        </Text>
        <Text variant="body" style={{ marginBottom: 16 }}>
          Counter: {count}
        </Text>
        <Box style={{ flexDirection: 'row', gap: 12 }}>
          <Button 
            variant="outline" 
            onPress={() => setCount(c => c - 1)}
          >
            Decrease
          </Button>
          <Button 
            variant="solid" 
            colorScheme="primary"
            onPress={() => setCount(c => c + 1)}
          >
            Increase
          </Button>
          <Button 
            variant="outline" 
            colorScheme="secondary"
            onPress={() => setCount(0)}
          >
            Reset
          </Button>
        </Box>
      </Box>

      {/* Layout Section */}
      <Box style={{ marginBottom: 30 }}>
        <Text variant="heading" style={{ marginBottom: 16 }}>
          Layout Examples
        </Text>
        
        <Box style={{ 
          backgroundColor: '#f8f9fa', 
          padding: 16, 
          borderRadius: 8,
          marginBottom: 16 
        }}>
          <Text variant="body" style={{ marginBottom: 12 }}>
            Horizontal Layout:
          </Text>
          <Box style={{ flexDirection: 'row', gap: 8 }}>
            <Box style={{ 
              backgroundColor: '#e9ecef', 
              padding: 12, 
              borderRadius: 4,
              flex: 1 
            }}>
              <Text variant="caption">Item 1</Text>
            </Box>
            <Box style={{ 
              backgroundColor: '#e9ecef', 
              padding: 12, 
              borderRadius: 4,
              flex: 1 
            }}>
              <Text variant="caption">Item 2</Text>
            </Box>
            <Box style={{ 
              backgroundColor: '#e9ecef', 
              padding: 12, 
              borderRadius: 4,
              flex: 1 
            }}>
              <Text variant="caption">Item 3</Text>
            </Box>
          </Box>
        </Box>

        <Box style={{ 
          backgroundColor: '#f8f9fa', 
          padding: 16, 
          borderRadius: 8 
        }}>
          <Text variant="body" style={{ marginBottom: 12 }}>
            Vertical Layout:
          </Text>
          <Box style={{ gap: 8 }}>
            <Box style={{ 
              backgroundColor: '#e9ecef', 
              padding: 12, 
              borderRadius: 4 
            }}>
              <Text variant="caption">Item A</Text>
            </Box>
            <Box style={{ 
              backgroundColor: '#e9ecef', 
              padding: 12, 
              borderRadius: 4 
            }}>
              <Text variant="caption">Item B</Text>
            </Box>
            <Box style={{ 
              backgroundColor: '#e9ecef', 
              padding: 12, 
              borderRadius: 4 
            }}>
              <Text variant="caption">Item C</Text>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Features Section */}
      <Box style={{ marginBottom: 30 }}>
        <Text variant="heading" style={{ marginBottom: 16 }}>
          Key Features
        </Text>
        
        {[
          '✅ Cross-platform (React Native + Web)',
          '✅ TypeScript support with IntelliSense',
          '✅ Accessible components (WCAG 2.1)',
          '✅ Themeable with light/dark modes',
          '✅ Utility-first design approach',
          '✅ Performance optimized',
        ].map((feature, index) => (
          <Text key={index} variant="body" style={{ marginBottom: 8 }}>
            {feature}
          </Text>
        ))}
      </Box>

      {/* Footer */}
      <Box style={{ 
        borderTopWidth: 1, 
        borderTopColor: '#e9ecef', 
        paddingTop: 20,
        alignItems: 'center' 
      }}>
        <Text variant="caption" style={{ textAlign: 'center' }}>
          Built with ❤️ for the React Native community
        </Text>
        <Text variant="caption" style={{ textAlign: 'center', marginTop: 4 }}>
          Apache License 2.0 • Open Source
        </Text>
      </Box>
    </Box>
  )
}

export default function App() {
  return (
    <ThemeProvider initialColorMode="light">
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <ScrollView style={{ flex: 1 }}>
          <ComponentShowcase />
        </ScrollView>
      </SafeAreaView>
    </ThemeProvider>
  )
}