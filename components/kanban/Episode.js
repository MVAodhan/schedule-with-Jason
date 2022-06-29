import { Box, Text, Textarea } from '@chakra-ui/react';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const Episode = ({ ep, index }) => {
  console.log(typeof ep.id);
  return (
    <>
      <Draggable draggableId={ep.id} index={index}>
        {(provided, snapshot) => (
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
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
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
        )}
      </Draggable>
    </>
  );
};

export default Episode;
