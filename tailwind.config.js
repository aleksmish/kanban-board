/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: 
      {
        "navbarTitle": 'hsl(var(--navbarTitle))',
        "title": "hsl(var(--title))",
        'border': 'hsl(var(--border))',
        'text': 'hsl(var(--text))',
        'addBtn': 'hsl(var(--addBtn))'
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
        {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
          "base-100": "#DBE59E",
          "primary": "#6aa84f",
          '--navbarTitle': '50, 53%, 34%',
          '--title': '40, 100%, 26%',
          '--border': '90, 21%, 26%',
          '--text': '0, 0%, 0%',
          '--addBtn': '94, 22%, 45%',
        },
        dark: {
          ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
          "primary": "#5663F7",
          '--navbarTitle': '0, 0%, 100%',
          '--title': '0, 0%, 96%',
          '--border': '221, 100%, 50%',
          '--text': '0, 0%, 100%',
          '--addBtn': '195, 7%, 11%'
        }
      }
    ]
  },
}