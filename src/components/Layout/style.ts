import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

const PREFIX = 'layout';
export const classes = {
  root: `${PREFIX}-root`,
  main: `${PREFIX}-main`,
};

export const LayoutRoot = styled(Box)(() => ({
  [`&.${classes.root}`]: {
    height: '100%',
    width: '100%',
  },

  [`& .${classes.main}`]: {
    padding: '16px',
    paddingTop: '76px',
  }
}));
