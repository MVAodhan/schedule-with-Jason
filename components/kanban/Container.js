import { Box, Text } from '@chakra-ui/react';
import { DragDropContext } from 'react-beautiful-dnd';
import { getColumns, getMonthsEps } from '../../utils/getMonthEps';
import Column from './Column';

const Container = ({ eps }) => {
  let columnsObjMap = getColumns(eps);

  // console.log(columnsObjMap.get('july'));
  let columnEntries = Object.fromEntries(columnsObjMap);
  // console.log(columnEntries);
  let columnKeys = Object.keys(columnEntries);
  // console.log(columnKeys);
  let allMonths = [];

  for (let key in columnKeys) {
    allMonths = [...allMonths, getMonthsEps(eps, columnKeys[key])];
  }

  console.log('all Months', allMonths);
  for (let month in allMonths) {
    console.log('month', allMonths[month]);
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
