import { Box, Text } from '@chakra-ui/react';
import { DragDropContext } from 'react-beautiful-dnd';
import { getColumns, getMonthsEps } from '../../utils/getMonthEps';
import Column from './Column';

const Container = ({ eps }) => {
  let columnsObjMap = getColumns(eps);
  console.log('columnsObjMap', columnsObjMap);

  let columnEntries = Object.fromEntries(columnsObjMap);

  let columnKeys = Object.keys(columnEntries);

  let allMonths = [];

  for (let key in columnKeys) {
    allMonths = [...allMonths, getMonthsEps(eps, columnKeys[key])];
  }

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
    let toChangeArray;
    for (let key in columnKeys) {
      if (source.droppableId === columnKeys[key]) {
        toChangeArray = columnsObjMap.get(columnKeys[key]);
        toChange = toChangeArray[source.index];
        toChangeArray.splice(source.index, 1);
      }
      if (destination.droppableId === columnKeys[key]) {
        toChangeArray.splice(destination.index, 0, toChange);
      }
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
        {columnKeys.map((key) => (
          <Column
            epsArray={columnsObjMap}
            columnName={key}
            key={key}
            droppableId={key}
          />
        ))}
      </Box>
    </DragDropContext>
  );
};

export default Container;
