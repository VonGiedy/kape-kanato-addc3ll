/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        espresso: '#1E140E',
        umber: '#523B26',
        'umber-dark': '#382718',
        'umber-light': '#6B4F35',
        roast: '#452E1D',
        bean: '#745034',
        caramel: '#C89258',
        latte: '#EAE0D2',
        oat: '#F5EFE6',
        cream: '#FCF9F4',
        sage: '#6E7A61',
        muted: '#6B5A4D',
        border: '#DDD0BF'
      },
      fontFamily: {
        display: ['"Montserrat"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fadeInUp 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      }
    },
  },
  plugins: [],
}
