import React, { FC } from 'react';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

import { TaskCardRoot, TaskCardElement } from './style'
import { ITask } from '../../interfaces/task.interface'
import { Typography } from '@mui/material'

interface ITaskCardProps {
  task: ITask;
  index: number;
}

const TaskCard: FC<ITaskCardProps> = ({
  task,
  index
}) => {
  return (
    <TaskCardRoot draggableId={task.id} index={index}>
      {(provided: any, snapshot: any) => {
        return (
          <TaskCardElement
            ref={provided.innerRef}
            snapshot={snapshot}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <CardContent>
              <Typography variant="h6">{task.title}</Typography>
              <Typography variant="caption">{task.description}</Typography>
            </CardContent>
          </TaskCardElement>
        );
      }}
    </TaskCardRoot>
  );
};

export default TaskCard;
