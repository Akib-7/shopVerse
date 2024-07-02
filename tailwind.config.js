/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors:{
        shiny:"#ED9818",
        blood:"#7F0E16",
        nightText:"#fdcc41",
        shadowColor:"#FFF6E9",
        cartBar:'#504C3A',
        hoverColor:'#F8BB5F'
      }
    },
  },
  plugins: [],
}
