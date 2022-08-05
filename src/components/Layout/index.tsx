import React, { FC, ReactNode } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { LayoutRoot, classes } from './style';

interface ILayoutProps {
  children: ReactNode;
}

const Layout: FC<ILayoutProps> = ({ children }) => {
  return (
    <LayoutRoot className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Test
          </Typography>
        </Toolbar>
      </AppBar>

      <Box className={classes.main}>
        {children}
      </Box>
    </LayoutRoot>
  )
};

export default Layout;
