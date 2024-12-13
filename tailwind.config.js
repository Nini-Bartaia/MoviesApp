/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,ts}",],
    theme: {
      extend: {
        spacing:{
          '700':'43rem',
          '92':'92rem',
          '42':'42rem',
          '23':'23rem',
          '15':'15rem'
         
        },
        colors:{
          'worth-of-red':'#FF0000'
        },
        fontFamily:{

          'poppins':' "Poppins", sans-serif'
        },
        zIndex:{
          '5000':'5000'
        },
        
      },
    },
  
    plugins: [],
    corePlugins: { preflight: false }
  }
  
  