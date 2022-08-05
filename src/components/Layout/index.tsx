import React, { FC, ReactNode } from 'react'
import Box from '@mui/material/Box';

interface ILayoutProps {
  children: ReactNode;
}

const Layout: FC<ILayoutProps> = ({ children }) => {
  return (
    <Box>
      {children}
    </Box>
  )
};

export default Layout;
