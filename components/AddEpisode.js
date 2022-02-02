import { useRef } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Checkbox,
  Textarea,
  useToast,
} from '@chakra-ui/react';

import { sessionAtom } from '../atoms';
import { useAtom } from 'jotai';

import { useSupabase } from '../hooks/useSupabase.js';

import { useRouter } from 'next/router';

const AddEpisode = () => {
  const router = useRouter();
  const [session, setSession] = useAtom(sessionAtom);

  const toast = useToast();

  const guestRef = useRef('');
  const dateRef = useRef('');
  const timeRef = useRef('');
  const checkboxRef = useRef('');
  const titleRef = useRef('');
  const descriptionRef = useRef('');
  const twitterDescriptionRef = useRef('');
  const twitterRef = useRef('');
  const techRef = useRef('');

  const supabase = useSupabase();

  const handleSubmit = async () => {
    const { data, error } = await supabase.from('episodes').insert([
      {
        guest: guestRef.current.value,
        default_date: dateRef.current.value,
        default_time: timeRef.current.value,
        is_pt: checkboxRef.current.checked,
        title: titleRef.current.value,
        description: descriptionRef.current.value,
        twitter: twitterRef.current.value,
        technology: techRef.current.value,
        twitter_description: twitterDescriptionRef.current.value,
      },
    ]);

    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
    }

    guestRef.current.value = '';
    dateRef.current.value = '';
    timeRef.current.value = '';
    checkboxRef.current.checked = '';
    titleRef.current.value = '';
    descriptionRef.current.value = '';
    twitterRef.current.value = '';

    toast({
      title: 'Episode Saved',
      description: 'This episode has been saved to the database.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <FormControl
      w="40%"
      d="flex"
      flexDir="column"
      mt="50px"
      bgColor="#ededed"
      borderRadius="10px"
    >
      <FormLabel id="guest" htmlFor="guest" d="flex" justifyContent="center">
        Guest Name
      </FormLabel>
      <Input id="guest" type="text" ref={guestRef} />
      <Box
        width="100%"
        d="flex"
        flexDirection="row"
        mt="20px"
        alignItems="center"
      >
        <Box w="35%">
          <FormLabel
            id="date"
            htmlFor="date"
            d="flex"
            justifyContent="center"
            w="40%"
          >
            Date
          </FormLabel>
          <Input id="date" type="date" ref={dateRef} />
        </Box>

        <Box w="35%">
          <FormLabel id="time" htmlFor="time" d="flex" justifyContent="center">
            Time
          </FormLabel>
          <Input id="time" type="time" ref={timeRef} />
        </Box>

        <Box w="30%" h="100%">
          <FormLabel
            id="is-pt"
            htmlFor="is-pt"
            d="flex"
            justifyContent="center"
          >
            Is PT?
          </FormLabel>
          <Checkbox
            id="is-pt"
            name="checkbox"
            type="checkbox"
            ref={checkboxRef}
            w="100%"
            d="flex"
            justifyContent="center"
          />
        </Box>
      </Box>
      <FormLabel
        id="title"
        htmlFor="title"
        d="flex"
        justifyContent="center"
        mt="10px"
      >
        Episode title
      </FormLabel>
      <Input id="title" type="text" ref={titleRef} />
      <FormLabel
        id="description with twitter at's"
        htmlFor="description_with_twitter"
        d="flex"
        justifyContent="center"
        mt="10px"
      >
        Episode Description Twitter @
      </FormLabel>
      <Textarea
        id="description_with_twitter"
        type="text"
        ref={twitterDescriptionRef}
      />
      <FormLabel
        id="description"
        htmlFor="description"
        d="flex"
        justifyContent="center"
        mt="10px"
      >
        Episode Description in Text
      </FormLabel>
      <Textarea id="description" type="text" ref={descriptionRef} />
      <FormLabel
        id="twitter"
        htmlFor="twitter"
        d="flex"
        justifyContent="center"
        mt="10px"
      >
        Guest Twitter
      </FormLabel>
      <Input id="twitter" type="text" ref={twitterRef} />
      <FormLabel
        id="technology"
        htmlFor="technology"
        d="flex"
        justifyContent="center"
        mt="10px"
      >
        Technology
      </FormLabel>
      <Input id="technology" type="text" ref={techRef} />
      <Button onClick={handleSubmit}>Add Episode</Button>
    </FormControl>
  );
};

export default AddEpisode;
