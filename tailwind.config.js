/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all React files
  ],
  theme: {
    extend: {
      colors: {
        sunset1: "#ffecd2", // light peach
        sunset2: "#fcb69f", // soft orange-pink
        btn: "#f97373",     // button base
        btnHover: "#ef4444",// button hover
        textAccent: "#3f1d1d", // dark reddish text
      },
      backgroundImage: {
        'sunset-gradient': "linear-gradient(to bottom, #ffecd2, #fcb69f)",
      },
    },
  },
  plugins: [],
};
