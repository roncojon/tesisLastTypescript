import { Box, Button } from '@mui/material';
import { endpoint, GetWithParams } from 'httpRequests'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppState } from 'stores';

const AnswerTest = () => {
  // Obteniendo las pruebas a las q el  usuario tiene acceso
  const { accessToken, userId } = useAppState((state) => state.authenticationInfo);

const navigate = useNavigate();
   const [data, setData] = useState([
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "testNombre": "string",
      "testUId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "patronClave": "string",
      "descripcion": "string",
      "cantColumnas": 0,
      "cantidadFilas": 0,
      "tiempoLimiteMs": 0
    },
  {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "testNombre": "string",
      "testUId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "patronClave": "string",
      "descripcion": "string",
      "cantColumnas": 0,
      "cantidadFilas": 0,
      "tiempoLimiteMs": 0
    }
  ])
  const [loading, setLoading] = useState(true)

  // Simulando el objeto Examenes
  const examenes = [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "testNombre": "string",
      "testUId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "patronClave": "string",
      "descripcion": "string",
      "cantColumnas": 0,
      "cantidadFilas": 0,
      "tiempoLimiteMs": 0
    },
  {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "testNombre": "string",
      "testUId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "patronClave": "string",
      "descripcion": "string",
      "cantColumnas": 0,
      "cantidadFilas": 0,
      "tiempoLimiteMs": 0
    }
  ];
  async function httpResp() {
    const temp = await GetWithParams('userId', userId, endpoint.usuarios.usuariosAllPruebasActivas)  // , accessToken 
    // if (temp !== null)
      // await setData(temp)
      await setData(examenes)
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
      {/* !loading &&  */data ?
        data.map((e) =>
          <Button
            onClick={() => {
              if (e.testNombre === 'Caritas')
              navigate('/pruebacaritas')
        }}
          >
            Tipo: {e.testNombre}. {/* Fecha:{e.fecha}. Activo:{e.activo.toString().replace('true', 'Si').replace('false', 'No')} */}
          </Button>
        )
        : '...'}
    </Box>
  )
}

export default AnswerTest