import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ErrorDateModal({ open, onClosing }) {
  /* const [open, setOpen] = React.useState(false); */

  /*  const handleClickOpen = () => {
     setOpen(true);
   };
 
   const handleClose = () => {
     setOpen(false);
   }; */

  return (

    <Dialog
      open={open}
      onClose={onClosing}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Error"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Problema con las fechas del examen
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClosing}>Aceptar</Button>
        {/* <Button onClick={onClosing} autoFocus>
          Cancelar
        </Button> */}
      </DialogActions>
    </Dialog>

  );
}