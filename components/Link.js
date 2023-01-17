import { Box, Input, Text } from '@chakra-ui/react';
import React, { useState, useRef } from 'react';

const Link = ({ defaultValue, links, id, heading = 'Url' }) => {
  const [value, setValue] = useState('');
  let linkRef = useRef();

  const handleChange = () => {
    for (const link in links) {
      if (links[link].id === id) {
        links[link].value = linkRef.current.value;
      }
    }
  };
  return (
    <Box w="80%" d="flex" flexDir="column" alignItems="flex-start">
      <Text>{heading}</Text>
      <Input
        id={id}
        defaultValue={defaultValue ? defaultValue : ''}
        ref={linkRef}
        onChange={() => handleChange(links)}
      ></Input>
    </Box>
  );
};

export default Link;
