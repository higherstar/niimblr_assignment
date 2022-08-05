import React, { FC, ReactNode } from 'react'
import Box from '@mui/material/Box';

interface ILayoutProps {
  children: ReactNode;
}

const Layout: FC<ILayoutProps> = ({ children }) => {
  return (
    <Box p={6} height="100vh">
      {children}
    </Box>
  )
};

export default Layout;
