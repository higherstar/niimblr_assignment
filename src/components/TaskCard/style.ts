import { styled } from '@mui/material/styles';
import { Draggable } from 'react-beautiful-dnd';
import Card from '@mui/material/Card';

export const TaskCardRoot = styled(Draggable)();

export const TaskCardElement = styled(Card)(() => ({
  borderRadius: '6px',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
  background: 'white',
  marginBottom: 10,
  display: 'grid',
  gridGap: '20px',
  flexDirection: 'column',
}));
