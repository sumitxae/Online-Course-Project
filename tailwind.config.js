/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow:{
        'custom': 'rgba(102, 116, 204, 0.25) 0px 4px 10px'
      }
    },
  },
  plugins: [],
}