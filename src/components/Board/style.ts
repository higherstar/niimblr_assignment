import { styled } from '@mui/material/styles';
import { Box } from '@mui/material'
import { DragDropContext } from 'react-beautiful-dnd'

const PREFIX = 'task-column';
export const classes = {
  root: `${PREFIX}-root`,
  listGrid: `${PREFIX}-list-grid`,
  addColumnFormWrapper: `${PREFIX}-add-column-form-wrapper`,
  addColumnButton: `${PREFIX}-add-column-button`,
  columnInput: `${PREFIX}-column-input`,
};

export const DragDropContextRoot = styled(Box)(() => ({
  [`&.${classes.root}`]: {
    padding: '20px',
    border: '4px solid indianred',
    borderRadius: '6px',
    width: '100%',
    overFlow: 'auto',
  },

  [`& .${classes.listGrid}`]: {
    display: 'flex',
  },

  [`& .${classes.addColumnFormWrapper}`]: {
    width: '250px',
  },

  [`& .${classes.addColumnButton}`]: {
    width: '100%'
  }
}));

export const DragDropContextComponent = styled(DragDropContext)();

export const ColumnFormWrapper = styled(Box)(() => ({
  width: '250px',
  padding: '6px',
  [`& .${classes.columnInput}`]: {
    width: '100%',
    marginBottom: '5px',
  }
}));
