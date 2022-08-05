import React, { FC, useState, useEffect } from 'react';
import { Box } from '@mui/material'

import DraggableElement from '../TaskColumn';

import { DragDropContextRoot, DragDropContextComponent, classes } from './style';

const getItems = (count: number, prefix: any) =>
  Array.from({ length: count }, (v, k) => k).map((k) => {
    const randomId = Math.floor(Math.random() * 1000);
    return {
      id: `item-${randomId}`,
      prefix,
      content: `item ${randomId}`
    };
  });

const removeFromList = (list: any, index: any) => {
  const result = Array.from(list);
  const [removed] = result.splice(index, 1);
  return [removed, result];
};

const addToList = (list: any, index: number, element: any) => {
  const result = Array.from(list);
  result.splice(index, 0, element);
  return result;
};

const lists = ["todo", "inProgress", "done"];

const generateLists = () =>
  lists.reduce(
    (acc, listKey) => ({ ...acc, [listKey]: getItems(10, listKey) }),
    {}
  );

const Board: FC = () => {
  const [elements, setElements] = useState<any>(generateLists());

  useEffect(() => {
    setElements(generateLists());
  }, []);

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    const listCopy: any = { ...elements };

    const sourceList = listCopy[result.source.droppableId];
    const [removedElement, newSourceList] = removeFromList(
      sourceList,
      result.source.index
    );
    listCopy[result.source.droppableId] = newSourceList;
    const destinationList = listCopy[result.destination.droppableId];
    listCopy[result.destination.droppableId] = addToList(
      destinationList,
      result.destination.index,
      removedElement
    );

    setElements(listCopy);
  };

  return (
    <DragDropContextRoot>
      <DragDropContextComponent onDragEnd={onDragEnd}>
        <Box className={classes.listGrid}>
          {lists.map((listKey: string) => (
            <DraggableElement
              key={listKey}
              elements={elements[listKey]}
              prefix={listKey}
            />
          ))}
        </Box>
      </DragDropContextComponent>
    </DragDropContextRoot>
  );
}

export default Board;
