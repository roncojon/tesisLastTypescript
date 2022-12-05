import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppState } from 'stores';
import { usePost } from 'hooks/usePost';
import { endpoint } from 'httpRequests';

export default function CaritasEndExamInfoModal({ open, examId, finalString/* , onClosing  */ }) {
    // const [isOpen,setIsOpen] = useState(open);
    const [uExamObject, setUExamObject] = useState(null);
    const navigate = useNavigate();
    const { accessToken, userId } = useAppState((state) => state.authenticationInfo);
    const {response, loading} = usePost(endpoint.uExamen.uExamenPost,uExamObject);
console.log('response')
console.log(response)

useEffect(() => {
        // const uExamPostHandler = ()=>{
        if (finalString && examId) {
            setUExamObject({
                usuarioCi: userId,
                examenId: examId,
                respuestaDeUsuarioAExamen: finalString
            })
        }
    // }
     }, [finalString, examId])


    return (
        <Dialog
            open={open}
            // onClose={onClosing}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Se ha terminado el tiempo del examen"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                {!response  ? 'Guardando resultados de examen' : response[1] ===200 ? 'Examen guardado' : 'Error al guardar resultados de examen' }
                </DialogContentText>
            </DialogContent>
            <DialogActions>
{response ? <Button onClick={()=>navigate('/responderpruebas')}>Aceptar</Button> : <>{console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaa')} asd</>}
                {/* <Button onClick={onClosing} autoFocus>
          Cancelar
        </Button> */}
            </DialogActions>
        </Dialog>
    );
}


/* import React from 'react'

export const CaritasEndExamInfoModal = () => {
  return (
    <div>CaritasEndExamInfoModal</div>
  )
} */
