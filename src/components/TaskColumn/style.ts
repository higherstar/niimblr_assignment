import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Droppable } from 'react-beautiful-dnd'

const PREFIX = 'draggable-element';
export const classes = {
  root: `${PREFIX}-root`,
  columnHeader: `${PREFIX}-column-header`,
};

export const TaskColumnRoot = styled(Box)(() => ({
  [`&.${classes.root}`]: {
    padding: '10px',
    borderRadius: '6px',
    background: '#d4d4d4',
  },

  [`& .${classes.columnHeader}`]: {
    textTransform: 'uppercase',
    marginBottom: '20px',
  }
}));

export const DroppableComponent = styled(Droppable)();
