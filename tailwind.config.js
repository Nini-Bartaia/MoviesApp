/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,ts}",],
    theme: {
      extend: {
        spacing:{
          '700':'43rem',
          '92':'92rem'
         
        },
        colors:{
          'worth-of-red':'#FF0000'
        },
        fontFamily:{

          'poppins':' "Poppins", sans-serif'
        }
      },
    },
  
    plugins: [],
    corePlugins: { preflight: false }
  }
  
  