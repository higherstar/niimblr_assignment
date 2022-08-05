import React, { FC, useState, useEffect } from 'react';
import { Box, Stack } from '@mui/material'

import TaskColumn from '../TaskColumn';

import { DragDropContextRoot, DragDropContextComponent, classes } from './style';
import { ITask, ITaskColumn } from '../../interfaces/task.interface'
import { DEFAULT_TASK_COLUMNS, DEFAULT_TASKS } from '../../constants/tasks.constant'

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

const Board: FC = () => {
  const [taskColumns, setTaskColumns] = useState<ITaskColumn[]>(DEFAULT_TASK_COLUMNS);
  const [tasks, setTasks] = useState<ITask[]>(DEFAULT_TASKS);
  const [elements, setElements] = useState<any>({});

  useEffect(() => {
    const taskGroups = tasks.reduce((groups: any, task: ITask) => {
      const status = task.status;
      if (groups[status]) {
        const group = [...groups[status], task];
        return {...groups, [status]: group };
      } else {
        return {...groups, [status]: [task] };
      }
    }, {});
    setElements(taskGroups);
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
    setTasks(tasks.map((task) => task.id === result.draggedId
      ? { ...task, status: result.destination.droppableId }
      : task));
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
