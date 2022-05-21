const Button = {
  // Styles for the base style
  baseStyle: {
    borderRadius: '10px', // <-- border radius is same for all variants and sizes
    fontFamily: 'Baloo 2',
  },

  sizes: {
    sm: {
      fontSize: '12px',
    },
    md: {
      fontsize: '18px',
    },
    lg: {
      fontSize: '22px',
    },
  },
  //   // Styles for the visual style variations
  variants: {
    lwj: {
      bgGradient:
        'linear(to-b, #ff96bc, #ffc477 , #fbe84a , #c1f3a1 , #96fce4 )',
      color: 'black',
      border: '1px solid break',
    },
  },
  //   // The default `size` or `variant` values
  //   defaultProps: {},
};

export default Button;
