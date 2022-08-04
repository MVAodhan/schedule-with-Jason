import { Box, Button, Input, Textarea } from '@chakra-ui/react';
import { useRef } from 'react';
import { useSupabase } from '../../hooks/useSupabase';

const InnerModal = () => {
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
      <Box w="100%" display="flex" flexDir="row" mt="10px">
        <Input type="date" w="100%" ref={dateRef} />
      </Box>
      <Input placeholder="Episode Title" mt="10px" ref={titleRef} />
      <Textarea placeholder="Episode Description" mt="10px" ref={descRef} />
      <Box display="flex" justifyContent="center">
        <Button
          mt="10px"
          colorScheme="blue"
          mr={3}
          onClick={handleAdd}
          bgColor="limegreen"
        >
          Add Episode
        </Button>
      </Box>
    </Box>
  );
};

export default InnerModal;
