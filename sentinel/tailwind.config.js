/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#34562e",
        "primary-container": "#4b6f44",
        secondary: "#5a5f65",
        tertiary: "#7f3b00",
        error: "#ba1a1a",
      }
    },
  },
  plugins: [],
}
