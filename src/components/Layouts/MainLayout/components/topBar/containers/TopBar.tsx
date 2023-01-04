import React, { useEffect } from 'react';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import BusinessIcon from '@mui/icons-material/Business';
import {
  Box,
  Avatar,
  IconButton,
  Typography,
  Menu,
  Tooltip,
  MenuItem,
  Button,
  AppBar,
  Toolbar
} from '@mui/material';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import TopBarModal from '../components/TopBarModal';
import accountUserCircle from '../components/accountUserCircle.png';
import { appbarStyles, searchBarAndButtonsBoxStyle, buttonsBoxStyle, buttonStyle } from './TobBarStyles';
import { useAppDispatch } from 'stores';
 import { setAuthenticationInfo } from 'stores/authenticationState.store';


const settings = ['Logout'];

const TopBar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  // const { instance } = useMsal();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (action: string) => {
    if (action === 'Logout') {
      dispatch(
        setAuthenticationInfo({
          isAuthenticated: false
        }),
      );
      navigate('/login')
    }
    setAnchorElUser(null);
  };

  ///////////////////////////////
  
  return (
    <AppBar
      /* position="static" */
      sx={appbarStyles}>
      <Box sx={searchBarAndButtonsBoxStyle}>
        <Toolbar disableGutters sx={{ height: 72 }}>
          {/* <SearchBar /> */}

          <Box
            sx={buttonsBoxStyle}>
            <Button
              // onClick={() =>subElementsHandler(doTestMenuElements,0)}
              disabled={false}
              // variant='contained' // quitar cuando se habilite 
              component={Link}
              to="/responderpruebas" startIcon={<BorderColorIcon />}
              sx={buttonStyle}
            >
              Realizar prueba
            </Button>

            <Button
              // onClick={() => subElementsHandler(createExamMenuElements,1)}
              disabled={false}
              // variant='contained' // quitar cuando se habilite 
              component={Link}
              to='/crearexamen'
              startIcon={<PlaylistAddIcon />}
              sx={buttonStyle}
            >
              Gestionar exámenes
            </Button>

            <Button
              // onClick={() => subElementsHandler(adminSiteMenuElements,1)}
              component={Link}
              to="/userslist"
              startIcon={<BusinessIcon />}
              sx={buttonStyle}
              disableElevation={false}
              disableRipple={false}
              disableFocusRipple={false}
            >
              Administrar sitio
            </Button>

            <Button
              component={Link}
              to='/listado'
              startIcon={<ReceiptLongIcon />}
              sx={buttonStyle}
              disableElevation={false}
              disableRipple={false}
              disableFocusRipple={false}
            >
              Resultados de pruebas
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0, /* mr:10 */ }}>
            <Tooltip title="Abrir configuración" >
              <IconButton onClick={handleOpenUserMenu}>
                <Avatar alt="Miracle" src={accountUserCircle} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
        <TopBarModal />
      </Box>
    </AppBar>
  );
}



export default TopBar;
