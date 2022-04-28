import { Box, Input, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';

const Link = ({ defaultValue }) => {
  return (
    <Box w="80%" d="flex" flexDir="column" alignItems="flex-start">
      <Text>Url</Text>
      <Input defaultValue={defaultValue}></Input>
    </Box>
  );
};

export default Link;
