import { Box, Text } from '@chakra-ui/react';

import Header from '../components/Header';

const Hero = ({ hProp }) => {
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
      <Text w="50%" textAlign="center">
        Scheduled with Jason, is an internal tool, for scheduling episodes, for
        Learn with Jason.
      </Text>
    </Box>
  );
};

export default Hero;
