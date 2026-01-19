/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],

  // Включаем поддержку темной темы по классу (удобно для переключателя)
  darkMode: 'class',

  theme: {
    extend: {
      colors: {
        glass: {
          white: 'rgba(255, 255, 255, 0.1)', // Светлое стекло
          dark: 'rgba(0, 0, 0, 0.2)', // Темное стекло
        },
      },
      boxShadow: {
        'glass-light': '0 8px 32px 0 rgba(31, 38, 135, 0.15)', // Мягкая тень для объема
      },
    },
  },
  plugins: [],
};
