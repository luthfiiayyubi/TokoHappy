/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      colors: {
        cream: '#FAF7F2',
        dark: '#1A1A1A',
        accent: '#E07B39',
        muted: '#8C8C8C',
        border: '#E5E0D8',
      }
    },
  },
  plugins: [],
}
