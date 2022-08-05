import React, { FC, useState, useEffect } from 'react';
import { Box, Stack } from '@mui/material'

import TaskColumn from '../TaskColumn';

import { DragDropContextRoot, DragDropContextComponent, classes } from './style';
import { ITaskColumn } from '../../interfaces/task.interface'
import { DEFAULT_TASK_COLUMNS } from '../../constants/tasks.constant'

const getItems = (count: number, status: string) =>
  Array.from({ length: count }, (v, k) => k).map((k) => {
    const randomId = Math.floor(Math.random() * 1000);
    return {
      id: `item-${randomId}`,
      status,
      title: randomId.toString(),
      description: `item ${randomId}`
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
    (acc, status) => ({ ...acc, [status]: getItems(5, status) }),
    {}
  );

const Board: FC = () => {
  const [taskColumns, setTaskColumns] = useState<ITaskColumn[]>(DEFAULT_TASK_COLUMNS);
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
        <Stack className={classes.listGrid} direction="row" spacing={2}>
          {taskColumns.map((taskColumn: ITaskColumn, index) => (
            <TaskColumn
              key={index}
              column={taskColumn}
              tasks={elements[taskColumn.status]}
            />
          ))}
        </Stack>
      </DragDropContextComponent>
    </DragDropContextRoot>
  );
}

export default Board;
