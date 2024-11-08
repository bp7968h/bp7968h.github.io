/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./templates/**/*.html", "./static/script.js"],
  darkMode: "class",
  theme: {
    screens: {
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      inset: {
        '17': '68px',
        '26': '104px'
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
