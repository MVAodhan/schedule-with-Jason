import { Box, Text, Textarea } from '@chakra-ui/react';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { getDate } from '../../utils/getDate';

const Episode = ({ ep, index }) => {
  let usDate;
  if (ep.default_date && ep.default_time) {
    usDate = getDate(ep);
  }

  return (
    <>
      <Draggable draggableId={ep.id} index={index}>
        {(provided, snapshot) => (
          <Box
            w="90%"
            mt="10px"
            mb="10px"
            pb="30px"
            borderRadius="8px"
            border="1px solid black"
            display="flex"
            flexDir="column"
            alignItems="center"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <Box display="flex" flexDirection="row" w="100%">
              <Box
                w="50%"
                display="flex"
                flexDirection="row"
                justifyContent="center"
              >
                <Text
                  as="strong"
                  color="black"
                  fontSize="16px"
                  w="100%"
                  pt="10px"
                  pl="10px"
                >
                  {ep.guest}
                </Text>
              </Box>
              <Box
                w="50%"
                display="flex"
                flexDirection="row"
                justifyContent="center"
              >
                <Text
                  as="strong"
                  color="black"
                  fontSize="16px"
                  w="100%"
                  pt="10px"
                  pl="10px"
                >
                  {usDate}
                </Text>
              </Box>
            </Box>
            <Text color="black" fontSize="14px" mt="10px" mb="10px" w="90%">
              {ep.title}
            </Text>
            <Textarea
              h="auto"
              defaultValue={ep.description}
              border="none"
              w="90%"
              color="black"
              overflow="hidden"
            ></Textarea>
          </Box>
        )}
      </Draggable>
    </>
  );
};

export default Episode;
