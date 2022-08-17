/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "roboto": ["'Roboto'", "sans-serif"],
        "aboreto": ['"Aboreto"', "cursive"],
        "name": ['"Roboto Condensed"', "sans-serif"],
        "cart": ['"DynaPuff"', "cursive"],
      },
    },
  },
  plugins: [],
};
