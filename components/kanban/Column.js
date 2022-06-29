import { Box, Text, Textarea } from '@chakra-ui/react';
import React from 'react';

const Column = ({ eps }) => {
  console.log(eps);
  return (
    <Box
      width="350px"
      ml="10px"
      border="1px solid black"
      d="flex"
      flexDir="column"
      alignItems="center"
      overflowY="scroll"
      __css={{
        '&::-webkit-scrollbar': {
          w: '0',
        },
        '&::-webkit-scrollbar-track': {
          w: '6',
        },
        '&::-webkit-scrollbar-thumb': {
          borderRadius: '10',
          bg: `gray.100`,
        },
      }}
    >
      {eps.map((ep) => (
        <Box
          minH="250px"
          w="90%"
          mt="10px"
          mb="10px"
          borderRadius="8px"
          border="1px solid orange"
          display="flex"
          flexDir="column"
          alignItems="center"
        >
          <Text color="black" fontSize="16px" mt="10px" w="90%">
            {ep.guest}
          </Text>
          <Text color="black" fontSize="14px" mt="10px" mb="10px" w="90%">
            {ep.title}
          </Text>
          <Textarea
            h="100%"
            defaultValue={ep.description}
            border="none"
            w="90%"
            color="black"
          ></Textarea>
        </Box>
      ))}
    </Box>
  );
};

export default Column;
