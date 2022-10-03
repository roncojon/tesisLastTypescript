import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Typography, Modal} from '@mui/material';
/* import  from '@mui/material/Modal'; */
/* import { searchBarModalStyles } from './TopBarModalStyles'; */
import './searchBar.css';

const style = {
  /* position: 'absolute' as 'absolute', */
  position: 'relative',
  top: '72px',
  left: '116px',
  /*  transform: 'translate(-50%, -50%)', */
  width: '386px',
  /* bgcolor: 'background.paper', */
  backgroundColor: '#007AB7',
  /* border: '1px solid green', */
  /*  boxShadow: 24, */
  /*  border:'none', */
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.488309)',
  borderRadius: '18px',
  p: 4,
  /* zIndez:'3' */
};

export default function TopBarModal() {
  const isOpen = sessionStorage.getItem('modalIsOpen') === 'true';

  const [open, setOpen] = React.useState(isOpen);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    sessionStorage.setItem('modalIsOpen', 'false');
  };

  React.useEffect(() => {
    if (sessionStorage.getItem('modalIsOpen') !== 'false') {
      handleOpen();
    }

    /*   return () => {
      handleClose();
    }; */
  }, []);

  return (
    /*  <div style={{position:'relative', width:'124px', height:'124px', backgroundColor:'red', left:'100px', top:'100px', zIndex:'1'}}>
      <Button style={{position:'absolute',width:'124px', height:'124px', backgroundColor:'green'}} onClick={handleOpen}>Open modal</Button> */
    <Modal
    BackdropProps={{ style: { backgroundColor: "transparent" } }}
      /*     style={{height:'139px'}}
          sx={{height:'139px'}} */
      open={open}
      /* onClickOut={handleClose} */
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >

      <Box sx={style}
        style={{ height: '139px' }}>

        <div className="pico" />
        <Typography
          id="modal-modal-title"
          /* style={searchBarModalStyles} */ /* variant="h6" */
          /*  component="h2" */
          style={{
            fontFamily: 'ItauText-Bold',
            fontStyle: 'normal',
            fontWeight: '800',
            fontSize: '16px',
            lineHeight: '21px',
          }}
        >
          Hola
        </Typography>

        <Typography id="modal-modal-description" style={{
          top: '5px',
          fontFamily: 'ItauText-Regular',
          fontStyle: ' normal',
          fontWeight: ' 400',
          fontSize: '14px',
          lineHeight: '16px',
        }}/* sx={{ mt: 2 }} */>
          Para iniciar, ingresa el RUT de la empresa
        </Typography>
        <br />
        <Button onClick={handleClose} sx={{ float: 'right' }}>
          <Typography id="modal-modal-description"
            style={{

              fontFamily: 'ItauText-Bold',
              fontStyle: 'normal',
              fontWeight: '800',
              fontSize: '14px',
              lineHeight: '16px',
            }}/* sx={{ mt: 2 }} */>Entendido</Typography>
        </Button>
      </Box>
    </Modal>
    /* </div> */
  );
}
