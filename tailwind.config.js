module.exports = {
  content: ['./src/**/*.js'],
  theme: {
    extend: {
      colors:{
        'primary-black': '#282c35',
        'secondary-black': '#363c48'
      }
    }
  },
  plugins: [
    require("@tailwindcss/forms"),
  ],
}
