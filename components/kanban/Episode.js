import { Box, Text, Textarea } from '@chakra-ui/react';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { DateTime } from 'luxon';

const Episode = ({ ep, index }) => {
  // let dt = DateTime.fromISO(`${ep.default_date}T${ep.default_time}`);

  // let zone = 'America/Los_Angeles';

  // let zonedDt = DateTime.fromObject(
  //   {
  //     day: dt.c.day,
  //     hour: dt.c.hour,
  //     minute: dt.c.minute,
  //     month: dt.c.month,
  //     year: dt.c.year,
  //   },
  //   { zone }
  // );

  // let date = zonedDt.toFormat('ff');

  // let dateISO = zonedDt.toLocaleString({
  //   month: 'long',
  // });

  // console.log(ep.guest, dateISO);

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
            <Text as="strong" color="black" fontSize="16px" mt="10px" w="90%">
              {ep.guest}
            </Text>
            {/* <Text>{date}</Text> */}
            <Text color="black" fontSize="14px" mt="10px" mb="10px" w="90%">
              {ep.title}
            </Text>
            <Textarea
              h="auto"
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
