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
  /* const authInfo = JSON.parse(sessionStorage.authInfo)
  const accessToken = authInfo.accessToken;
  const userId = authInfo.userId; */

  const {usuariosByName:data,loadingUsuariosByName} = useSearchOne('userCi', userId, endpoint.examenes.examenesActivos, true);;
/* console.log(usuariosByName)
// Simulando el objeto Examenes
const navigate = useNavigate();
   const [data, setData] = useState([
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "testNombre": "Titulo",
      "testUId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "patronClave": "string",
      "descripcion": "lorem asd as rgasd fa as rgasd fasdf asd  asd asd asd asd as dad ksasdasd as dasd a as rgasd fasdf asd  asd asd asd asd as dad ksasdasd as dasd a as rgasd fasdf asd  asd asd asd asd as dad ksasdasd as dasd a as rgasd fasdf asd  asd asd asd asd as dad ksasdasd as dasd a as rgasd fasdf asd  asd asd asd asd as dad ksasdasd as dasd a as rgasd fasdf asd  asd asd asd asd as dad ksasdasd as dasd asdf asd  asd asd asd asd as dad ksasdasd as dasd asd as dasd asdg da",
      "cantColumnas": 0,
      "cantidadFilas": 0,
      "tiempoLimiteMs": 0
    },
  {
      "id": "3fa85f64-5717-4562-b3ft-2c963f66afa6",
      "testNombre": "nombre",
      "testUId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "patronClave": "string",
      "descripcion": "description asdas asd asd asd asd asd asd asd as sa asd asd as asda ds asd asd asd as dsad da das asd ",
      "cantColumnas": 0,
      "cantidadFilas": 0,
      "tiempoLimiteMs": 0
    },
    {
        "id": "3fa85f64-5717-456123-b3ft-2c963f66afa6",
        "testNombre": "nombre",
        "testUId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "patronClave": "string",
        "descripcion": "description assd asd as dsad da das asd ",
        "cantColumnas": 0,
        "cantidadFilas": 0,
        "tiempoLimiteMs": 0
      },
      {
          "id": "3fa85f64-5717-45462-b3ft-2c963f66afa6",
          "testNombre": "nombre",
          "testUId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "patronClave": "string",
          "descripcion": "description asdas asd asd asd asd asd asd asd as sa asd asd as asda ds asd asd asd as dsad da das asd ",
          "cantColumnas": 0,
          "cantidadFilas": 0,
          "tiempoLimiteMs": 0
        },
        {
            "id": "3fa85f64-5717-4562-b3ft-2c9563f66afa6",
            "testNombre": "nombre",
            "testUId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "patronClave": "string",
            "descripcion": "description asdas asd asd asd asd asd asd asd as sa asd asd as asda ds asd asd asd as dsad da das asd ",
            "cantColumnas": 0,
            "cantidadFilas": 0,
            "tiempoLimiteMs": 0
          }
  ])
  const [loading, setLoading] = useState(true) */

  


 

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap',justifyContent:'center' }}>
      {/* !loading &&  */data ?
        data.map((e) =>
        {/* console.log('One Exam: ')
        console.log(e) */
          return (<AnswerTestCard key={e.id} examen={e}
            /* onClick={() => {
              if (e.testNombre === 'Caritas')
              navigate('/pruebacaritas')
        }} */
          />)
        }
          
        )
        : '...'}
        {/* <AnswerTestCard/>
        <AnswerTestCard/>
        <AnswerTestCard/>
        <AnswerTestCard/> */}
    </Box>
  )
}

export default AnswerTest