import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function BackendResponseModal({ open, onClosing, postResponse }) {
console.log('ExamPOstReponse')
console.log(postResponse)

return (
    <>
    {postResponse!=="" &&
    <Dialog
      open={open}
      onClose={onClosing}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Confirmación"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {postResponse ? 
          postResponse.status===200 ?
          "Examen guardado satisfactoriamente" :
          "Error al guardar examen" :
          "Error al guardar examen"
        }
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClosing}>Confirmar</Button>
        {/* <Button onClick={onClosing} autoFocus>
          Cancelar
        </Button> */}
      </DialogActions>
    </Dialog>
    }
    </>
  );
}