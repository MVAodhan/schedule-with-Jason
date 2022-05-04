import { Box, Button } from '@chakra-ui/react';
import React from 'react';
import { useSupabase } from '../hooks/useSupabase.js';

const Experimental = () => {
  const handleUpdate = async () => {
    console.log(typeof links);
    console.log(links);

    // const { data, error } = await supabase
    //   .from('episodes')
    //   .insert([{ links: 'someValue' }]);
  };
  const supabase = useSupabase();
  return (
    <Box>
      <Button onClick={handleUpdate}> Data</Button>
    </Box>
  );
};

export default Experimental;
