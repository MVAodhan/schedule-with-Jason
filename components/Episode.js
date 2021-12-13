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
  ninetyMinTweet,
  liveTweet,
}) => {
  const { isCopied, handleCopy } = useClipboard();

  console.log(`${data.title}, ${data.description}`);

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
                {data.guest}
              </Text>

              <CopyButton textToCopy={data.guest} />
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
              {data.title && (
                <Box>
                  <Text id="guest" mr="10px" pl="5%">
                    {data.title}
                  </Text>

                  <CopyButton textToCopy={data.title} />
                </Box>
              )}
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
              {data.description && (
                <Box>
                  <Text id="guest" mr="10px" pl="5%">
                    {data.description}
                  </Text>
                  <CopyButton textToCopy={data.description} />
                </Box>
              )}
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
              <CopyButton textToCopy={ninetyMinTweet} />
            </Box>
            <Box d="flex" justifyContent="center" mt="10px">
              <CopyButton textToCopy={liveTweet} />
            </Box>
          </Grid>
          <Box d="flex" alignItems="center" justifyContent="center" w="100%">
            {altText && (
              <Box>
                <Text id="guest" mr="10px" pl="5%">
                  Alt Text
                </Text>
                <CopyButton textToCopy={altText} />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Episode;
