import fs from 'fs-extra'
import path from 'path'
import chalk from 'chalk'
import ora from 'ora'
import { getComponentTemplate } from '../utils/component-generator'
import { updateIndexFile } from '../utils/file'

interface AddOptions {
  dir: string
  force: boolean
}

const AVAILABLE_COMPONENTS = [
  'button',
  'card', 
  'input',
  'modal',
  'toast',
  'badge',
  'avatar',
  'checkbox',
  'radio',
  'switch',
  'spinner',
  'tabs',
  'select',
  'popover',
  'drawer',
  'alert',
  'progress',
  'slider'
] as const

type ComponentName = typeof AVAILABLE_COMPONENTS[number]

export async function addCommand(components: string[], options: AddOptions) {
  const spinner = ora('Adding components...').start()
  
  try {
    const targetDir = path.resolve(options.dir)
    await fs.ensureDir(targetDir)
    
    // Validate components
    const validComponents: ComponentName[] = []
    const invalidComponents: string[] = []
    
    for (const component of components) {
      const normalizedComponent = component.toLowerCase() as ComponentName
      if (AVAILABLE_COMPONENTS.includes(normalizedComponent)) {
        validComponents.push(normalizedComponent)
      } else {
        invalidComponents.push(component)
      }
    }
    
    if (invalidComponents.length > 0) {
      spinner.warn(`Unknown components: ${invalidComponents.join(', ')}`)
      console.log(chalk.yellow('Available components:'), AVAILABLE_COMPONENTS.join(', '))
    }
    
    if (validComponents.length === 0) {
      spinner.fail('No valid components specified')
      return
    }
    
    // Add components
    const addedComponents: string[] = []
    
    for (const component of validComponents) {
      const componentPath = path.join(targetDir, `${component}.tsx`)
      
      // Check if component exists
      if (await fs.pathExists(componentPath) && !options.force) {
        spinner.warn(`${component} already exists (use --force to overwrite)`)
        continue
      }
      
      // Generate component
      const componentCode = await getComponentTemplate(component)
      await fs.writeFile(componentPath, componentCode)
      addedComponents.push(component)
    }
    
    // Update index file
    if (addedComponents.length > 0) {
      await updateIndexFile(targetDir, addedComponents)
    }
    
    spinner.succeed(`Added ${addedComponents.length} component(s)`)
    
    if (addedComponents.length > 0) {
      console.log('\n' + chalk.green('✓ Components added:'))
      addedComponents.forEach(comp => {
        console.log(chalk.cyan(`  • ${comp}.tsx`))
      })
      
      console.log('\n' + chalk.bold('Import them in your app:'))
      console.log(chalk.cyan(`  import { ${addedComponents.map(c => c.charAt(0).toUpperCase() + c.slice(1)).join(', ')} } from './app/components'`))
    }
    
  } catch (error) {
    spinner.fail('Failed to add components')
    throw error
  }
}