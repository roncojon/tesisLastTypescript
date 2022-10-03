import { Box, Button, Modal, TextField } from '@mui/material';
import React from 'react';
/* import { logoMicrosoft } from './logoMicrosoftSvg' */
import './afterLoginModal.css';

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

const AuthenticationInputs = () => {
  const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="afterLoginModal">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form>
            {/*   <Typography id="modal-modal-title" variant="h3" component="h2">
              Ususario
            </Typography> */}
            <TextField id="loginuser" label="Ususario" variant="standard" sx={{ width: '80%' }} />
            <hr style={{ border: '1px solid transparent' }} />
            {/*   <Typography id="modal-modal-title" variant="h3" component="h2">
              Contraseña
            </Typography> */}
            <TextField id="loginuser" label="Contraseña" variant="standard" sx={{ width: '80%' }} />
            {/* <br />
            <hr /> */}
            <hr style={{ border: '1px solid transparent' }} />
            <Button sx={{ border: 'none', backgroundColor: 'transparent' }}>Ingresar</Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default AuthenticationInputs;
