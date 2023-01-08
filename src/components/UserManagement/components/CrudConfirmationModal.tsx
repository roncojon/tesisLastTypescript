import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface CrudConfirmationModalProps { isOpen, backendResponse, isDeleteModal?, onClose }

export default function CrudConfirmationModal({ isOpen, backendResponse, isDeleteModal, onClose }: CrudConfirmationModalProps) {
  /* const [open, setOpen] = React.useState(false); */

  /*  const handleClickOpen = () => {
     setOpen(true);
   };
 
   const handleClose = () => {
     setOpen(false);
   }; */
  console.log('GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaa' + backendResponse + isOpen)
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {isOpen &&
        <>
          <DialogTitle id="alert-dialog-title">
            {"Confirmación"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {isDeleteModal ?
                (backendResponse ?
                  "Eliminado correctamente" :
                  "Error al eliminar") :
                (backendResponse ?
                  "Salvado correctamente" :
                  "Error al salvar")
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