import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const Header = ({ text, hProp }) => {
  const fontSizeBreakpoints = {
    base: '16px',
    sm: '20px',
    md: '24px',
    lg: '32px',
  };
  return (
    <>
      <Box
        as="header"
        bgColor="#201D29"
        display="flex"
        alignItems="center"
        justifyContent="center"
        w="100vw"
        h={hProp}
        pt="30px"
        pb="30px"
      >
        <Text
          as="h1"
          color="white"
          fontFamily="Alfa Slab One"
          fontSize={fontSizeBreakpoints}
        >
          {text}
        </Text>
      </Box>
    </>
  );
};

export default Header;
