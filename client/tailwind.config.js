/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-space': '#050511',
        'neon-cyan': '#00f3ff',
        'neon-purple': '#bc13fe',
        'neon-red': '#ff0055',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
      },
      backgroundImage: {
        'cosmic-radial': 'radial-gradient(circle at 50% 50%, #1a1a40 0%, #050511 100%)',
      }
    },
  },
  plugins: [],
}