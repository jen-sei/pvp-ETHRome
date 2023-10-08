/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './pages/**/*.{js,ts,tsx,tsx}',
    './components/**/*.{js,ts,tsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'taro-tarot': '#aba8e0',
        'retro-blue': '#0d3dc9'
      },
      spacing: {
        '18': '4.05rem',
      },
      fontFamily: {
        ibm: ['var(--font-ibm-mda)']
      },
      boxShadow: {
        retro: '5px 5px black',
        alligator: 'rgba(240, 46, 170, 0.4) 0px 5px, rgba(240, 46, 170, 0.3) 0px 10px, rgba(240, 46, 170, 0.2) 0px 15px, rgba(240, 46, 170, 0.1) 0px 20px, rgba(240, 46, 170, 0.05) 0px 25px'
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],

  safelist: [
    {pattern: /bg-taro-tarot/},
    {pattern: /slate-[0-9]+/},
    {pattern: /indigo-[0-9]+/},
    {pattern: /gray-[0-9]+/},
    {pattern: /blue-[0-9]+/},
    {pattern: /black/},
    {pattern: /white/},
    {pattern: /red-[0-9]+/},
    {pattern: /amber-[0-9]+/},
    {pattern: /green-[0-9]+/},
    {pattern: /w-[0-9]+/},
    {pattern: /h-[0-9]+/}
  ]
}
