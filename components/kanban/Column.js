import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Episode from './Episode';
import { DateTime } from 'luxon';

const Column = ({ eps, columnName }) => {
  let lowercaseColumnName = columnName.toLowerCase();
  let columnEps = new Set();

  let zone = 'America/Los_Angeles';
  eps.forEach((ep) => {
    let upcomingObjData = DateTime.fromISO(ep.default_date);
    let monthDate = DateTime.fromObject(
      {
        day: upcomingObjData.c.day,
        month: upcomingObjData.c.month,
      },
      { zone }
    ).toLocaleString({ month: 'long', day: '2-digit' });

    let month = monthDate.split(' ');
    month = month[0].toLowerCase();

    if (month === lowercaseColumnName) {
      columnEps.add(ep);
    }
  });
  let epsArray = [...columnEps];
  console.log(columnName);
  return (
    <>
      <Droppable droppableId={`droplist`}>
        {(provided, snapshot) => (
          <Box
            width="350px"
            ml="10px"
            border="1px solid black"
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
