import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface CrudConfirmationModalProps { open, backendResponse, onClose }

export default function DeleteResponseModal ({ open, backendResponse, onClose }: CrudConfirmationModalProps) {
  /* const [open, setOpen] = React.useState(false); */

  /*  const handleClickOpen = () => {
     setOpen(true);
   };
 
   const handleClose = () => {
     setOpen(false);
   }; */
  console.log('GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaa' + backendResponse + open)
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {open &&
        <>
          <DialogTitle id="alert-dialog-title">
            {"Confirmación"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {backendResponse ?
              (backendResponse.ok ?
                  "Eliminado correctamente" :
                  "Error al eliminar")  :
                  "Error al eliminar"
              }
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Confirmar</Button>
            {/* <Button onClick={onClose} autoFocus>
          Cancelar
        </Button> */}
          </DialogActions>
        </>
      }
    </Dialog>
  );
}