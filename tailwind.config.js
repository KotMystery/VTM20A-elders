/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'vtm-red': '#8B0000',
        'vtm-dark': '#1a1a1a',
        'vtm-grey': '#2d2d2d',
      }
    },
  },
  plugins: [],
}
