import fs from 'fs-extra'
import path from 'path'
import chalk from 'chalk'
import ora from 'ora'

interface TokensOptions {
  generate?: boolean
  sync?: boolean
}

export async function tokensCommand(options: TokensOptions) {
  if (options.generate) {
    await generateTokens()
  } else if (options.sync) {
    await syncTokens()
  } else {
    console.log(chalk.yellow('Please specify an option:'))
    console.log(chalk.cyan('  uxlib tokens generate  - Generate type-safe tokens'))
    console.log(chalk.cyan('  uxlib tokens sync      - Sync tokens with design system'))
  }
}

async function generateTokens() {
  const spinner = ora('Generating type-safe tokens...').start()
  
  try {
    const tokensPath = path.join(process.cwd(), 'app/theme/tokens.ts')
    
    if (!await fs.pathExists(tokensPath)) {
      spinner.fail('tokens.ts not found. Run "uxlib init" first.')
      return
    }
    
    // Generate enhanced tokens with TypeScript utilities
    const enhancedTokens = `import { tokens as baseTokens } from './tokens'

// Type utilities for token access
export type ColorToken = keyof typeof baseTokens.colors
export type SpacingToken = keyof typeof baseTokens.spacing
export type RadiiToken = keyof typeof baseTokens.radii

// Flatten color tokens for easy access
type FlattenColors<T> = {
  [K in keyof T]: T[K] extends Record<string, string>
    ? { [P in keyof T[K] as \`\${K & string}\${P & string}\`]: T[K][P] }
    : { [P in K]: T[K] }
}[keyof T]

export type FlatColorTokens = FlattenColors<typeof baseTokens.colors>

// Token resolution utilities
export const getColorToken = (token: string): string => {
  const [color, shade] = token.split('.')
  const colorGroup = (baseTokens.colors as any)[color]
  return shade ? colorGroup?.[shade] : colorGroup
}

export const getSpacingToken = (token: SpacingToken): number => {
  return baseTokens.spacing[token]
}

export const getRadiiToken = (token: RadiiToken): number => {
  return baseTokens.radii[token]
}

// Export all tokens
export { baseTokens as tokens }
export default baseTokens`
    
    const typedTokensPath = path.join(process.cwd(), 'app/theme/typed-tokens.ts')
    await fs.writeFile(typedTokensPath, enhancedTokens)
    
    spinner.succeed('Generated type-safe tokens!')
    console.log(chalk.green('✓ Created:'), 'app/theme/typed-tokens.ts')
    
  } catch (error) {
    spinner.fail('Failed to generate tokens')
    throw error
  }
}

async function syncTokens() {
  const spinner = ora('Syncing tokens with design system...').start()
  
  try {
    // This would integrate with design systems like Figma Tokens, etc.
    // For now, just a placeholder
    spinner.info('Token sync is not implemented yet')
    console.log(chalk.yellow('Coming soon: Integration with Figma Tokens, Style Dictionary, and other design systems'))
    
  } catch (error) {
    spinner.fail('Failed to sync tokens')
    throw error
  }
}