/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./js/script.js"],
  darkMode: "class",
  theme: {
    letterSpacing: {
      thewidest: ".19em",
    },
    extend: {
      colors: {
        goldish: "#FFD600",
      },
      fontFamily: {
        sans: ["Staatliches", "sans-serif"],
        opensans: ["Open Sans", "sans-serif"],
      },
      backgroundImage: (theme) => ({
        bgW: "url('../images/whitemode/bgW.png')",
        globeW: "url('../images/whitemode/globeW.png')",
        heartW: "url('../images/whitemode/heartW.png')",
        likeW: "url('../images/whitemode/likeW.png')",
        printerW: "url('../images/whitemode/printerW.png')",
        scissorsW: "url('../images/whitemode/scissorsW.png')",
        smileW: "url('../images/whitemode/smileW.png')",
        sunW: "url('../images/whitemode/sunW.png')",

        bgD: "url('../images/darkmode/bgD.png')",
        globeD: "url('../images/darkmode/globeD.png')",
        heartD: "url('../images/darkmode/heartD.png')",
        likeD: "url('../images/darkmode/likeD.png')",
        printerD: "url('../images/darkmode/printerD.png')",
        scissorsD: "url('../images/darkmode/scissorsD.png')",
        smileD: "url('../images/darkmode/smileD.png')",
        sunD: "url('../images/darkmode/sunD.png')",
      }),
    },
  },
  variants: {
    extend: {
      backgroundImage: ["dark"],
    },
  },
  plugins: [],
};