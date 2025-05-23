// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-background': '#FFF3E0', // A very light orange, close to white
        'brand-surface': '#FFE0B2',   // Light orange for cards, sections
        'brand-primary': '#FF9800',   // Main orange (e.g., buttons, highlights)
        'brand-primary-dark': '#F57C00', // Darker orange for hover states or primary text
        'brand-secondary': '#FFB74D', // A lighter, secondary orange
        'brand-text-light': '#FFFFFF',   // For text on dark orange backgrounds
        'brand-text-dark': '#424242',    // Dark grey for primary text on light backgrounds
        'brand-text-muted': '#757575', // Lighter grey for secondary text
        // Old colors - keep if still used anywhere, or remove if fully replaced
        // 'music-dark': '#1a1a1a',
        // 'music-primary': '#646cff',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.5s ease-out forwards',
      }
    },
  },
  plugins: [],
}