import React from "react";
import { Box, Text } from "@chakra-ui/react";

const Header = () => {
  return (
    <>
      <Box
        as="header"
        bgColor="#201D29"
        display="flex"
        alignItems="center"
        justifyContent="center"
        w="100vw"
        pt="30px"
        pb="30px"
      >
        <Text as="h1" color="white" fontFamily="Alfa Slab One" fontSize="36px">
          Scheduled with Jason
        </Text>
      </Box>
    </>
  );
};

/**<Box
        w="100%"
        h="50%"
        
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
        w="auto"
        d="flex"
        flexDir="column"
        mt="30px"
        marginBottom="30px"
      >
        <Text fontSize="18px">
          An internal tool for scheduling Learn with Jason
        </Text>
      </Box> */

export default Header;
