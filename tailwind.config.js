/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        name: ["Patrick Hand"],
        display: ["Comfortaa"],
        raleway: ["Raleway"],
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
