import React, { FC } from 'react'
import Box from '@mui/material/Box';

import { TaskColumnRoot, DroppableComponent, classes } from './style';
import TaskCard from '../TaskCard'

interface IDraggableElementProps {
  prefix: string;
  elements: any[];
}

const TaskColumn: FC<IDraggableElementProps> = ({
  prefix,
  elements
}) => (
  <TaskColumnRoot className={classes.root}>
    <Box className={classes.columnHeader}>{prefix}</Box>
    <DroppableComponent droppableId={`${prefix}`}>
      {(provided: any) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          {elements.map((item, index) => (
            <TaskCard key={item.id} item={item} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </DroppableComponent>
  </TaskColumnRoot>
);

export default TaskColumn;
