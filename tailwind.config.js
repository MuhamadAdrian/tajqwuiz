module.exports = {
  purge: [
    "./components/**/*.{vue,js}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}"
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    boxShadow: {
      light: "0px 4px 20px rgba(0, 0, 0, 0.02)"
    },
    extend: {}
  },
  variants: {
    extend: {
      scale: ["active"],
      backgroundColor: ["active", "checked"]
    }
  },
  plugins: []
};
