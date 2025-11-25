/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
      // Figma Design System Colors
      lightBlue: "#E2EDFF",
      main: "#3C7DFF",
      softWhite: "#F9FAFB",
      backgroundGray: "#EEEEEE",
      backgroundGray2: "#E1E1E1",
      graphGray: "#E0E2E8",
      lineGray: "#DADDE1",
      secondGray: "#A0A5AB",
      gray: "#888888",
      darkGray: "#474948",
      softBlack: "#222222",
      graphBlue: "#C3DAFF",
      secondBlue: "#72A6FF",
      graphRed: "#FF6B6B",
      red: "#EB4E48",
      // Legacy aliases for backward compatibility
      textblack: "#222222", // same as softBlack
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

