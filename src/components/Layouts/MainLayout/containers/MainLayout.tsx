import { FC, ReactNode, useState, useEffect, useRef } from 'react';
import { Box, Container } from '@mui/material';
import SideBar from '../components/sideBar';
import TopBar from '../components/topBar';
import SubTopBar from '../components/subTopBar';
import { appContainer, appContainerButSideBar, appSubTBarAndContent } from './MainLayoutStyles';

interface ILayoutProps {
  children: ReactNode;
}

 let counter = 0

const MainLayout: FC<ILayoutProps> = ({ children }) => {
  const [hideSB, setHideSB] = useState(false)
  const ref = useRef(null);
   
  useEffect(() => {
    const showSideBarByVpWidth = ()=>{if (window.visualViewport.width < 1200) setHideSB(true); else { setHideSB(false) }}
    window.visualViewport.addEventListener("resize", () => { showSideBarByVpWidth() })

    // console.log(ref.current.clientHeight)
    return () => {
      window.visualViewport.removeEventListener("resize", () => { showSideBarByVpWidth() })
    }
  })

useEffect(() => {
  if (window.visualViewport.width < 1200)
  setHideSB(true)
}, [])


   console.log('app rendered ' + counter++)
  return (
    <Box
    ref = {ref}
      className="app-container"
      sx={{...appContainer,overflowX:hideSB ? 'visible' : 'hidden'}}
    >
      {!hideSB ? <SideBar /* hght={ref.current.clientHeight} *//> : null}
      <Box
        sx={appContainerButSideBar}
      >
        <TopBar />
        <Box
          sx={appSubTBarAndContent}
        >
          <SubTopBar />
          <Box sx={{width:'100%', marginTop: '10px', marginBottom: 10,display:'flex', justifyContent:'center' /*, backgroundColor:'red', marginLeft: '5px', */}}>
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  )
};

export default MainLayout;
