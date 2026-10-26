/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        espresso: '#2B1D16',
        roast: '#5A3825',
        bean: '#7A5138',
        caramel: '#B98556',
        oat: '#F7F2EA',
        cream: '#FFFCF7',
        sage: '#77816A',
        muted: '#6F6259',
        border: '#E5D9CC'
      }
    },
  },
  plugins: [],
}