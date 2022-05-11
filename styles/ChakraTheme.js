import { extendTheme } from '@chakra-ui/react';
import Checkbox from './Checkbox';

const theme = extendTheme({
  components: {
    Checkbox,
  },
  colors: {
    primary: '#201D29',
  },
});

export default theme;
