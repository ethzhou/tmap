/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        hand: ["Patrick Hand"],
        clear: ["Comfortaa"],
        comic: ["Comic Neue"],
        text: ["Raleway"],
        mono: ["Nanum Gothic Coding"],
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
