/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-card":
          "linear-gradient(180deg, rgba(0, 0, 0, 0) 22.78%, #000000 122.69%)",
        "gradient": "linear-gradient(0deg, rgba(36,36,36,1) 15%, rgba(247,247,247,0) 70%)"
      },
      colors: {
        primary: "#64EEBC",
        secondary: "#242424",
      },
    },
  },
  plugins: [require('tailwindcss-animated')],
};
