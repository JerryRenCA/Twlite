/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bg-hot': "url('/assets/pexels-abdullah-ghatasheh-1631678.jpg')",
        'footer-texture': "url('/img/footer-texture.png')",
      },
      fontFamily:{
        'playfair':['Playfair Display', 'sans-serif'],
        'roboto':['Roboto','sans-serif'],
        'satisfy':['Satisfy', 'cursive'],
        'ubuntu-c':['Ubuntu Condensed', 'sans-serif'],
      },
      keyframes:{
        'blink':{
          '0%': {
            opacity:0
          },
        }
      },
      animation:{
        'blink':'blink 1s steps(2) infinite'
      }
    },
  },
  plugins: [],
}