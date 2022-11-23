import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoginContext from '../../../context/LoginContext';
// import { useMsal } from "@azure/msal-react";
import { Box, Button, Container, Modal, TextField, Typography } from '@mui/material';
import loginSliderImg1 from './loginSliderImg1.jpg'
import { bigText, lessBigTextCss } from './loginStyles';
import './loginStyles.css';
import { logoItau, logoMicrosoft } from './logoItauSvg';
import { useLogin } from '../../../hooks/useLogin';
import { endpoint, urlBase } from '../../../httpRequests';
import { useAppDispatch } from 'stores';
import { setAuthenticationInfo } from 'stores/authenticationState.store';
// import { loginRequest } from '../../../authConfigItau';
import logoUne from '../../../imgs/une.svg'
import fotoUne from '../../../imgs/guiteras.jpeg'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: '#FFFFFF',
  border: '2px solid #F5F5F5',
  borderRadius: '4px',
  boxShadow: 24,
  p: 4,
};

sessionStorage.setItem('modalIsOpen', 'true');
const cont = {
  maxWidth: '1440px',
  width: '1440px',
  /* backgroundColor: 'blue', */
  margin: '0px',
  padding: '0px',
  position: 'relative',
}
const contRight = {
  position: 'relative',
  /* borderLeft: '16px solid transparent', */ float: 'right',
  width: '375px',
  height: '768px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  /*  margin: 'auto', */ backgroundColor: '#FFFFFF',
}

const Login = () => {
  const dispatch = useAppDispatch();
/* 
  const handleClick = (index) => {
    dispatch(
      setIsAuthenticated({
        value: index,
      }),
    )
  }; */
  // Credenciales de usuario
  const [userCredentials, setUserCredentials] = useState({ userName: '', password: '' });

  //
  const [userNameToSend, setUserName] = useState('')
  const [userPassToSend, setUserPass] = useState('')

  // Respuesta del hook, es la respuesta del backend
  const { loginResponse } = useLogin(endpoint.usuarios.userLogin, userCredentials)
  // console.log(urlBase + endpoint.usuarios.userLogin)
  // console.log(/* 'aaaaaaaaaaa '+ */loginResponse)

  // Al recibir una respuesta del servidor, si la respuesta no es vacia y esta Ok pasa la pagina inicial,
  // si la respuesta no es Ok sale Modal de error,
  useEffect(() => {
    if (loginResponse && loginResponse.status === 200) {
     // console.log('asdaaaaaa');
      dispatch(
        setAuthenticationInfo({
          isAuthenticated: true,
           accessToken: loginResponse.access_token,
           userId: loginResponse.usuario_id
        }),
      );
      // (loginResponse.access_token) 
      navigate('/userslist')
    }
    else if (loginResponse) { setOpenModal2(true) }
  }, [loginResponse])

  // Modal 1, para autenticacion
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Modal 2, cartel de error
  const [openModal2, setOpenModal2] = React.useState(false);
  const handleOpenModal2 = () => setOpenModal2(true);
  const handleCloseModal2 = () => setOpenModal2(false);


  const navigate = useNavigate();
  // const location: any = useLocation();
  // const from = location.state && location.state.from?.pathname || "/";

  // Al hacer click en boton Acceder del 1er Modal se cambian las credenciales,
  // lo que hace q se llame al hook useLogin el cual hace la llamada http para hacer login si las credenciales no estan vacias
  const loginHandler = (instance: any) => {
    /* // valido q el input no sea vacio
        let nickName= userName || '';
        let password= userPass || ''
        // console.log(userName,nickName,password) */
    setUserCredentials({ userName: userNameToSend, password: userPassToSend })
    setOpen(false)
  };




  return (
    <Box className="loginSuperContainer">
      <Box
        // className="loginStyles"
        sx={cont}
      >
        {/* Carousel */}
        <Container>
          <div
            /* className="loginCarousel" */
            id="loginImg"
          // style={{ left: 0, position: 'absolute', width: '980px', float: 'left' }}
          >
            <img style={{height: '768px'}} alt='Éxito' src={fotoUne} />
          </div>

          {/*  <img src={loginImg1} className='loginImgStyles'></img> */}
        </Container>

        {/* CONTAINER DE LOGO, TITULOS Y LOGIN BUTTON */}
        <Box
          sx={contRight}
        >
          <Box sx={{/* position:'relative', left: -10, */marginLeft:-2 ,marginTop: '-110px'/* , backgroundColor:'red' */ }}>
            {<img style={{width:'90px', height:'90px', borderRadius: '6px'}} src={logoUne} alt="logo une"/>}

            <br />
            <br />
            <br />
            <Typography variant="h1" style={{ ...bigText, marginBottom: '10px' }}>
              Sistema de <br />
              tests atencionales
            </Typography>
            <Typography variant="h2" style={lessBigTextCss}>
              Termoeléctrica Antonio Guiteras
            </Typography>
            <br />
            <Button
              color='secondary'
              onClick={() => setOpen(true) /* loginHandler(instanceTmp) */}
              style={{
                height: '40px',
                top: '20px',
                border: '1px solid #B4B4B4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                fontWeight: 900,
                color: 'black'
              }}
            >
              Ingresar
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <form>
                  <TextField onChange={(e) => { setUserName(e.target.value) }}/* id="loginuser" */ label="Ususario" variant="standard" sx={{ width: '80%' }} />
                  <hr style={{ border: '1px solid transparent' }} />
                  <TextField onChange={(e) => { setUserPass(e.target.value) }}/* value={} *//* id="loginuser" */  type="password" label="Contraseña" variant="standard" sx={{ width: '80%' }} />
                  <hr style={{ border: '1px solid transparent' }} />
                  <Button onClick={loginHandler} /* onClick={()=>{} */ style={{ border: 'none', backgroundColor: 'transparent' }}>Acceder</Button>
                </form>
              </Box>
            </Modal>

            <Modal
              open={openModal2}
              onClose={handleCloseModal2}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography color='red'>Error de autenticación o usuario incorrecto</Typography>
                <br/>
                <Button onClick={handleCloseModal2} /* onClick={()=>{} */ style={{ border: 'none', backgroundColor: 'transparent' }}>Aceptar</Button>
              </Box>
            </Modal>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
