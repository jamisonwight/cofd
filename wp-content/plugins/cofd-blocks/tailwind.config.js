module.exports = {
    mode: 'jit',
    content: ["./src/**/*.{html,js}", "./dynamic-blocks/**/*.{html,php}"],
    theme: {
      extend: {
        colors: {
          'white': '#ffffff',
          'off-black': '#211E1E',
          'blue-light': '#D3D9F4',
          'blue': '#7985B9',
          'blue-dark': '#505774',
          'blue-darker': '#3C425C',
          'grey-lighter': '#EBEDF5',
          'grey': '#CBD0E4',
          'bermuda': '#2D2D2E',
          'tan': '#C6BEB2',
        },
        screens: {
          '-2xl': {'max': '1919px'},
          '-xl': {'max': '1439px'},
          '-lg': {'max': '1023px'},
          '-md': {'max': '767px'},
          '-sm': {'max': '639px'},
        }
      },
    },
    plugins: [],
  }