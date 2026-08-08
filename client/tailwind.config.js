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
        'glass-panel': 'rgba(255, 255, 255, 0.05)',
        'glass-border': 'rgba(255, 255, 255, 0.1)',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'cosmic-radial': 'radial-gradient(circle at 50% 50%, #1a1a40 0%, #050511 100%)',
        'gradient-cta': 'linear-gradient(135deg, #00f3ff 0%, #bc13fe 100%)',
      },
      boxShadow: {
        'subtle': '0 4px 12px rgba(0, 0, 0, 0.15)',
        'card': '0 2px 8px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}