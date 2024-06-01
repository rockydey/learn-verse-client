const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {},
    colors: {
      color1: "#2ECA7F",
      color2: "#FFC600",
      color3: "#121212",
      color4: "#ffffff",
      color5: "#212121",
      color6: "#757575",
      color7: "#E0E0E0",
      color8: "#BDBDBD",
      color9: "#F3F3F3",
      color10: "#c62828",
    },
    fontFamily: {
      poppins: '"Poppins", sans-serif',
      merriweather: '"Merriweather", serif',
    },
  },
  plugins: [flowbite.plugin()],
};
