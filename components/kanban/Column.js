import { Box, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

import { ReactSortable } from 'react-sortablejs';

const Column = ({ colHeader = 'Column header' }) => {
  const [state, setState] = useState([
    { id: 1, name: 'shrek' },
    { id: 2, name: 'fiona' },
  ]);
  return (
    <Box
      border="1px solid black"
      h="100%"
      width="300px"
      d="flex"
      justifyContent="center"
      alignItems="flex-start"
    >
      <Text d="flex" justifyContent="center" flexDir="column" color="black">
        {colHeader}
        <ReactSortable list={state} setList={setState}>
          {state.map((item) => (
            <div key={item.id}>{item.name}</div>
          ))}
        </ReactSortable>
      </Text>
    </Box>
  );
};

export default Column;
