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
import { useAppDispatch, useAppState } from 'stores';
import { setAuthenticationInfo } from 'stores/authenticationState.store';


const settings = ['Logout'];

const TopBar = () => {
  const dispatch = useAppDispatch();
  const { userRol } = useAppState((state) => state.authenticationInfo);
  console.log('userRol')
  console.log(userRol)
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (action: string) => {
    if (action === 'Logout') {
      dispatch(
        setAuthenticationInfo({
          isAuthenticated: false,
					accessToken: null,
					userRol: null,
					userId: null,
        }),
      );
      navigate('/login')
    }
    setAnchorElUser(null);
  };

  return (
    <AppBar
      sx={appbarStyles}>
      <Box sx={searchBarAndButtonsBoxStyle}>
        <Toolbar disableGutters sx={{ height: 72 }}>
          <Box
            sx={buttonsBoxStyle}>
            <Button
              disabled={false}
              component={Link}
              to="/responderpruebas" startIcon={<BorderColorIcon />}
              sx={buttonStyle}
            >
              Realizar prueba
            </Button>
            {userRol &&
              (userRol.includes('EXAMINADOR') || userRol.includes('ADMINISTRADOR')) &&
              <Button
                disabled={false}
                component={Link}
                to='/allexams'
                startIcon={<PlaylistAddIcon />}
                sx={buttonStyle}
              >
                Gestionar exámenes
              </Button>
            }
            {userRol &&            
              userRol.includes('ADMINISTRADOR') &&
                <Button
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
            }
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
        {/* <TopBarModal /> */}
      </Box>
    </AppBar>
  );
}



export default TopBar;
