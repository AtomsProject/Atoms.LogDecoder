/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './_site/**/*.html',
    './_layouts/**/*.html',
    './_posts/**/*.{md,html}',
    './_includes/**/*.html',
    './index.html'
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter", "dim", "nord", "sunset", "caramellatte", "abyss", "silk"],
  },
} 