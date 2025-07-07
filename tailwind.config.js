/** @type {import('tailwindcss').Config} */
export default {
  // This line tells Tailwind to look at index.html and ALL files
  // ending in .js, .ts, .jsx, or .tsx inside the src folder.
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      // Your font and animation extensions from before
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
      keyframes: {
        'fade-in-down': {
            '0%': { opacity: '0', transform: 'translateY(-10px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.5s ease-out'
      }
    },
  },
  plugins: [],
}