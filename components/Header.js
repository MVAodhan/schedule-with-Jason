import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const Header = ({ text }) => {
  return (
    <>
      <Box
        as="header"
        bgColor="#201D29"
        display="flex"
        alignItems="center"
        justifyContent="center"
        w="100vw"
        h="10vh"
        pt="30px"
        pb="30px"
      >
        <Text as="h1" color="white" fontFamily="Alfa Slab One" fontSize="36px">
          {text}
        </Text>
      </Box>
    </>
  );
};

export default Header;
