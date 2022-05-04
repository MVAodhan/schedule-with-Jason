import { Box, Input, Text } from '@chakra-ui/react';
import React, { useEffect, useState, useRef } from 'react';

const Link = ({ defaultValue, links, id }) => {
  const [value, setValue] = useState('');
  let linkRef = useRef();

  useEffect(() => {
    defaultValue ? setValue(defaultValue) : setValue('');
  }, []);

  const handleChange = () => {
    for (const link in links) {
      if (links[link].id === id) {
        links[link].value = linkRef.current.value;
      }
    }
  };
  return (
    <Box w="80%" d="flex" flexDir="column" alignItems="flex-start">
      <Text>Url</Text>
      <Input
        id={id}
        defaultValue={value}
        ref={linkRef}
        onChange={() => handleChange(links)}
      ></Input>
    </Box>
  );
};

export default Link;
