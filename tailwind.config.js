/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
    './node_modules/flowbite/**/*.js'
  ],
  theme: {
    extend: {
      transitionProperty: {
        width: 'width',
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
};
