/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'appraisal-red': '#FF0000',
        'appraisal-brown': '#8B6F47',
      },
      fontFamily: {
        'noto-sans': ['"Noto Sans JP"', 'sans-serif'],
      },
      keyframes: {
        'slot-spin': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-100%)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'slot-spin': 'slot-spin 0.1s linear infinite',
        'fade-in': 'fade-in 0.5s ease-in',
      },
    },
  },
  plugins: [],
}
