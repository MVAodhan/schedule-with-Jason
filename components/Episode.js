import { Box, Text, Grid } from "@chakra-ui/react";
import { useClipboard } from "../hooks/useClipboard";

import CopyButton from "./CopyButton";

const Episode = ({
  data,
  usDate,
  nzDate,
  bufferTwoWeeks,
  bufferNinetyMinutes,
  altText,
  twoWeekTweet,
  NinetyMinTweet,
  liveTweet,
}) => {
  const { guest, title, description } = data;
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
              justifyContent="flex-start"
              w="50%"
            >
              <Text id="guest" mr="10px" pl="5%">
                {guest}
              </Text>

              <CopyButton textToCopy={guest} />
            </Box>
            <Box d="flex" justifyContent="flex-start" w="40%">
              <Text>
                <Box as="span" mr="30px">
                  US Date:
                </Box>{" "}
                {usDate}
              </Text>
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
            <Box
              d="flex"
              flexDir="row"
              alignItems="center"
              justifyContent="flex-start"
              w="50%"
            >
              <Text id="guest" mr="10px" pl="5%">
                {title}
              </Text>

              <CopyButton textToCopy={title} />
            </Box>
            <Box d="flex" justifyContent="flex-start" w="40%">
              <Text>
                <Box as="span" mr="30px">
                  NZ Date:
                </Box>{" "}
                {nzDate}
              </Text>
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
            <Box
              d="flex"
              flexDir="row"
              alignItems="center"
              justifyContent="flex-start"
              w="100%"
            >
              <Text id="guest" mr="10px" pl="5%">
                {description}
              </Text>

              <CopyButton textToCopy={description} />
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
            Buffer Scheduling Dates & Times
          </Box>
          <Grid templateColumns="repeat(3, 1fr)" gap={8} w="100%" mt="10px">
            <Box d="flex" justifyContent="center">
              2 weeks before
            </Box>
            <Box d="flex" justifyContent="center">
              90 minutes before
            </Box>
            <Box d="flex" justifyContent="center">
              Going live
            </Box>
          </Grid>
          <Grid templateColumns="repeat(3, 1fr)" gap={8} w="100%">
            <Box d="flex" justifyContent="center" mt="10px">
              {bufferTwoWeeks}
            </Box>
            <Box d="flex" justifyContent="center" mt="10px">
              {bufferNinetyMinutes}
            </Box>
            <Box d="flex" justifyContent="center" mt="10px">
              {usDate}
            </Box>
          </Grid>
          <Grid templateColumns="repeat(3, 1fr)" gap={8} w="100%">
            <Box d="flex" justifyContent="center" mt="10px">
              <CopyButton textToCopy={twoWeekTweet} />
            </Box>
            <Box d="flex" justifyContent="center" mt="10px">
              <CopyButton textToCopy={NinetyMinTweet} />
            </Box>
            <Box d="flex" justifyContent="center" mt="10px">
              <CopyButton textToCopy={liveTweet} />
            </Box>
          </Grid>
          <Box d="flex" alignItems="center" justifyContent="center" w="100%">
            <Text id="guest" mr="10px" pl="5%">
              Alt Text
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Episode;
