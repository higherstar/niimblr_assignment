import React, { FC } from 'react';
import { Card } from '@mui/material';

import { TaskCardRoot, classes } from './style'

interface ITaskCardProps {
  item: any;
  index: number;
}

const TaskCard: FC<ITaskCardProps> = ({ item, index }) => {
  return (
    <TaskCardRoot draggableId={item.id} index={index}>
      {(provided: any, snapshot: any) => {
        return (
          <Card
            ref={provided.innerRef}
            className={classes.dragItem}
            snapshot={snapshot}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            Card Content
          </Card>
        );
      }}
    </TaskCardRoot>
  );
};

export default TaskCard;
