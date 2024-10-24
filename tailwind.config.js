/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      minHeight: {
        dh: "calc(100dvh - 80px)",
      },
    },
  },
  plugins: [],
};
