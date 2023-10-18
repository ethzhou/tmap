/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        hand: ["Patrick Hand"],
        display: ["Comfortaa"],
        comic: ["Comic Neue"],
        clean: ["Raleway"],
      },
      keyframes: {
        // cardhover: {
        //   "50%": { transform: "rotateY(0deg)" },
        // },
      },
      animation: {
        // cardhover: "cardhover 2s infinite",
      },
    },
  },
  plugins: [
    // "prettier-plugin-tailwindcss",
  ],
  corePlugins: {
    preflight: false,
  },
};
