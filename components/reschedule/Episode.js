import { useRef } from 'react';

import { useRouter } from 'next/router';

import { sessionAtom } from '../../atoms';
import { useAtom } from 'jotai';

import {
  Box,
  Text,
  useToast,
  Button,
  useDisclosure,
  Checkbox,
  FormLabel,
} from '@chakra-ui/react';

import copy from 'copy-to-clipboard';

import styles from '../../styles/Episode.module.css';
import { useSupabase } from '../../hooks/useSupabase';

const Episode = ({ data, usDate, nzDate }) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [session, setSession] = useAtom(sessionAtom);

  const supabase = useSupabase();
  const toast = useToast();

  const calRef = useRef();
  const sanityRef = useRef();
  const delPrevLiveRef = useRef();
  const newTwoWeekRef = useRef();
  const newNinetyRef = useRef();
  const newLiveRef = useRef();

  let twoWeekTweet;
  let ninetyMinTweet;
  let liveTweet;

  console.log('data from ep to reschedule', data);

  const handleCopy = (textToCopy) => {
    let stringToCopy = textToCopy.toString();
    copy(stringToCopy);
  };

  const handleSubmit = async () => {
    if (
      calRef.current.checked == true &&
      sanityRef.current.checked == true &&
      delPrevLiveRef.current.checked == true &&
      newTwoWeekRef.current.checked == true &&
      newNinetyRef.current.checked == true &&
      newLiveRef.current.checked
    ) {
      const { error } = await supabase
        .from('episodes')
        .update({ reschedule: false })
        .eq('id', data.id);

      router.push('/');
    }
  };

  return (
    <Box display="flex" justifyContent="center">
      <Box
        w="100%"
        h="auto"
        className={styles.container}
        d="flex"
        flexDirection="column"
        color="white"
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
              <Box w="100%" d="flex" mb="10px"></Box>
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
            <Text> US New Date : {usDate}</Text>
            <Text> NZ New Date : {nzDate}</Text>
          </Box>
          <Box color="white" bgColor="transparent" d="flex">
            <Box
              w="50%"
              d="flex"
              justifyContent="center"
              alignItems="center"
              flexDir="column"
            >
              <FormLabel id="google-cal" htmlFor="google-cal">
                Google Calendar
              </FormLabel>
              <Checkbox
                id="google-cal"
                name="checkbox"
                type="checkbox"
                ref={calRef}
              />
            </Box>
            <Box
              w="50%"
              d="flex"
              justifyContent="center"
              alignItems="center"
              flexDir="column"
            >
              <FormLabel id="sanity" htmlFor="sanity">
                Sanity
              </FormLabel>
              <Checkbox
                id="sanity"
                name="checkbox"
                type="checkbox"
                ref={sanityRef}
              />
            </Box>
          </Box>
          <Box bgColor="transparent" color="white">
            <Box w="100%" d="flex" justifyContent="center">
              <Text>Buffer</Text>
            </Box>
            <Box w="100%" d="flex">
              <Box
                w="25%"
                d="flex"
                justifyContent="center"
                alignItems="center"
                flexDir="column"
                color="white"
              >
                <FormLabel id="delete-prev-live" htmlFor="delete-prev-live">
                  Deleted previous live
                </FormLabel>
                <Checkbox
                  id="delete-prev-live"
                  name="checkbox"
                  type="checkbox"
                  ref={delPrevLiveRef}
                />
              </Box>
              <Box
                w="25%"
                d="flex"
                justifyContent="center"
                alignItems="center"
                flexDir="column"
                color="white"
              >
                <FormLabel
                  id="reschedule-two-weeks"
                  htmlFor="reschedule-two-weeks"
                >
                  Reschedule Two Week
                </FormLabel>
                <Checkbox
                  id="reschedule-two-weeks"
                  name="checkbox"
                  type="checkbox"
                  ref={newTwoWeekRef}
                />
              </Box>
              <Box
                w="25%"
                d="flex"
                justifyContent="center"
                alignItems="center"
                flexDir="column"
                color="white"
              >
                <FormLabel
                  id="reschedule-ninety-minutes"
                  htmlFor="
                reschedule-ninety-minutes"
                  d="flex"
                  justifyContent="center"
                  alignSelf="center"
                >
                  Reschedule Ninety Minutes
                </FormLabel>
                <Checkbox
                  id="reschedule-ninety-minutes"
                  name="checkbox"
                  type="checkbox"
                  ref={newNinetyRef}
                />
              </Box>
              <Box
                w="25%"
                d="flex"
                justifyContent="center"
                alignItems="center"
                flexDir="column"
                color="white"
              >
                <FormLabel
                  id="reschedule-new-live"
                  htmlFor="reschedule-new-live"
                >
                  Reschedule-new-live
                </FormLabel>
                <Checkbox
                  id="reschedule-new-live"
                  name="checkbox"
                  type="checkbox"
                  ref={newLiveRef}
                />
              </Box>
            </Box>
            <Box d="flex" w="100%" justifyContent="center" mt="10px">
              <Button
                bgColor="limegreen"
                onClick={handleSubmit}
                disabled={!session ? true : false}
              >
                Add Episode
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Episode;
