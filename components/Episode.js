import { useState } from 'react';

import { useRouter } from 'next/router';

import { Box, Text, IconButton, useToast } from '@chakra-ui/react';

import ExpandIcon from './ExpandIcon';

import copy from 'copy-to-clipboard';

import styles from '../styles/Episode.module.css';

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
  const router = useRouter();

  const [isExpanded, setIsExpanded] = useState(false);
  const toast = useToast();

  const handleCopy = (textToCopy) => {
    let stringToCopy = textToCopy.toString();
    copy(stringToCopy);
  };

  console.log(`${data.guest} is expanded: ${isExpanded}`);

  return (
    <Box display="flex" justifyContent="center">
      <Box
        w="100%"
        h="auto"
        className={styles.container}
        d="flex"
        flexDirection="column"
      >
        <Box
          w="100%"
          h="auto"
          bg="primary"
          borderTopLeftRadius="20px"
          borderTopRightRadius="20px"
          borderBottomLeftRadius="20px"
          borderBottomRightRadius="20px"
          d="flex"
          flexDir="column"
        >
          {' '}
          {data.title && (
            <>
              <Box w="100%" d="flex" justifyContent="flex-end">
                <Box w="100%" d="flex" justifyContent="flex-end"></Box>
                <IconButton
                  aria-label="Expand episode"
                  icon={<ExpandIcon />}
                  bgColor="transparent"
                  _hover={{ bg: 'transparent' }}
                  mt="2px"
                  onClick={() => router.push(`/edit/${data.id}`)}
                  // onClick={() => {
                  //   setIsExpanded(!isExpanded);
                  // }}
                />
              </Box>
              <Box w="100%" d="flex" justifyContent="center">
                <Text
                  color="white"
                  cursor="pointer"
                  fontFamily="Alfa Slab One"
                  fontSize="1.2rem"
                  onClick={() => {
                    handleCopy(data.guest);
                    toast({
                      title: 'Guest copied.',
                      description:
                        'The Guest has been copied to your clipboard.',
                      status: 'success',
                      duration: 3000,
                      isClosable: true,
                    });
                  }}
                >
                  {data.guest}
                </Text>
              </Box>
            </>
          )}
          <Box
            w="100%"
            borderTopLeftRadius="20px"
            borderTopRightRadius="20px"
            d="flex"
            justifyContent="space-between"
            pl="5%"
            pr="5%"
          >
            <Text
              color="white"
              w="100%"
              d="flex"
              justifyContent="center"
              cursor="pointer"
              bgGradient="linear(to-r, #FF96BC, #FFC477, )"
              fontFamily="Alfa Slab One"
              fontSize="1.2rem"
              bgClip="text"
              onClick={() => {
                handleCopy(data.title);
                toast({
                  title: 'Text copied.',
                  description: 'The text has been copied to your clipboard.',
                  status: 'success',
                  duration: 3000,
                  isClosable: true,
                });
              }}
            >
              {data.title}
            </Text>
          </Box>
          <Box
            w="100%"
            color="white"
            d="flex"
            justifyContent="space-around"
            mt="10px"
            fontFamily="Railway"
            fontSize="1.1rem"
          >
            <Text>PST: {usDate}</Text>
            <Text>NZT: {nzDate}</Text>
          </Box>
        </Box>
        {isExpanded && (
          <Box
            w="100%"
            display="flex"
            flexDir="column"
            alignItems="center"
            fontFamily="Railway"
            fontSize="1.2rem"
          >
            <Box w="100%" d="flex" justifyContent="center">
              <Text>Tweets</Text>
            </Box>
            <Box w="100%" d="flex" justifyContent="center" mt="10px">
              <Box w="100%" h="20px" d="flex" justifyContent="space-between">
                <Text
                  w="33%"
                  d="flex"
                  justifyContent="center"
                  cursor="pointer"
                  onClick={() => {
                    handleCopy(twoWeekTweet);
                    toast({
                      title: 'Text copied.',
                      description: 'Copied two week tweet to your clipboard.',
                      status: 'success',
                      duration: 3000,
                      isClosable: true,
                    });
                  }}
                >
                  Two Weeks
                </Text>
                <Text
                  w="33%"
                  d="flex"
                  justifyContent="center"
                  cursor="pointer"
                  onClick={() => {
                    handleCopy(ninetyMinTweet);
                    toast({
                      title: 'Text copied.',
                      description:
                        'Copied ninety minute tweet to your clipboard.',
                      status: 'success',
                      duration: 3000,
                      isClosable: true,
                    });
                  }}
                >
                  Ninety Minutes
                </Text>
                <Text
                  w="33%"
                  d="flex"
                  justifyContent="center"
                  cursor="pointer"
                  onClick={() => {
                    handleCopy(liveTweet);
                    toast({
                      title: 'Text copied.',
                      description: 'Copied live tweet to your clipboard.',
                      status: 'success',
                      duration: 3000,
                      isClosable: true,
                    });
                  }}
                >
                  Live
                </Text>
              </Box>
            </Box>
            <Box w="100%" d="flex" justifyContent="space-around" mt="10px">
              <Text>{bufferTwoWeeks}</Text>
              <Text>{bufferNinetyMinutes}</Text>
              <Text>{usDate}</Text>
            </Box>
            <Box w="100%" d="flex" justifyContent="space-around" mt="10px">
              <Text
                cursor="pointer"
                onClick={() => {
                  handleCopy(altText);
                  toast({
                    title: 'Text copied.',
                    description: 'Copied alt text to your clipboard.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                  });
                }}
              >
                Alt Text
              </Text>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Episode;
