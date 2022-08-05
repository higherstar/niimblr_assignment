import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

const PREFIX = 'draggable-element';
export const classes = {
  root: `${PREFIX}-root`,
  columnHeader: `${PREFIX}-column-header`,
};

export const DroppableElementRoot = styled(Box)(() => ({
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
