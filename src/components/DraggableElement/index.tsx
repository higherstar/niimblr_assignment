import React, { FC, ReactNode } from 'react'
import { Droppable } from 'react-beautiful-dnd';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import { DroppableElementRoot, classes } from './style';
import TaskCard from '../TaskCard'

interface IDraggableElementProps {
  prefix: string;
  elements: any[];
}

const DroppableComponent = styled(Droppable)(() => ({}));

const DraggableElement: FC<IDraggableElementProps> = ({
  prefix,
  elements
}) => (
  <DroppableElementRoot className={classes.root}>
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
  </DroppableElementRoot>
);

export default DraggableElement;
