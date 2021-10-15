import { useState, useRef } from "react";
import { Box, Text, IconButton } from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";

import { useClipboard } from "../hooks/useClipboard";

import CopyButton from "./CopyButton";

const Episode = ({ usDate, nzDate, name }) => {
  const { isCopied, handleCopy } = useClipboard();
  return (
    <Box>
      <Box w="100%">
        <Box
          w="100%"
          h="5px"
          bgGradient="linear(to-r, #FF96BC, #FFC477, #FBE84A, #C1F3A1, #96FCE4 )"
        />
        <Box>
          <Box
            d="flex"
            flexDir="row"
            alignItems="center"
            w="100%"
            mt="10px"
            justifyContent="space-around"
          >
            <Box
              d="flex"
              flexDir="row"
              alignItems="center"
              justifyContent="center"
              w="50%"
            >
              <Text id="guest" mr="10px" value={name}>
                {name}
              </Text>

              <CopyButton textToCopy={name} />
            </Box>
            <Box d="flex" justifyContent="flex-end" w="50%">
              <Text> {usDate}</Text>
            </Box>
          </Box>
          <Box
            d="flex"
            flexDir="row"
            alignItems="center"
            w="100%"
            mt="10px"
            justifyContent="space-around"
          >
            <Box d="flex" flexDir="row" justifyContent="flex-end" w="100%">
              NZ Date: {nzDate}
            </Box>
          </Box>
          <Box
            w="100%"
            h="5px"
            bgGradient="linear(to-r, #FF96BC, #FFC477, #FBE84A, #C1F3A1, #96FCE4 )"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Episode;
