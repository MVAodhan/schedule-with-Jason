import React from "react";
import Header from "../components/Header";

import { Box, Text } from "@chakra-ui/react";

import CopyButton from "../components/CopyButton";

const Snipets = () => {
  const credits = `This episode was sponsored by:
- Netlify (https://lwj.dev/netlify)
- Fauna (https://lwj.dev/fauna)
- Auth0 (https://lwj.dev/auth0)

Live transcription by White Coat Captioning (https://whitecoatcaptioning.com/)

Credits:

Local Elevator by Kevin MacLeod is licensed under a Creative Commons Attribution license (https://creativecommons.org/licenses/by/4.0/)
Source: http://incompetech.com/music/royalty-free/index.html?isrc=USUAN1300012
Artist: http://incompetech.com/

Busybody by Audionautix is licensed under a Creative Commons Attribution license (https://creativecommons.org/licenses/by/4.0/)
Artist: http://audionautix.com/

Additional sound effects obtained from https://www.zapsplat.com `;
  return (
    <>
      <Header />
      <Box
        d="flex"
        justifyContent="center"
        bgColor="#201D29"
        alignContent="start"
      >
        <Text as="h2" color="white" fontFamily="Alfa Slab One" fontSize="36px">
          Snipets
        </Text>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        w="100vw"
        h="40vh"
      >
        <Box
          w="80%"
          h="100%"
          display="flex"
          justifyContent="center"
          alignContent="center"
        >
          <Text
            w="80%"
            h="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            color="#ccc2a7"
          >
            {credits}
            <CopyButton textToCopy={credits} />
          </Text>
        </Box>
      </Box>
    </>
  );
};

export default Snipets;
