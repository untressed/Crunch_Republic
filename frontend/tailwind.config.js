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
          crimson: '#dc2626', // 1. Republic Crimson (Hero Action, Buy, Add-to-cart)
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          500: '#dc2626',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          amber: '#f59e0b',   // 2. Cheddar Amber (Highlights, 20% OFF deals, rating stars)
          accent: '#f59e0b',
          obsidian: '#121214',// 3. Obsidian Charcoal (Ultra-deep luxury canvas, dark base)
          graphite: '#1e1e24',// 4. Smoky Graphite (Menu card containers, bottom sheets, elevated borders)
          pearl: '#f8fafc',   // 5. Crisp Pearl Cream (Silky high-contrast text and crisp icons)
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
