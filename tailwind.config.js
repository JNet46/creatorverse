/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}", // Scans all files in the src folder
    ],
    theme: {
      extend: {
        // Extending the theme to add the custom font family
        fontFamily: {
          // Sets 'Inter' as the default sans-serif font for the project.
          // The array provides fallback fonts if 'Inter' fails to load.
          sans: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
        },
        // Optional: Add a custom animation for the header fade-in effect
        keyframes: {
          'fade-in-down': {
              '0%': {
                  opacity: '0',
                  transform: 'translateY(-10px)'
              },
              '100%': {
                  opacity: '1',
                  transform: 'translateY(0)'
              },
          }
        },
        animation: {
          'fade-in-down': 'fade-in-down 0.5s ease-out'
        }
      },
    },
    plugins: [],
  }