const { colors, spacing, fontSize, fontWeight, borderRadius } = require('./lib/tokens')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    '../**/*.{js,jsx,ts,tsx}',
    '../../**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors,
      spacing,
      fontSize,
      fontWeight,
      borderRadius,
      fontFamily: {
        sans: [
          'System',
          '-apple-system',
          'BlinkMacSystemFont',
          'Helvetica Neue',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
        mono: [
          'Menlo',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'Courier New',
          'monospace',
        ],
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
}