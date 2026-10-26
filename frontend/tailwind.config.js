/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          500: '#dc2626', // Crunch Republic Signature Crimson Red
          600: '#b91c1c',
          700: '#991b1b',
          800: '#7f1d1d',
          accent: '#ffb703', // Cheese Gold
        },
        surface: {
          50: '#faf7f2',  // Warm cafe canvas
          100: '#f4efe6', // Warm card outlines
          200: '#e7dfd3',
        }
      },
      boxShadow: {
        'soft': '0 2px 12px -1px rgba(0, 0, 0, 0.03), 0 4px 30px -2px rgba(0, 0, 0, 0.01)',
        'premium': '0 0 0 1px rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.01), 0 16px 32px -4px rgba(0, 0, 0, 0.04)',
        'glow-indigo': '0 0 20px rgba(99, 102, 241, 0.15)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-in-right': 'slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(12px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        }
      }
    },
  },
  plugins: [],
}
