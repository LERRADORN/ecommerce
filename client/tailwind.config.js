/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {},
    variants: {
      extend: {},
    },
    plugins: [
      require("tailgrids/plugin"),
      require("@tailwindcss/forms"),
      require("daisyui"),
    ],
  };

