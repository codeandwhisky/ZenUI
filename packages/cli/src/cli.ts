#!/usr/bin/env node
import { Command } from 'commander'
import chalk from 'chalk'
import { initCommand } from './commands/init'
import { addCommand } from './commands/add'
import { tokensCommand } from './commands/tokens'
import { checkA11yCommand } from './commands/check-a11y'
import { benchCommand } from './commands/bench'
import { generateCommand } from './commands/generate'

const program = new Command()

program
  .name('uxlib')
  .description('ZenXUI CLI - Independent, high-performance, theme-first UI library')
  .version('0.1.0')

// Initialize project
program
  .command('init')
  .description('Initialize ZenXUI in your project')
  .option('-d, --dir <directory>', 'Target directory', '.')
  .option('-t, --template <template>', 'Project template', 'default')
  .action(initCommand)

// Add components
program
  .command('add')
  .description('Add components to your project')
  .argument('<components...>', 'Components to add (e.g., button card modal)')
  .option('-d, --dir <directory>', 'Target directory', './app/components')
  .option('-f, --force', 'Overwrite existing files', false)
  .action(addCommand)

// Token management
program
  .command('tokens')
  .description('Token management commands')
  .option('generate', 'Generate type-safe tokens')
  .option('sync', 'Sync tokens with design system')
  .action(tokensCommand)

// Accessibility check
program
  .command('check')
  .alias('a11y')
  .description('Check accessibility compliance')
  .option('-p, --path <path>', 'Path to check', './app')
  .action(checkA11yCommand)

// Performance benchmarks
program
  .command('bench')
  .description('Run performance benchmarks')
  .option('-c, --component <component>', 'Component to benchmark')
  .option('-o, --output <format>', 'Output format (json|table)', 'table')
  .action(benchCommand)

// Generate custom components
program
  .command('generate')
  .alias('gen')
  .description('Generate custom component scaffolding')
  .argument('<component>', 'Component name')
  .option('-t, --type <type>', 'Component type (primitive|pattern)', 'pattern')
  .option('-d, --dir <directory>', 'Output directory', './app/components')
  .action(generateCommand)

// Error handling
program.configureOutput({
  writeErr: (str: string) => process.stderr.write(chalk.red(str))
})

program.parseAsync(process.argv).catch((error) => {
  console.error(chalk.red('Error:'), error.message)
  process.exit(1)
})