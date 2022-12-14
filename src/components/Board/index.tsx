import React, { FC, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

import TaskColumn from '../TaskColumn';
import { ITask, ITaskColumn, ITaskGroup } from '../../interfaces/task.interface'
import { DEFAULT_TASK_COLUMNS, DEFAULT_TASKS } from '../../constants/tasks.constant'
import { DragDropContextRoot, DragDropContextComponent, ColumnFormWrapper, classes } from './style';

const removeFromList = (list: any, index: any): [any, ITask[]] => {
  const result: ITask[] = Array.from(list);
  const [removed] = result.splice(index, 1);
  return [removed, result];
};

const addToList = (list: ITask[], index: number, element: ITask): ITask[] => {
  const result: ITask[] = Array.from(list);
  result.splice(index, 0, element);
  return result;
};

const Board: FC = () => {
  const [taskColumns, setTaskColumns] = useState<ITaskColumn[]>(DEFAULT_TASK_COLUMNS);
  const [tasks, setTasks] = useState<ITask[]>(DEFAULT_TASKS);
  const [taskGroup, setTaskGroup] = useState<ITaskGroup>({});
  const [columnFormAnchor, setColumnFormAnchor] = useState<HTMLButtonElement | null>(null);
  const [newColumn, setNewColumn] = useState<string>('');

  const groupTasks = (newTasks: ITask[]) => {
    let groupKeys = Object.keys(taskGroup);
    const group = newTasks.reduce((groups: any, task: ITask) => {
      const status = task.status;
      if (groups[status]) {
        const group = [...groups[status], task];
        return {...groups, [status]: group };
      } else {
        if (groupKeys && groupKeys.length > 0) {
          groupKeys = groupKeys.filter(key => key !== status);
        }
        return {...groups, [status]: [task] };
      }
    }, {});

    if (groupKeys && groupKeys.length > 0) {
      groupKeys.forEach((groupKey) => group[groupKey] = []);
    }

    setTaskGroup(group);
  };

  useEffect(() => {
    groupTasks(DEFAULT_TASKS);
  }, []);

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    const listCopy: ITaskGroup = { ...taskGroup };

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
    setTasks(tasks.map((task) => task.id === result.draggableId
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
    const status = `${newColumn}_${Date.now()}`
    setTaskColumns([
      ...taskColumns,
      {
        label: newColumn,
        status,
      }
    ]);
    setTaskGroup({
      ...taskGroup,
      [status]: tasks.filter((task) => task.status === status),
    });
    handleCloseAddColumnForm();
  };

  const handleAddTask = (newTask: ITask) => {
    setTasks([...tasks, newTask]);
    setTaskGroup({
      ...taskGroup,
      [newTask.status]: [
        ...taskGroup[newTask.status],
        newTask,
      ]
    });
  };

  const handleRemoveTask = (taskId: string) => {
    const newTasks = tasks.filter(task => task.id !== taskId);
    setTasks(newTasks);
    groupTasks(newTasks);
  };

  return (
    <DragDropContextRoot className={classes.root}>
      <DragDropContextComponent onDragEnd={onDragEnd}>
        <Stack className={classes.listGrid} direction="row" spacing={2}>
          {taskColumns.map((taskColumn: ITaskColumn, index) => (
            <TaskColumn
              key={index}
              column={taskColumn}
              tasks={taskGroup[taskColumn.status]}
              onAddTask={handleAddTask}
              onRemoveTask={handleRemoveTask}
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
                <Button variant="contained" disabled={!newColumn} onClick={handleAddColumn}>
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
