import chalk from 'chalk'
import ora from 'ora'
import { glob } from 'glob'
import fs from 'fs-extra'

interface CheckA11yOptions {
  path: string
}

export async function checkA11yCommand(options: CheckA11yOptions) {
  const spinner = ora('Checking accessibility compliance...').start()
  
  try {
    const files = await glob('**/*.{tsx,jsx}', {
      cwd: options.path,
      ignore: ['node_modules/**', 'dist/**', 'build/**']
    })
    
    if (files.length === 0) {
      spinner.warn('No React files found')
      return
    }
    
    const issues: A11yIssue[] = []
    
    for (const file of files) {
      const filePath = `${options.path}/${file}`
      const content = await fs.readFile(filePath, 'utf-8')
      const fileIssues = await checkFileA11y(filePath, content)
      issues.push(...fileIssues)
    }
    
    if (issues.length === 0) {
      spinner.succeed('No accessibility issues found!')
    } else {
      spinner.warn(`Found ${issues.length} accessibility issue(s)`)
      
      // Group issues by severity
      const critical = issues.filter(i => i.severity === 'critical')
      const warning = issues.filter(i => i.severity === 'warning')
      const info = issues.filter(i => i.severity === 'info')
      
      if (critical.length > 0) {
        console.log('\n' + chalk.red.bold(`Critical Issues (${critical.length}):`))
        critical.forEach(issue => {
          console.log(chalk.red(`  ✗ ${issue.message}`))
          console.log(chalk.gray(`    ${issue.file}:${issue.line}`))
        })
      }
      
      if (warning.length > 0) {
        console.log('\n' + chalk.yellow.bold(`Warnings (${warning.length}):`))
        warning.forEach(issue => {
          console.log(chalk.yellow(`  ⚠ ${issue.message}`))
          console.log(chalk.gray(`    ${issue.file}:${issue.line}`))
        })
      }
      
      if (info.length > 0) {
        console.log('\n' + chalk.cyan.bold(`Info (${info.length}):`))
        info.forEach(issue => {
          console.log(chalk.cyan(`  ℹ ${issue.message}`))
          console.log(chalk.gray(`    ${issue.file}:${issue.line}`))
        })
      }
      
      console.log('\n' + chalk.bold('Recommendations:'))
      console.log('• Use semantic HTML elements and ARIA attributes')
      console.log('• Ensure proper color contrast ratios')
      console.log('• Add focus management for interactive elements')
      console.log('• Test with screen readers and keyboard navigation')
    }
    
  } catch (error) {
    spinner.fail('Failed to check accessibility')
    throw error
  }
}

interface A11yIssue {
  file: string
  line: number
  severity: 'critical' | 'warning' | 'info'
  message: string
  rule: string
}

async function checkFileA11y(filePath: string, content: string): Promise<A11yIssue[]> {
  const issues: A11yIssue[] = []
  const lines = content.split('\n')
  
  // Basic accessibility checks
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const lineNumber = i + 1
    
    // Check for missing alt text on images
    if (line.includes('<Image') && !line.includes('alt=') && !line.includes('accessibilityLabel=')) {
      issues.push({
        file: filePath,
        line: lineNumber,
        severity: 'critical',
        message: 'Image missing alt text or accessibilityLabel',
        rule: 'img-alt'
      })
    }
    
    // Check for missing accessibilityRole on touchable elements
    if ((line.includes('<TouchableOpacity') || line.includes('<Pressable')) && 
        !line.includes('accessibilityRole=')) {
      issues.push({
        file: filePath,
        line: lineNumber,
        severity: 'warning',
        message: 'Interactive element missing accessibilityRole',
        rule: 'interactive-role'
      })
    }
    
    // Check for missing labels on form inputs
    if (line.includes('<TextInput') && !line.includes('accessibilityLabel=') && !line.includes('placeholder=')) {
      issues.push({
        file: filePath,
        line: lineNumber,
        severity: 'warning',
        message: 'TextInput missing accessibilityLabel or placeholder',
        rule: 'input-label'
      })
    }
    
    // Check for low contrast text (basic pattern matching)
    if (line.includes('color:') && (line.includes('#ccc') || line.includes('#ddd'))) {
      issues.push({
        file: filePath,
        line: lineNumber,
        severity: 'info',
        message: 'Potential low contrast text color',
        rule: 'color-contrast'
      })
    }
  }
  
  return issues
}