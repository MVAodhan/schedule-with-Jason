import { Box, Text, IconButton } from '@chakra-ui/react';
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Episode from './Episode';
import { BiPlus } from 'react-icons/bi';

const Column = ({ epsArray, columnName, droppableId }) => {
  epsArray = Object.fromEntries(epsArray);
  epsArray = epsArray[columnName];

  console.log('epsArray', epsArray);
  return (
    <>
      <Droppable droppableId={droppableId}>
        {(provided, snapshot) => (
          <Box
            width="400px"
            ml="10px"
            mt="10px"
            mb="50px"
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
            <Box w="100%" d="flex" alignItems="center">
              <Box w="50%" d="flex" ml="25px">
                <Text color="black">
                  {columnName.replace(/^\w/, (c) => c.toUpperCase())}
                </Text>
                <Text
                  padding="2px"
                  h="80%"
                  borderRadius="12px"
                  boxShadow="-2px 1px 2px 2px #bab8b1"
                  color="black"
                  d="flex"
                  alignItems="center"
                  ml="10px"
                >
                  {epsArray.length}
                </Text>
              </Box>
              <Box
                w="50%"
                d="flex"
                mr="25px"
                justifyContent="flex-end"
                alignItems="center"
              >
                <IconButton
                  aria-label="add episode to column"
                  icon={<BiPlus m="0px" />}
                  bg="none"
                  boxShadow="-2px 1px 2px 2px #bab8b1"
                  borderRadius="12px"
                ></IconButton>
              </Box>
            </Box>
            {provided.placeholder}
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
