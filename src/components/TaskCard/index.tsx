import React, { FC } from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete';

import { TaskCardRoot, TaskCardElement } from './style'
import { ITask } from '../../interfaces/task.interface'
import Stack from '@mui/material/Stack'

interface ITaskCardProps {
  task: ITask;
  index: number;
  onRemoveTask: (id: string) => void;
}

const TaskCard: FC<ITaskCardProps> = ({
  task,
  index,
  onRemoveTask,
}) => (
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
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="subtitle2">{task.title}</Typography>
              <IconButton
                size="small"
                onClick={() => onRemoveTask(task.id)}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Stack>
            <Typography variant="caption">{task.description}</Typography>
          </CardContent>
        </TaskCardElement>
      );
    }}
  </TaskCardRoot>
)

export default TaskCard;
