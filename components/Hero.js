import { Box, Text } from "@chakra-ui/react";

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
      <Text w="55%" textAlign="center">
        Scheduled with Jason, accompanies{" "}
        <a href="https://www.learnwithjason.dev/"> Learn with Jason </a>
        and started as an internal tool, to make scheduling episodes easier.
      </Text>
    </Box>
  );
};

export default Hero;
