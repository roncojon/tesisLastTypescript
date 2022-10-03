import React from 'react';

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
// import { useMsal } from '@azure/msal-react';
import { Link } from 'react-router-dom';
// import SearchBar from '../components/SearchBar';
import TopBarModal from '../components/TopBarModal';
import { AdjuntarCTElogo, ListadoEmpresas } from '../components/TopBarStyles';
// import { AdjuntarCTElogo, ListadoEmpresas } from './TopBarStyles';
import accountUserCircle from '../components/accountUserCircle.png';
import { appbarStyles, searchBarAndButtonsBoxStyle, buttonsBoxStyle, buttonStyle } from './TobBarStyles';

const settings = ['Logout'];


const TopBar = () => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  // const { instance } = useMsal();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (action: string) => {
    /* if (action === 'Logout') {
      instance.logoutRedirect().catch(e => {
        // eslint-disable-next-line no-console
        console.error(e);
      });
    }
    setAnchorElUser(null); */
  };

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
            disabled
            variant='contained' // quitar cuando se habilite 
              startIcon={<AdjuntarCTElogo />}
              sx={buttonStyle}
            >
              Adjuntar CTE de empresa
            </Button>

            <Button
            component={Link}
            to='/listado'
              startIcon={<ListadoEmpresas />}
              sx={buttonStyle}
              disableElevation={false}
              disableRipple={false}
              disableFocusRipple={false}
            >
              Listado de empresas
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Abrir configuración">
              <IconButton onClick={handleOpenUserMenu} >
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
