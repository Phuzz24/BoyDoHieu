/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        luxuryBlack: "#1A1A1A",
        luxuryGold: "#D4AF37",
        luxuryWhite: "#F5F5F5",
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },
        accent: {
          100: "#FEF4E4",
          200: "#FCD9A0",
          300: "#F6B26B",
          400: "#E69138",
          500: "#B45F06",
        },
      },
      fontFamily: {
        body: ["Inter", "sans-serif"],
        display: ["Playfair Display", "serif"],
      },
      backgroundImage: {
        "gradient-gold": "linear-gradient(90deg, #D4AF37 0%, #F6B26B 100%)",
        "gradient-dark": "linear-gradient(90deg, #1A1A1A 0%, #2F2F2F 100%)",
      },
      boxShadow: {
        "luxury": "0 4px 15px rgba(212, 175, 55, 0.3)",
        "hover-luxury": "0 6px 20px rgba(212, 175, 55, 0.5)",
      },
      transitionProperty: {
        "all-custom": "all, transform, opacity, background-image",
      },
      transitionDuration: {
        "300": "300ms",
        "500": "500ms",
      },
    },
  },
  plugins: [],
};