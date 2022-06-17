module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontWeight: {
      'medium': '500',
      'semibold': '600',
    },
    extend: {
      colors: {
        'primaryBlue': "rgb(6, 95, 212)",
        'myGray': "#606060",
        'disabledGray': "#909090",
        'lightGray': "rgba(0, 0, 0, 0.1)",
        'lightBlue': '#1a73e8'
      },
      boxShadow: {
        'xs': '0 0px 1px 0px rgb(6, 95, 212)',
      },
      padding: {
        'sidebar': '127px',
        'header': '70px',
        'sidebar-mini': '105px',
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}