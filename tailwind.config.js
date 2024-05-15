/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {},
      colors: {
        primaryLight: "#27dd67",
        secondaryLight: "#91e1ed",
        accentLight: "#53ace4",
        bgLight: "#f6fef9",
        textLight: "#03160a",

        primaryDark: "#22d862",
        secondaryDark: "#12616e",
        accentDark: "#1b74ac",
        bgDark: "#010904",
        textDark: "#e9fcf0",
      },
      fontSize: {
        xs: ["4px", "8px"],
        sm: ["10px", "16px"],
        base: ["16px", "24px"],
        lg: ["20px", "28px"],
        xl: ["24px", "32px"],
        "2xl": ["32px", "40px"],
        "3xl": ["40px", "48px"],
        "4xl": ["48px", "56px"],
        "5xl": ["56px", "64px"],
        "6xl": ["64px", "72px"],
        "7xl": ["72px", "80px"],
        "8xl": ["88px", "96px"],
        "9xl": ["120px", "128px"],
      },
    },
  },
  plugins: [],
};
