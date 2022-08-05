import React, { FC } from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography'

import { TaskCardRoot, TaskCardElement } from './style'
import { ITask } from '../../interfaces/task.interface'

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
              <Typography variant="subtitle2">{task.title}</Typography>
              <Typography variant="caption">{task.description}</Typography>
            </CardContent>
          </TaskCardElement>
        );
      }}
    </TaskCardRoot>
  );
};

export default TaskCard;
