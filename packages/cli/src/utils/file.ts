import fs from 'fs-extra'
import path from 'path'

export async function updateIndexFile(targetDir: string, newComponents: string[]) {
  const indexPath = path.join(targetDir, 'index.ts')
  
  // Read existing index file if it exists
  let existingContent = ''
  if (await fs.pathExists(indexPath)) {
    existingContent = await fs.readFile(indexPath, 'utf-8')
  }
  
  // Extract existing component exports
  const existingExports = new Set<string>()
  const exportRegex = /export \{ (\w+) \} from '\.\/(\w+)'/g
  let match
  
  while ((match = exportRegex.exec(existingContent)) !== null) {
    existingExports.add(match[2])
  }
  
  // Add new components
  newComponents.forEach(comp => existingExports.add(comp))
  
  // Generate new index content
  const allComponents = Array.from(existingExports).sort()
  const newContent = `// ZenXUI Components
// Auto-generated exports

export * from './ui'

${allComponents.map(comp => 
  `export { ${comp.charAt(0).toUpperCase() + comp.slice(1)} } from './${comp}'`
).join('\n')}

// Re-export core ZenXUI components
export { 
  Box, 
  Text, 
  Stack,
  ThemeProvider,
  useTheme,
  useColorMode 
} from 'zenxui'`
  
  await fs.writeFile(indexPath, newContent)
}

export async function ensureFileExists(filePath: string, defaultContent: string = '') {
  if (!await fs.pathExists(filePath)) {
    await fs.ensureDir(path.dirname(filePath))
    await fs.writeFile(filePath, defaultContent)
  }
}

export function normalizeComponentName(name: string): string {
  // Convert kebab-case or snake_case to PascalCase
  return name
    .split(/[-_]/)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('')
}

export function createImportPath(componentName: string, relativePath: string = '.') {
  const normalizedName = normalizeComponentName(componentName)
  return `import { ${normalizedName} } from '${relativePath}/${componentName.toLowerCase()}'`
}

export async function readTemplate(templateName: string): Promise<string> {
  const templatePath = path.join(__dirname, '../../templates', templateName)
  if (await fs.pathExists(templatePath)) {
    return await fs.readFile(templatePath, 'utf-8')
  }
  throw new Error(`Template not found: ${templateName}`)
}

export function replaceTemplateVariables(
  template: string, 
  variables: Record<string, string>
): string {
  let result = template
  
  Object.entries(variables).forEach(([key, value]) => {
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g')
    result = result.replace(regex, value)
  })
  
  return result
}

export async function copyTemplateFiles(
  templateDir: string,
  targetDir: string,
  variables: Record<string, string> = {}
) {
  if (!await fs.pathExists(templateDir)) {
    throw new Error(`Template directory not found: ${templateDir}`)
  }
  
  await fs.ensureDir(targetDir)
  
  const files = await fs.readdir(templateDir, { withFileTypes: true })
  
  for (const file of files) {
    const sourcePath = path.join(templateDir, file.name)
    const targetPath = path.join(targetDir, file.name)
    
    if (file.isDirectory()) {
      await copyTemplateFiles(sourcePath, targetPath, variables)
    } else {
      const content = await fs.readFile(sourcePath, 'utf-8')
      const processedContent = replaceTemplateVariables(content, variables)
      await fs.writeFile(targetPath, processedContent)
    }
  }
}