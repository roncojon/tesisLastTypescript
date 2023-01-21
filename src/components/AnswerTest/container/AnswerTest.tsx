import { Box, Button } from '@mui/material';
import { useSearchOne } from 'hooks/useSearchOne';
import { endpoint, GetWithParams } from 'httpRequests'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppState } from 'stores';
import AnswerTestCard from '../components/AnswerTestCard';

const AnswerTest = () => {
  // Obteniendo las pruebas a las q el  usuario tiene acceso
  const { accessToken, userId } = useAppState((state) => state.authenticationInfo);

  const { usuariosByName: data, loadingUsuariosByName } = useSearchOne('userCi', userId, endpoint.examenes.examenesActivos, true);;

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {loadingUsuariosByName ?
        'Cargando...'
        :
        (data ?
          (data.length > 0 ?
            data.map((e) => {
              return (<AnswerTestCard key={e.id} examen={e}
              />)
            })
            :
            <h3>No tiene exámenes que realizar actualmente</h3>)
          :
          <h3>No tiene exámenes que realizar actualmente</h3>)
      }
    </Box>
  )
}

export default AnswerTest