import { Box } from '@chakra-ui/react';
import { DragDropContext } from 'react-beautiful-dnd';
import { getColumns, getMonthsEps } from '../../utils/getMonthEps';
import ChakraModal from './ChakraModal';
import Column from './Column';

const Container = ({ eps }) => {
  let columnsObjMap = getColumns(eps);

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

    let originEp;
    let originArray;
    for (let key in columnKeys) {
      if (destination.droppableId === columnKeys[key]) {
        originArray = columnsObjMap.get(source.droppableId);
        originEp = originArray[source.index];
        let destinationArray = columnsObjMap.get(columnKeys[key]);
        originArray.splice(source.index, 1);
        destinationArray.splice(destination.index, 0, originEp);
      }
    }
  };
  return (
    <DragDropContext onDragEnd={dragEnd}>
      <Box
        w="80%"
        display="flex"
        justifyContent="flex-start"
        boxShadow="-15px -10px 10px -1px #bab8b1"
      >
        {/* <ChakraModal /> */}
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
