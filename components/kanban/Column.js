import { Box, Text, Textarea } from '@chakra-ui/react';
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Episode from './Episode';

const Column = ({ eps }) => {
  const dropState = 'done';
  const dropID = `drop-${dropState}`;

  return (
    <>
      <Droppable droppableId={dropID}>
        {(provided, snapshot) => (
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
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {eps.map((ep, index) => (
              <Episode ep={ep} key={ep.id} index={index} />
            ))}
          </Box>
        )}
      </Droppable>
    </>
  );
};

export default Column;
