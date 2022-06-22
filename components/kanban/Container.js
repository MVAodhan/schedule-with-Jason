import { Box } from '@chakra-ui/react';

const Container = ({ children }) => {
  return (
    <Box
      h="80%"
      w="80%"
      border="1px solid red"
      display="flex"
      justifyContent="space-between"
    >
      {children}
    </Box>
  );
};

export default Container;
