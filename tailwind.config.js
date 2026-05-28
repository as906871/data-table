/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'DM Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
        display: ["'Syne'", "sans-serif"],
      },
      colors: {
        ink: {
          50: "#f0f0f2",
          100: "#d8d8de",
          200: "#b3b3bf",
          300: "#8d8d9f",
          400: "#66667f",
          500: "#3f3f5f",
          600: "#2a2a45",
          700: "#1e1e33",
          800: "#131322",
          900: "#0a0a14",
          950: "#05050a",
        },
        acid: {
          50: "#f5ffe0",
          100: "#e8ffa8",
          200: "#d4ff66",
          300: "#bfff24",
          400: "#aaff00",
          500: "#88cc00",
          600: "#669900",
          700: "#446600",
          800: "#223300",
          900: "#111a00",
        },
        coral: {
          400: "#ff6b6b",
          500: "#ff4444",
          600: "#cc0000",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.2s ease-out",
        "slide-down": "slideDown 0.2s ease-out",
        "pulse-soft": "pulseSoft 2s infinite",
        shimmer: "shimmer 1.5s infinite",
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideDown: {
          from: { opacity: 0, transform: "translateY(-8px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        pulseSoft: {
          "0%,100%": { opacity: 1 },
          "50%": { opacity: 0.6 },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
