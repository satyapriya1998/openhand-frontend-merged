/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
        "./src/**/*.{html,ts}"
  ],
   theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        border: {
          DEFAULT: 'oklch(0.9 0.01 250)',
        },
        foreground: {
          DEFAULT: 'oklch(0.15 0.03 280)',
        },
        secondary: {
          DEFAULT: 'oklch(0.97 0.01 280)',
        },
        background: {
          DEFAULT: 'oklch(0.99 0.01 280)',
        },
        muted: {
          foreground: 'oklch(0.55 0.02 280)',
        },
        accent: {
          DEFAULT: 'oklch(0.97 0.02 280)',
        },
        'primary-foreground': {
          DEFAULT: 'oklch(0.98 0.01 280)',
        },
        'muted-foreground': {
          DEFAULT: 'oklch(0.55 0.02 280)',
        },
        'accent-foreground': {
          DEFAULT: 'oklch(0.15 0.03 280)',
        },
        card: {
          DEFAULT: 'oklch(0.99 0.01 280)',
        },
        'card-foreground': {
          DEFAULT: 'oklch(0.15 0.03 280)',
        },
        popover: {
          DEFAULT: 'oklch(0.99 0.01 280)',
        },
        'popover-foreground': {
          DEFAULT: 'oklch(0.15 0.03 280)',
        },
        destructive: {
          DEFAULT: 'oklch(0.55 0.2 25)',
        },
        'destructive-foreground': {
          DEFAULT: 'oklch(0.98 0.01 280)',
        },
        input: 'oklch(0.9 0.01 250)',
        ring: 'oklch(0.6 0.2 250)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      transitionProperty: {
        'width': 'width',
        'spacing': 'margin, padding',
      }
    },
  },
  plugins: [],
}

