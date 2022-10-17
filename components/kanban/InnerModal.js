import { Box, Button, Input, Textarea } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { useRef } from 'react';
import { sessionAtom } from '../../atoms';
import { useSupabase } from '../../hooks/useSupabase';

const InnerModal = () => {
  const [session, setSession] = useAtom(sessionAtom);
  const dateRef = useRef();
  const guestRef = useRef();
  const titleRef = useRef();
  const descRef = useRef();

  const supabase = useSupabase();

  const handleAdd = async () => {
    const { data, error } = await supabase.from('episodes').insert([
      {
        guest: guestRef.current.value,
        default_date: dateRef.current.value,
        is_pt: true,
        title: titleRef.current.value,
        description: descRef.current.value,
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
    titleRef.current.value = '';
    descRef.current.value = '';
  };
  return (
    <Box>
      <Input placeholder="Guest Name" ref={guestRef} />

      <Input placeholder="Episode Title" mt="10px" ref={titleRef} />
      <Textarea placeholder="Episode Description" mt="10px" ref={descRef} />
      <Box display="flex" justifyContent="center">
        <Button
          mt="10px"
          colorScheme="blue"
          mr={3}
          onClick={handleAdd}
          disabled={!session ? true : false}
          bgColor="limegreen"
        >
          Add Episode
        </Button>
      </Box>
    </Box>
  );
};

export default InnerModal;
