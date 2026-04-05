/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#e0e7ff",
        secondary: "#f3f4f6",
        accent: "#818cf8",
        text: "#1f2937",
        light: "#f9fafb",
        dark: "#4b5563",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'neomorph-sm': '3px 3px 7px #b8b9be, -3px -3px 7px #ffffff',
        'neomorph': '6px 6px 16px #b8b9be, -6px -6px 16px #ffffff',
        'neomorph-lg': '12px 12px 24px #b8b9be, -12px -12px 24px #ffffff',
        'neomorph-inset': 'inset 6px 6px 12px #b8b9be, inset -6px -6px 12px #ffffff',
        'neomorph-card': '0 10px 30px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}
