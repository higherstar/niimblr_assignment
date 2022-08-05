import React, { FC, useState, useEffect } from 'react';
import { Box, Button, Popover, Stack, TextField, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

import TaskColumn from '../TaskColumn';

import { DragDropContextRoot, DragDropContextComponent, ColumnFormWrapper, classes } from './style';
import { ITask, ITaskColumn, ITaskGroup } from '../../interfaces/task.interface'
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
  const [taskGroup, setTaskGroup] = useState<ITaskGroup>({});
  const [columnFormAnchor, setColumnFormAnchor] = useState<HTMLButtonElement | null>(null);
  const [newColumn, setNewColumn] = useState<string>('');

  useEffect(() => {
    const group = tasks.reduce((groups: any, task: ITask) => {
      const status = task.status;
      if (groups[status]) {
        const group = [...groups[status], task];
        return {...groups, [status]: group };
      } else {
        return {...groups, [status]: [task] };
      }
    }, {});
    setTaskGroup(group);
  }, []);

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    const listCopy: any = { ...taskGroup };

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

    setTaskGroup(listCopy);
    setTasks(tasks.map((task) => task.id === result.draggedId
      ? { ...task, status: result.destination.droppableId }
      : task));
  };

  const handleShowAddColumnForm = (event: React.MouseEvent<HTMLButtonElement>) => {
    setColumnFormAnchor(event.currentTarget);
  };

  const handleCloseAddColumnForm = () => {
    setColumnFormAnchor(null);
    setNewColumn('');
  };

  const handleAddColumn = () => {
    setTaskColumns([
      ...taskColumns,
      {
        label: newColumn,
        status: newColumn,
      }
    ]);
    setTaskGroup({
      ...taskGroup,
      [newColumn]: tasks.filter((task) => task.status === newColumn),
    });
    handleCloseAddColumnForm();
  };

  return (
    <DragDropContextRoot>
      <DragDropContextComponent onDragEnd={onDragEnd}>
        <Stack className={classes.listGrid} direction="row" spacing={2}>
          {taskColumns.map((taskColumn: ITaskColumn, index) => (
            <TaskColumn
              key={index}
              column={taskColumn}
              tasks={taskGroup[taskColumn.status]}
            />
          ))}

          <Box className={classes.addColumnFormWrapper}>
            <Button
              className={classes.addColumnButton}
              startIcon={<AddIcon />}
              variant="outlined"
              onClick={handleShowAddColumnForm}
            >
              Add Column
            </Button>
            <Popover
              open={!!columnFormAnchor}
              anchorEl={columnFormAnchor}
              onClose={handleCloseAddColumnForm}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <ColumnFormWrapper>
                <TextField
                  className={classes.columnInput}
                  variant="outlined"
                  size="small"
                  value={newColumn}
                  onChange={(e) => setNewColumn(e.target.value)}
                />
                <Button disabled={!newColumn} onClick={handleAddColumn}>
                  Add
                </Button>
                <IconButton onClick={handleCloseAddColumnForm}>
                  <CloseIcon />
                </IconButton>
              </ColumnFormWrapper>
            </Popover>
          </Box>
        </Stack>
      </DragDropContextComponent>
    </DragDropContextRoot>
  );
}

export default Board;
