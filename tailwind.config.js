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
        text: ["Raleway"],
        mono: ["Nanum Gothic Coding"],
        emoji: ["Noto Emoji"],
        redacted: ["Redacted Script"],
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
