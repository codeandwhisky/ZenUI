import fs from 'fs-extra'
import path from 'path'
import chalk from 'chalk'
import ora from 'ora'
import inquirer from 'inquirer'
import { createPackageJson, createIndexFile, createThemeFile } from '../utils/template'

interface InitOptions {
  dir: string
  template: string
}

export async function initCommand(options: InitOptions) {
  const spinner = ora('Initializing ZenXUI project...').start()
  
  try {
    const targetDir = path.resolve(options.dir)
    const projectName = path.basename(targetDir)
    
    // Check if directory exists
    const exists = await fs.pathExists(targetDir)
    if (exists) {
      const files = await fs.readdir(targetDir)
      if (files.length > 0) {
        spinner.stop()
        const { proceed } = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'proceed',
            message: 'Directory is not empty. Continue?',
            default: false
          }
        ])
        
        if (!proceed) {
          console.log(chalk.yellow('Aborted.'))
          return
        }
        spinner.start()
      }
    }
    
    // Create directory structure
    await fs.ensureDir(targetDir)
    await fs.ensureDir(path.join(targetDir, 'app/components'))
    await fs.ensureDir(path.join(targetDir, 'app/theme'))
    
    // Create package.json if it doesn't exist
    const packageJsonPath = path.join(targetDir, 'package.json')
    if (!await fs.pathExists(packageJsonPath)) {
      await fs.writeJson(packageJsonPath, createPackageJson(projectName), { spaces: 2 })
    }
    
    // Create theme configuration
    const themeDir = path.join(targetDir, 'app/theme')
    await fs.writeFile(path.join(themeDir, 'index.ts'), createThemeFile())
    await fs.writeFile(path.join(themeDir, 'tokens.ts'), await getTokensTemplate())
    
    // Create components index
    const componentsDir = path.join(targetDir, 'app/components')
    await fs.writeFile(path.join(componentsDir, 'index.ts'), createIndexFile([]))
    
    // Create example component
    await fs.writeFile(
      path.join(componentsDir, 'ui.tsx'), 
      await getUIComponentTemplate()
    )
    
    spinner.succeed('ZenXUI initialized successfully!')
    
    console.log('\n' + chalk.green('✓ Project initialized!'))
    console.log('\n' + chalk.bold('Next steps:'))
    console.log('  1. Install dependencies:')
    console.log(chalk.cyan('     npm install zenxui react react-native'))
    console.log('\n  2. Add components:')
    console.log(chalk.cyan('     uxlib add button card modal'))
    console.log('\n  3. Start building:')
    console.log(chalk.cyan('     Import components from "./app/components"'))
    
  } catch (error) {
    spinner.fail('Failed to initialize project')
    throw error
  }
}

async function getTokensTemplate(): Promise<string> {
  return `export const tokens = {
  colors: {
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
    },
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    }
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
  },
  radii: {
    none: 0,
    sm: 4,
    md: 6,
    lg: 8,
    xl: 12,
    full: 9999,
  }
}

export type Tokens = typeof tokens`
}

async function getUIComponentTemplate(): Promise<string> {
  return `import React from 'react'
import { View, Text, TouchableOpacity, ViewStyle, TextStyle } from 'react-native'
import { tokens } from '../theme/tokens'

// Re-export ZenXUI core for easy access
export { Box, Text as ZenText, Stack } from 'zenxui'

// Example enhanced Button component with slots
interface ButtonProps {
  children: React.ReactNode
  variant?: 'solid' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  onPress?: () => void
  leftSlot?: React.ReactNode
  rightSlot?: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'solid',
  size = 'md',
  onPress,
  leftSlot,
  rightSlot
}) => {
  const containerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: size === 'sm' ? 12 : size === 'lg' ? 20 : 16,
    paddingVertical: size === 'sm' ? 6 : size === 'lg' ? 12 : 8,
    borderRadius: tokens.radii.md,
    backgroundColor: variant === 'solid' ? tokens.colors.primary[500] : 'transparent',
    borderWidth: variant === 'outline' ? 1 : 0,
    borderColor: variant === 'outline' ? tokens.colors.primary[500] : 'transparent',
  }

  const textStyle: TextStyle = {
    color: variant === 'solid' ? '#ffffff' : tokens.colors.primary[500],
    fontSize: size === 'sm' ? 14 : size === 'lg' ? 18 : 16,
    fontWeight: '600',
  }

  return (
    <TouchableOpacity style={containerStyle} onPress={onPress} accessibilityRole="button">
      {leftSlot && <View style={{ marginRight: 8 }}>{leftSlot}</View>}
      <Text style={textStyle}>{children}</Text>
      {rightSlot && <View style={{ marginLeft: 8 }}>{rightSlot}</View>}
    </TouchableOpacity>
  )
}`
}