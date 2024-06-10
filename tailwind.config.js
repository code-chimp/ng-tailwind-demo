/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        'electric-violet': {
          50: '#f6f2ff',
          100: '#ede8ff',
          200: '#ddd4ff',
          300: '#c6b1ff',
          400: '#ab85ff',
          500: '#843eff',
          600: '#8430f7',
          700: '#761ee3',
          800: '#6318bf',
          900: '#52169c',
          950: '#320b6a',
        },
      },
    },
  },
  plugins: ['@tailwindcss/forms'],
};
