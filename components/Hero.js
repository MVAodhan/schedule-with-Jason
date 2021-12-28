import { Box, Text } from '@chakra-ui/react';

import Header from '../components/Header';

const Hero = () => {
  return (
    <Box
      w="100vw"
      bgColor="primary"
      d="flex"
      justifyContent="center"
      color="white"
      fontFamily="pushster"
      fontSize="2rem"
      pt="10px"
      pb="30px"
    >
      <Text w="50%" textAlign="center">
        Scheduled with Jason, is an internal tool, for scheduling episodes, for
        Learn with Jason
      </Text>
    </Box>
  );
};

export default Hero;
