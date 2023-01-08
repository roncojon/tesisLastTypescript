import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function DeleteConfirmationModal({ open, onConfirm, onClose }) {

  return (

    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Confirmación"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          ¿Seguro que desea eliminar estos usuarios?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onConfirm}>Confirmar</Button>
        <Button onClick={onClose} autoFocus>
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>

  );
}