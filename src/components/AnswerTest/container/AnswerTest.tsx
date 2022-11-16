import { Box, Button } from '@mui/material';
import { endpoint, GetWithParams } from 'httpRequests'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppState } from 'stores';

const AnswerTest = () => {
  // Obteniendo las pruebas a las q el  usuario tiene acceso
  const { accessToken, userId } = useAppState((state) => state.authenticationInfo);

const navigate = useNavigate();
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  async function httpResp() {
    const temp = await GetWithParams('userId', userId, endpoint.usuarios.usuariosAllPruebasActivas)  // , accessToken 
    if (temp !== null)
      await setData(temp)
    await setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    httpResp()
  }, [])

  console.log('REALIZAAAAAAAAAAAAAAAAAAAAAAAAAARRRRRRRRRRR: ')
  console.log(data)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {!loading && data ?
        data.map((e) =>
          <Button
            onClick={() => {
              if (e.pruebaMatrizNombre === 'Caritas')
              navigate('/pruebacaritas')
        }}
          >
            Tipo:{e.pruebaMatrizNombre}. Fecha:{e.fecha}. Activo:{e.activo.toString().replace('true', 'Si').replace('false', 'No')}.
          </Button>
        )
        : '...'}
    </Box>
  )
}

export default AnswerTest