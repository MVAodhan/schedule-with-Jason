import { Box } from '@chakra-ui/react';
import { DragDropContext } from 'react-beautiful-dnd';

const Container = ({ children }) => {
  return (
    <DragDropContext>
      <Box
        h="80%"
        w="80%"
        border="1px solid red"
        display="flex"
        justifyContent="space-between"
        overflowX="scroll"
        overflowY="hidden"
      >
        {children}
      </Box>
    </DragDropContext>
  );
};

export default Container;
