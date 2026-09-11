/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        background: {
          light: '#F8FAFC', // Slate 50
          dark: '#0B0F17' // Deep Midnight Obsidian
        },
        surface: {
          light: '#FFFFFF',
          dark: '#111827' // Slate 900
        }
      },
      boxShadow: {
        'soft': '0 4px 24px rgba(0,0,0,0.04)',
        'soft-dark': '0 12px 32px rgba(0,0,0,0.4)',
        'coral': '0 2px 10px rgba(226,85,101,0.2)'
      },
      borderRadius: {
        '2xl': '16px',
        'xl': '12px'
      }
    },
  },
  plugins: [],
}
