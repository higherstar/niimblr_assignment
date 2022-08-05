import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box'
import { DragDropContext } from 'react-beautiful-dnd'

const PREFIX = 'board';
export const classes = {
  root: `${PREFIX}-root`,
  listGrid: `${PREFIX}-list-grid`,
  addColumnFormWrapper: `${PREFIX}-add-column-form-wrapper`,
  addColumnButton: `${PREFIX}-add-column-button`,
  columnInput: `${PREFIX}-column-input`,
};

export const DragDropContextRoot = styled(Box)(({ theme }) => ({
  [`&.${classes.root}`]: {
    height: '100%',
    width: '100%',
    borderRadius: '6px',
  },

  [`& .${classes.listGrid}`]: {
    display: 'flex',
  },

  [`& .${classes.addColumnFormWrapper}`]: {
    minWidth: '250px',
    width: '250px',
  },

  [`& .${classes.addColumnButton}`]: {
    width: '100%'
  }
}));

export const DragDropContextComponent = styled(DragDropContext)();

export const ColumnFormWrapper = styled(Box)(() => ({
  minWidth: '250px',
  width: '250px',
  padding: '6px',
  [`& .${classes.columnInput}`]: {
    width: '100%',
    marginBottom: '5px',
  }
}));
