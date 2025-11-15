/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
      maingreen: "#04C97E", 
      textblack:"#222222", //figma text - black
      textbold:"#262423", //figma text - bold
      textgray:"#AEAEAE",
      textgray2:"#9D9896",
      textgray3:"#5A5A5A",
      buttonBlack:"#302E2D",
      buttonGray:"#F2F2F2",
      bgWhite: "#E2E2E250",
      linegray:"#DEDEDE",
  },
      fontFamily: {
        mplus1: ['"M PLUS 1"', 'sans-serif'],
      },
      height: {
        'real-screen': 'calc(var(--vh, 1vh) * 100)',
      },
      minHeight: {
        'real-screen': 'calc(var(--vh, 1vh) * 100)',
        'vh-minus-header': 'var(--vh-minus-header)',
      }
    },
  },
  plugins: [],
}

