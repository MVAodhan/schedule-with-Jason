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
        Learn with Jason. Some of the text below is clickable, to make it easier
        to paste elsewhere. It's a work in progress and is invite only to add
        episodes
      </Text>
    </Box>
  );
};

export default Hero;
