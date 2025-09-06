import fs from 'fs-extra'
import path from 'path'
import chalk from 'chalk'
import ora from 'ora'
import inquirer from 'inquirer'

interface GenerateOptions {
  type: 'primitive' | 'pattern'
  dir: string
}

export async function generateCommand(componentName: string, options: GenerateOptions) {
  const spinner = ora(`Generating ${options.type} component: ${componentName}...`).start()
  
  try {
    const targetDir = path.resolve(options.dir)
    await fs.ensureDir(targetDir)
    
    // Gather component specifications
    spinner.stop()
    const specs = await gatherComponentSpecs(componentName, options.type)
    spinner.start()
    
    // Generate component files
    const componentPath = path.join(targetDir, `${componentName}.tsx`)
    const componentCode = generateComponentCode(componentName, options.type, specs)
    
    await fs.writeFile(componentPath, componentCode)
    
    // Generate tests if requested
    if (specs.includeTests) {
      const testPath = path.join(targetDir, `${componentName}.test.tsx`)
      const testCode = generateTestCode(componentName, specs)
      await fs.writeFile(testPath, testCode)
    }
    
    // Generate stories if requested
    if (specs.includeStories) {
      const storyPath = path.join(targetDir, `${componentName}.stories.tsx`)
      const storyCode = generateStoryCode(componentName, specs)
      await fs.writeFile(storyPath, storyCode)
    }
    
    spinner.succeed(`Generated ${componentName} component!`)
    
    console.log('\n' + chalk.green('✓ Generated files:'))
    console.log(chalk.cyan(`  • ${componentName}.tsx`))
    if (specs.includeTests) console.log(chalk.cyan(`  • ${componentName}.test.tsx`))
    if (specs.includeStories) console.log(chalk.cyan(`  • ${componentName}.stories.tsx`))
    
  } catch (error) {
    spinner.fail('Failed to generate component')
    throw error
  }
}

interface ComponentSpecs {
  variants: string[]
  sizes: string[]
  props: ComponentProp[]
  includeTests: boolean
  includeStories: boolean
  hasSlots: boolean
  slots: string[]
}

interface ComponentProp {
  name: string
  type: string
  optional: boolean
  description: string
}

async function gatherComponentSpecs(componentName: string, type: 'primitive' | 'pattern'): Promise<ComponentSpecs> {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'variants',
      message: 'Component variants (comma-separated):',
      default: type === 'primitive' ? '' : 'primary,secondary,outline'
    },
    {
      type: 'input',
      name: 'sizes',
      message: 'Component sizes (comma-separated):',
      default: 'sm,md,lg'
    },
    {
      type: 'confirm',
      name: 'hasSlots',
      message: 'Does this component use slots?',
      default: type === 'pattern'
    },
    {
      type: 'input',
      name: 'slots',
      message: 'Slot names (comma-separated):',
      default: 'Root,Content,Icon,Label',
      when: (answers) => answers.hasSlots
    },
    {
      type: 'confirm',
      name: 'includeTests',
      message: 'Generate test file?',
      default: true
    },
    {
      type: 'confirm',
      name: 'includeStories',
      message: 'Generate Storybook stories?',
      default: false
    }
  ])
  
  return {
    variants: answers.variants ? answers.variants.split(',').map((s: string) => s.trim()) : [],
    sizes: answers.sizes ? answers.sizes.split(',').map((s: string) => s.trim()) : [],
    props: [], // Could be extended with dynamic prop gathering
    includeTests: answers.includeTests,
    includeStories: answers.includeStories,
    hasSlots: answers.hasSlots || false,
    slots: answers.slots ? answers.slots.split(',').map((s: string) => s.trim()) : []
  }
}

