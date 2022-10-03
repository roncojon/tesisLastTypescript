import { FC, ReactNode } from 'react';
import { Box, Container } from '@mui/material';
import SideBar from '../components/sideBar';
import TopBar from '../components/topBar';
import SubTopBar from '../components/subTopBar';
import { appContainer, subTopBarAndChildrenBox } from './MainLayoutStyles';

interface ILayoutProps {
  children: ReactNode;
}

const MainLayout: FC<ILayoutProps> = ({ children }) => (
  <Box
    className="app-container"
    sx={appContainer}
  >
    <SideBar />

    <TopBar />
    <Box
      sx={subTopBarAndChildrenBox}
    >
      <SubTopBar />
      <Container sx={{marginTop: 5,marginBottom:10}}>
      {children}
      </Container>
    </Box>
  </Box>
);

export default MainLayout;
