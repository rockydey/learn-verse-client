const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {},
    colors: {
      color1: "#2ECA7F",
      color2: "#FFBA00",
      color3: "#111111",
      color4: "#ffffff",
      color5: "#212121",
      color6: "#757575",
      color7: "#E0E0E0",
      color8: "#BDBDBD",
      color9: "#F3F3F3",
      color10: "#c62828",
      color11: "#FFBA00",
    },
    fontFamily: {
      poppins: '"Poppins", sans-serif',
      merriweather: '"Merriweather", serif',
    },
  },
  plugins: [flowbite.plugin()],
};
