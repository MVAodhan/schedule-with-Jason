import { Box, Button, Checkbox, FormLabel, Input } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import React from 'react';
import { useRef } from 'react';
import { sessionAtom } from '../../atoms';
import { useSupabase } from '../../hooks/useSupabase';

const innerModal = ({ data: ep }) => {
  const [session, setSession] = useAtom(sessionAtom);
  const supabase = useSupabase();
  const router = useRouter();

  const dateRef = useRef();
  const timeRef = useRef();
  const checkboxRef = useRef();
  const handleReschedule = async () => {
    const { data, error } = await supabase
      .from('episodes')
      .update({
        reschedule: true,
        default_date: dateRef.current.value,
        default_time: timeRef.current.value,
        is_pt: checkboxRef.current.checked,
      })
      .eq('id', ep.id);

    if (error) {
      console.log(error);
      return;
    }

    router.push('/reschedule');
    console.log(ep);
  };

  return (
    <>
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
      <Box display="flex" justifyContent="center">
        <Button
          mt="10px"
          colorScheme="blue"
          mr={3}
          onClick={handleReschedule}
          disabled={!session ? true : false}
          bgColor="limegreen"
        >
          Reschedule Episode
        </Button>
      </Box>
    </>
  );
};

export default innerModal;
