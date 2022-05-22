import { extendTheme } from '@chakra-ui/react';
import Checkbox from './components/Checkbox';
import Button from './components/Button';

const theme = extendTheme({
  components: {
    Checkbox,
    Button,
  },
  colors: {
    primary: '#201D29',
  },
  breakpoints: {
    sm: '414px',
    md: '584px',
    lg: '1280',
  },
});

export default theme;
