/* // @ts-nocheck */
import React, { useCallback, useEffect, useState, useContext } from 'react'

// import {imgs} from '../../imgs';
// import { patternAsObjArray as imgs} from 'functions/decodePatternFromBackend';

// import './PruebaCaritas.css'
import FilaDe4Imagenes from './FilaDe4Imagenes'
import { functionCaritas } from '../../functions/functionCaritas'
import {Get,Post,PostProtected,endpoint, GetProtected} from '../../httpRequests';
import LoginContext from '../../context/LoginContext'
import { Box, Container } from '@mui/material';
import { pCaritasContainer } from './PruebaCaritasStyle';

let sendTestDataCounter = 0;
/* const pcObj = {
  "pruebaCaritas": {
    "id": 0,
    "usuarioId": 1,
    "fecha": "2022-07-22T18:40:57.500Z",
    "filas": [
      {
        "id": 0,
        "pruebaBaseId": 0,
        "attempts": 0,
        "annotations": 0,
        "errors": 0,
        "omissions": 0
      }
    ],
    "intentosTotales": 5,
    "anotacionesTotales": 3,
    "erroresTotales": 1,
    "omisionesTotales": 1,
    "igap": 0,
    "ici": 0,
    "porCientoDeAciertos": 0,
    "eficaciaAtencional": 0,
    "eficienciaAtencional": 0,
    "rendimientoAtencional": 0,
    "calidadDeLaAtencion": 0,
    "datosAtencion": 0
  },
  "filas": [
    {
      "id": 0,
      "pruebaBaseId": 0,
      "attempts": 4,
      "annotations": 2,
      "errors": 1,
      "omissions": 1
    },
    {
      "id": 0,
      "pruebaBaseId": 0,
      "attempts": 1,
      "annotations": 1,
      "errors": 0,
      "omissions": 0
    }
  ]
} */

function PruebaCaritas({pattern : imgs}) {
  console.log('imgs')
  console.log(imgs)

  let filaTemp = [];
  let matriz = [];
  let counter = 1;
  let counter2 = 0;
   const contextValue = useContext(LoginContext);

  const createFilas = () => {
    imgs.forEach(img => {
      if (counter % 4 !== 0) {
        filaTemp.push({ img, counter });
      } else {
        filaTemp.push({ img, counter });
        matriz.push(filaTemp);
        filaTemp = [];
      }
      counter++;
    });
  }
  createFilas();

  const [tiempoAgotado, setTiempoAgotado] = useState(false);
  // console.log(tiempoAgotado)
  const [resultadoDePrueba, setResultadoDePrueba] = useState([]);
  const [done,setDone] = useState(false)
  // console.log(resultadoDePrueba)
  const resultadosHandler = (fila, index) => { const resultTemp = resultadoDePrueba; resultTemp[index] = fila; setResultadoDePrueba(resultTemp);if(index===14)setDone(true)  };
  
  useEffect(()=>{setTimeout(() => setTiempoAgotado(true), 10000);},[])

  useEffect(() => {
    if(done===true){
    // console.log('DONEEEEEEEEEE');

  }
  }, [done])
  

  return (
    <Container sx={{width:'100%', display:'flex',justifyContent:'center',}}>
      {/* CREAR UN CONTEXT Q ENVUELVA EL BOX DE ABAJO. Con un arreglo de {imgIndex:number,disabled:boolean}.
      Cada vez q el tipo marque una imagen, se dispara una funcion en el Context desde el componente Image q recorre el arreglo, y si */}
      {/* MEJOR AUN, si marco la anterior no problem, si no la marco: se dispara una funcion en el Context desde el componente Image q recorre el arreglo,
       esta funcion recorre desde el inicio del arreglo hasta la posicion de la imagen q se guardo y deshabilita todas las imagenes q recorrio para q ya no puedan ser marcadas.
       y si la imagen esta deshabilitada se cambia el estilo a mas gris o a backdropFilter: "blur(10px)" */}
       {/* OTRA OPCION, en el Context solo guardar un numero, el index de la ultima imagen marcada, CUANDO MARCA MANDA AL CONTEXT y
       compara, si es menor pues no deja marcar. O sea cada Imagen.js comprobar si su index es menor q el index del Context, y si es asi cambia estilo y no deja marcarse  */}
    <Box sx ={pCaritasContainer}/* className='pCaritas' */>
      {matriz.map((fila) => {
        counter2++;
        return <FilaDe4Imagenes key={`${fila[0].counter}`} imagenes={fila} numeroDeFila={counter2} onTiempoAgotado={resultadosHandler} timeAgotado={tiempoAgotado} />
      })}

    </Box>
    </Container>
  )
}

export default PruebaCaritas;