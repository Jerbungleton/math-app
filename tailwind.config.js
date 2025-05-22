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
        'music-dark': '#1a1a1a',
        'music-primary': '#646cff',
      },
    },
  },
  plugins: [],
}