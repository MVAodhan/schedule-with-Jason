const Checkbox = {
  parts: ['control'],
  baseStyle: {
    control: {
      borderLeftColor: '#ff96bc',
      borderRightColor: '#ffc477',
      borderBottomColor: '#fbe84a',
      borderRightColor: '#c1f3a1',
      bgGradient:
        'linear(to-b, #ff96bc, #ffc477 , #fbe84a , #c1f3a1 , #96fce4 )',
      _focus: {
        bgGradient:
          'linear(to-b, #ff96bc, #ffc477 , #fbe84a , #c1f3a1 , #96fce4 )',
        color: 'black',
        boxShadow: 'none',
      },
      _checked: {
        bgGradient:
          'linear(to-b, #ff96bc, #ffc477 , #fbe84a , #c1f3a1 , #96fce4 )',
        color: 'black',
        boxShadow: 'none',
        border: 'none',
        _hover: {
          bgGradient:
            'linear(to-b, #ff96bc, #ffc477 , #fbe84a , #c1f3a1 , #96fce4 )',
          color: 'black',
        },
      },
    },
  },
  defaultProps: {
    size: 'lg',
  },
};

export default Checkbox;