function generateComponentCode(componentName: string, type: 'primitive' | 'pattern', specs: ComponentSpecs): string {
  const capitalizedName = componentName.charAt(0).toUpperCase() + componentName.slice(1)
  
  const imports = `import React from 'react'
import { ViewStyle, TextStyle } from 'react-native'
import { createStyleObject } from 'zenxui'`

  const interfaceCode = `export interface ${capitalizedName}Props {
  children?: React.ReactNode
  ${specs.variants.length > 0 ? `variant?: '${specs.variants.join("' | '")}'` : ''}
  ${specs.sizes.length > 0 ? `size?: '${specs.sizes.join("' | '")}'` : ''}
  className?: string
  style?: ViewStyle
  onPress?: () => void
  ${specs.hasSlots ? specs.slots.map(slot => `${slot.toLowerCase()}Slot?: React.ReactNode`).join('\n  ') : ''}
}`

  const componentCode = `export const ${capitalizedName}: React.FC<${capitalizedName}Props> = ({
  children,
  ${specs.variants.length > 0 ? `variant = '${specs.variants[0]}',` : ''}
  ${specs.sizes.length > 0 ? `size = '${specs.sizes[1] || specs.sizes[0]}',` : ''}
  className,
  style,
  onPress,
  ${specs.hasSlots ? specs.slots.map(slot => `${slot.toLowerCase()}Slot`).join(',\n  ') : ''}
  ...props
}) => {
  // Component implementation
  const baseStyle: ViewStyle = {
    // Add base styles based on type
    ${type === 'primitive' ? `
    // Primitive styles
    ` : `
    // Pattern styles
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    `}
  }
  
  const clsStyle = className ? createStyleObject(className) : {}
  
  return (
    <View style={[baseStyle, clsStyle, style]} {...props}>
      ${specs.hasSlots ? `
      {${specs.slots[0]?.toLowerCase() || 'root'}Slot && ${specs.slots[0]?.toLowerCase() || 'root'}Slot}` : ''}
      {children}
      ${specs.hasSlots && specs.slots.length > 1 ? `
      {${specs.slots[1]?.toLowerCase() || 'content'}Slot && ${specs.slots[1]?.toLowerCase() || 'content'}Slot}` : ''}
    </View>
  )
}`

  return `${imports}\n\n${interfaceCode}\n\n${componentCode}`
}

function generateTestCode(componentName: string, specs: ComponentSpecs): string {
  const capitalizedName = componentName.charAt(0).toUpperCase() + componentName.slice(1)
  
  return `import React from 'react'
import { render } from '@testing-library/react-native'
import { ${capitalizedName} } from './${componentName}'

describe('${capitalizedName}', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <${capitalizedName}>Test content</${capitalizedName}>
    )
    expect(getByText('Test content')).toBeTruthy()
  })
  
  ${specs.variants.length > 0 ? `
  describe('variants', () => {
    ${specs.variants.map(variant => `
    it('renders ${variant} variant', () => {
      const { container } = render(
        <${capitalizedName} variant="${variant}">Test</${capitalizedName}>
      )
      expect(container).toMatchSnapshot()
    })`).join('\n    ')}
  })` : ''}
  
  ${specs.sizes.length > 0 ? `
  describe('sizes', () => {
    ${specs.sizes.map(size => `
    it('renders ${size} size', () => {
      const { container } = render(
        <${capitalizedName} size="${size}">Test</${capitalizedName}>
      )
      expect(container).toMatchSnapshot()
    })`).join('\n    ')}
  })` : ''}
})`
}

function generateStoryCode(componentName: string, specs: ComponentSpecs): string {
  const capitalizedName = componentName.charAt(0).toUpperCase() + componentName.slice(1)
  
  return `import type { Meta, StoryObj } from '@storybook/react'
import { ${capitalizedName} } from './${componentName}'

const meta: Meta<typeof ${capitalizedName}> = {
  title: 'Components/${capitalizedName}',
  component: ${capitalizedName},
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ${specs.variants.length > 0 ? `
    variant: {
      control: { type: 'select' },
      options: [${specs.variants.map(v => `'${v}'`).join(', ')}],
    },` : ''}
    ${specs.sizes.length > 0 ? `
    size: {
      control: { type: 'select' },
      options: [${specs.sizes.map(s => `'${s}'`).join(', ')}],
    },` : ''}
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Default ${capitalizedName}',
  },
}

${specs.variants.map(variant => `
export const ${variant.charAt(0).toUpperCase() + variant.slice(1)}: Story = {
  args: {
    variant: '${variant}',
    children: '${variant.charAt(0).toUpperCase() + variant.slice(1)} ${capitalizedName}',
  },
}`).join('\n')}

${specs.sizes.map(size => `
export const ${size.toUpperCase()}: Story = {
  args: {
    size: '${size}',
    children: '${size.toUpperCase()} Size',
  },
}`).join('\n')}`
}