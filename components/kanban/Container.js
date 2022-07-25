import { Box } from '@chakra-ui/react';
import { DragDropContext } from 'react-beautiful-dnd';
import { getColumns, getMonthsEps } from '../../utils/getMonthEps';
import Column from './Column';

const Container = ({ eps }) => {
  let epsArray = getMonthsEps(eps, 'july');

  let columnData = getColumns(eps);

  console.log(columnData);

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
      toChange = epsArray[source.index];
      epsArray.splice(source.index, 1);
    }

    if (destination.droppableId === 'droplist') {
      epsArray.splice(destination.index, 0, toChange);
    }
  };
  return (
    <DragDropContext onDragEnd={dragEnd}>
      <Box
        h="80%"
        w="80%"
        border="1px solid red"
        display="flex"
        justifyContent="flex-start"
      >
        <Column epsArray={epsArray} columnName="July" droppableId="droplist" />
      </Box>
    </DragDropContext>
  );
};

export default Container;
