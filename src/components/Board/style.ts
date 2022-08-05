import { styled } from '@mui/material/styles';
import { Box } from '@mui/material'
import { DragDropContext } from 'react-beautiful-dnd'

const PREFIX = 'task-column';
export const classes = {
  root: `${PREFIX}-root`,
  listGrid: `${PREFIX}-list-grid`,
};

export const DragDropContextRoot = styled(Box)(() => ({
  [`&.${classes.root}`]: {
    padding: '20px',
    border: '4px solid indianred',
    borderRadius: '6px',
  },

  [`& .${classes.listGrid}`]: {
    display: 'flex',
  }
}));

export const DragDropContextComponent = styled(DragDropContext)();
