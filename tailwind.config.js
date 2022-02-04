module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            blockquote: {
              fontStyle: 'normal'
            },
            'code::before': false,
            'code::after': false,
            'blockquote p:first-of-type::before': false,
            'blockquote p:last-of-type::after': false,
          }
        }
      })
    }
  },
  variants: {},
  plugins: [
    require('@tailwindcss/typography'),
  ],
}