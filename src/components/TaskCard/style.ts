import { styled } from '@mui/material/styles';
import { Draggable } from 'react-beautiful-dnd';

const PREFIX = 'task-card';
export const classes = {
  dragItem: `${PREFIX}-drag-item`,
};


export const TaskCardRoot = styled(Draggable)(() => ({
  [`& .${classes.dragItem}`]: {
    padding: '10px',
    borderRadius: '6px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
    background: 'white',
    margin: '0 0 8px 0',
    display: 'grid',
    gridGap: '20px',
    flexDirection: 'column',
  },
}));
