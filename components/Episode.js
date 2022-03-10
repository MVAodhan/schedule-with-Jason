import { useState } from 'react';

import { useRouter } from 'next/router';

import { useSupabase } from '../hooks/useSupabase';

import {
  Box,
  Text,
  IconButton,
  useToast,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Button,
  useDisclosure,
} from '@chakra-ui/react';

import { BiEditAlt, BiTrash } from 'react-icons/bi';

import copy from 'copy-to-clipboard';

import styles from '../styles/Episode.module.css';

const Episode = ({ data, usDate, nzDate, title }) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const supabase = useSupabase();
  const toast = useToast();

  const handleCopy = (textToCopy) => {
    let stringToCopy = textToCopy.toString();
    copy(stringToCopy);
  };

  const handleDelete = async () => {
    const { data, error } = await supabase
      .from('episodes')
      .delete()
      .match({ title: title });

    router.reload();
  };

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
          {data && (
            <>
              <Box w="100%" d="flex">
                <Box w="100%" d="flex" justifyContent="space-between">
                  <Popover>
                    <PopoverTrigger>
                      <IconButton
                        aria-label="Expand episode"
                        icon={<BiTrash fill="red" />}
                        bgColor="transparent"
                        fontSize="20px"
                        _hover={{ bg: 'transparent' }}
                        mt="2px"
                      />
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverHeader>Confirmation!</PopoverHeader>
                      <PopoverBody>
                        <Box display="flex" flexDir="column">
                          Are you sure you want to delete <br></br>
                          {data.title}?
                          <Button
                            leftIcon={<BiTrash />}
                            bgColor="red"
                            color="white"
                            onClick={handleDelete}
                          >
                            Delete Episode
                          </Button>
                        </Box>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>

                  <IconButton
                    aria-label="Expand episode"
                    icon={<BiEditAlt fill="white" />}
                    bgColor="transparent"
                    fontSize="20px"
                    _hover={{ bg: 'transparent' }}
                    mt="2px"
                    onClick={() => router.push(`/edit/${data.id}`)}
                  />
                </Box>
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
      </Box>
    </Box>
  );
};

export default Episode;
