/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cyan: {
          100: '#E0FCFF',
          200: '#BEF8FD',
          300: '#8CF1FA',
          400: '#47E3F5',
          500: '#06B6D4',
          600: '#0894A9',
          700: '#0A7285',
          800: '#0B5563',
          900: '#0C3A44',
        },
        gray: {
          850: '#1a222e',
          950: '#050e18',
        },
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        jetbrains: ['JetBrains Mono', 'monospace'],
        sans: ['Roboto', 'sans-serif'],
      },
      boxShadow: {
        'neon-cyan': '0 0 5px rgba(6, 182, 212, 0.5), 0 0 20px rgba(6, 182, 212, 0.3)',
        'neon-green': '0 0 5px rgba(34, 197, 94, 0.5), 0 0 20px rgba(34, 197, 94, 0.3)',
      },
    },
  },
  plugins: [],
};