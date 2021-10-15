import React from "react";
import { Box, Text } from "@chakra-ui/react";

const Header = () => {
  return (
    <Box
      as="header"
      w="100vw"
      height="40vh"
      bgColor="#201D29"
      d="flex"
      alignItems="center"
      flexDir="column"
    >
      <Box
        w="100%"
        h="10px"
        bgGradient="linear(to-r, #FF96BC, #FFC477, #FBE84A, #C1F3A1, #96FCE4 )"
        mt="30px"
      />
      <Text
        as="h1"
        color="white"
        fontFamily="Alfa Slab One"
        mt="90px"
        fontSize="42px"
      >
        Scheduled with Jason
      </Text>
      <Box
        color="#887dab"
        fontSize="18px"
        w="auto"
        d="flex"
        flexDir="column"
        mt="30px"
      >
        <Text fontSize="18px">
          An internal tool for scheduling Learn with Jason
        </Text>
      </Box>
    </Box>
  );
};

export default Header;
