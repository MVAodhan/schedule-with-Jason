import { Box } from '@chakra-ui/react';
import { DragDropContext } from 'react-beautiful-dnd';

const Container = ({ children }) => {
  const dragEnd = (result) => {
    console.log(result);
  };
  return (
    <DragDropContext onDragEnd={dragEnd}>
      <Box
        h="80%"
        w="80%"
        border="1px solid red"
        display="flex"
        justifyContent="space-between"
      >
        {children}
      </Box>
    </DragDropContext>
  );
};

export default Container;
