const Checkbox = {
  parts: ['control'],
  baseStyle: {
    control: {
      _checked: {
        boxShadow: 'none',
        _hover: {
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
