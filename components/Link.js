import { Box, Input, Text } from '@chakra-ui/react';
import React from 'react';

const Link = () => {
  return (
    <Box w="80%" d="flex" flexDir="column" alignItems="flex-start">
      <Text>Url</Text>
      <Input></Input>
    </Box>
  );
};

export default Link;
