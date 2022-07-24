import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Episode from './Episode';
import { getMonthsEps } from '../../utils/getMonth';

const Column = ({ eps, columnName }) => {
  let epsArray = getMonthsEps(eps, columnName);

  return (
    <>
      <Droppable droppableId={`droplist`}>
        {(provided, snapshot) => (
          <Box
            width="350px"
            ml="10px"
            // border="1px solid black"
            d="flex"
            flexDir="column"
            alignItems="center"
            overflowY="scroll"
            pb="20px"
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
            <Text color="black">{columnName}</Text>
            {epsArray.map((ep, index) => (
              <Episode ep={ep} key={ep.id} index={index} />
            ))}
          </Box>
        )}
      </Droppable>
    </>
  );
};

export default Column;
