/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0f172a",
        secondary: "#1e293b",
        accent: "#00bfff",
        accentLight: "#1e90ff",
        text: "#ffffff",
        light: "#e0f4ff",
        dark: "#cbd5e1",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'neon-sm': '0 0 10px rgba(0, 191, 255, 0.3)',
        'neon': '0 0 20px rgba(0, 191, 255, 0.5)',
        'neon-lg': '0 0 30px rgba(0, 191, 255, 0.6)',
        'neon-glow': '0 0 40px rgba(30, 144, 255, 0.6)',
        'dark-card': '0 8px 32px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
}
