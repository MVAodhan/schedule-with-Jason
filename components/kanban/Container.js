import { Box } from '@chakra-ui/react';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';

const Container = ({ eps }) => {
  let currentEps = eps;

  const dragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let toChange;

    if (source.droppableId === 'droplist') {
      toChange = currentEps[source.index];
      currentEps.splice(source.index, 1);
    }

    if (destination.droppableId === 'droplist') {
      currentEps.splice(destination.index, 0, toChange);
    }
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
        <Column eps={currentEps} columnName="July" />
        <Column eps={currentEps} columnName="August" />
      </Box>
    </DragDropContext>
  );
};

export default Container;
