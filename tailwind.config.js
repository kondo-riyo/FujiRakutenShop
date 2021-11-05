module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
      //  base_red: '#994837',
        base_red: '#877667',
        base_aka: '#994837',
        base_orange: '#bd5c47',
        base_green: '#3f582e',
        base_cream: '#f2e0ca',
        base_gray: '#998675',
        base_of: '#f6f5f1',
        base_yellow: '#f0e4d5',
        base_brown: '#593315',
      },
      width: {
        550: '550px',
        600: '600px',
        650: '650px',
        700: '700px',
        800: '800px',
        900: '900px',
        1000: '1000px',
      },
      height: {
        400: '400px',
      },
      rotate: {
        270: '270deg',
      },
      // backgroundImage: theme => ({
      //   'cafe-pattern': "url('./assets/img/cafe_background.jpeg')",
      // })
      backgroundImage: (theme) => ({
        starbucks: "url('assets/img/coffee-2734137_1280.webp')",
      }),
    },
  },
  variants: {
    extend: {
      backgroundColor: ['checked'],
    },
  },
  plugins: [],
};
