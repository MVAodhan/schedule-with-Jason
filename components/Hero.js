import { Box, Text, useBreakpointValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import Header from '../components/Header';

const Hero = ({ hProp }) => {
  // const textColor = useBreakpointValue({base: 'black', md : 'red'})

  const fontSizeizeBreakpoints = {
    base: '16px',
    sm: '16px',
    md: '24px',
    lg: '32px',
  };
  return (
    <Box
      w="100vw"
      h={hProp}
      bgColor="primary"
      d="flex"
      justifyContent="center"
      color="white"
      fontFamily="pushster"
      fontSize="1.5rem"
      pb="30px"
    >
      <Text w="50%" textAlign="center" fontSize={fontSizeizeBreakpoints}>
        Scheduled with Jason, is an internal tool, for scheduling episodes, for
        Learn with Jason.
      </Text>
      <Text></Text>
    </Box>
  );
};

export default Hero;
