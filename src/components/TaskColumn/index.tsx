import React, { FC } from 'react'
import Box from '@mui/material/Box';

import TaskCard from '../TaskCard'
import { TaskColumnRoot, DroppableComponent, classes } from './style';
import { ITask, ITaskColumn } from '../../interfaces/task.interface'

interface IDraggableElementProps {
  column: ITaskColumn;
  tasks: ITask[];
}

const TaskColumn: FC<IDraggableElementProps> = ({
  column,
  tasks,
}) => (
  <TaskColumnRoot className={classes.root}>
    <Box className={classes.columnHeader}>{column.label}</Box>
    <DroppableComponent droppableId={`${column.status}`}>
      {(provided: any) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          {tasks && tasks.map((task, index) => (
            <TaskCard key={task.id} task={task} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </DroppableComponent>
  </TaskColumnRoot>
);

export default TaskColumn;
