import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function NewExamModal({open,onConfirm ,onClosing }) {
  /* const [open, setOpen] = React.useState(false); */

 /*  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }; */

  return (
    <div>
    <Dialog
        open={open}
        onClose={onClosing}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Confirmar creación de examen
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onConfirm}>Confirmar</Button>
          <Button onClick={onClosing} autoFocus>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
      </div>
  );
}