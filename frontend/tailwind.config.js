/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0F',
        surface: '#111827',
        primary: '#00F5D4', // neon cyan
        secondary: '#7C3AED', // electric purple
        success: '#22C55E',
        warning: '#F59E0B',
        danger: '#EF4444',
        'primary-text': '#E5E7EB',
        'secondary-text': '#9CA3AF',
        'muted-text': '#6B7280',
        'border-color': '#1F2937',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'glow-cyan': 'glow-cyan 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'glow-cyan': {
          '0%': { boxShadow: '0 0 5px rgba(0, 245, 212, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(0, 245, 212, 0.6)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
