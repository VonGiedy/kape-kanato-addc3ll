/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Complementary Palette: Coffee & Ateneo de Davao (ColorXS)
        espresso: '#3C2A1E',       // 1. Deep Espresso / Dark Coffee
        roast: '#6F4E37',          // 2. Core Coffee Brown (Anchor)
        bean: '#A27250',           // 3. Warm Roasted Bean
        caramel: '#A27250',        // 3. Caramel accent

        // Ateneo de Davao Blues
        ateneo: {
          navy: '#1E2F3C',         // 4. Ateneo Deep Slate Navy
          blue: '#37586F',         // 5. Ateneo Steel Blue
          light: '#5081A2',        // 6. Ateneo Azure / Sky Blue
        },
        'ateneo-navy': '#1E2F3C',
        'ateneo-blue': '#37586F',
        'ateneo-light': '#5081A2',

        // Neutrals & Surfaces
        oat: '#F7F2EA',
        cream: '#FFFCF7',
        sage: '#77816A',
        muted: '#625850',
        border: '#E3DDD5'
      }
    },
  },
  plugins: [],
}
