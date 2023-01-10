/* // @ts-nocheck */
import React, { useCallback, useEffect, useState, useContext } from 'react'

// import {imgs} from '../../imgs';
// import { patternAsObjArray as imgs} from 'functions/decodePatternFromBackend';

// import './PruebaCaritas.css'
import FilaDe4Imagenes from './FilaDe4Imagenes'
import { functionCaritas } from '../../functions/functionCaritas'
import { Get, Post, PostProtected, endpoint, GetProtected } from '../../httpRequests';
import LoginContext from '../../context/LoginContext'
import { Box, Container, useMediaQuery } from '@mui/material';
import { pCaritasContainer } from './PruebaCaritasStyle';
import { PruebaCaritasProvider } from 'context/PruebaCaritasContext';
import CaritasEndExamInfoModal from './CaritasEndExamInfoModal';

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

function PruebaCaritas({ pattern: imgs, examId ,cantColumnas, tiempoLimiteMs}) {
  /* console.log('imgs')
  console.log(imgs) */
  console.log('examId')
  console.log(examId)

  let filaTemp = [];
  let matriz = [];
  let counter = 1;
  let counter2 = 0;
  const contextValue = useContext(LoginContext);

  const createFilas = () => {
    imgs.forEach(img => {
      if (counter % cantColumnas !== 0) {
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
  const [done, setDone] = useState(false)
  console.log('resultadoDePrueba')
  console.log(resultadoDePrueba)

  const resultadosHandler = (fila, index) => {
    console.log('fila')
    console.log(fila)
    const resultTemp = resultadoDePrueba;

    fila.forEach((img)=>{
      console.log('img')
      console.log(img)
      const imgIndexString = 'i'+img.imagenIndex+' ';
      const imgAnswer = img.respuestaMarcada;

      // const imgAnswer = img.anotacion ? '1' : img.error ? '2' : '0';
    resultTemp[img.imagenIndex] = imgIndexString + imgAnswer /* + ',' */;
    // resultTemp =resultTemp + imgIndexString + imgAnswer + ',';

    })
    setResultadoDePrueba(resultTemp);
    if (index === 14)
      setDone(true)
  };
// CUANDO EL TIEMPO SE AGOTA, LAS FILAS SUBEN SUS RESULTADOS PARA ACA Y SE ORGANIZAN CON LA FUNCION resultadosHandler()
// Cuando termina la funcion resultadosHandler() se activa el done, y al hacerlo se convierten los resultadosDePrueba q
// actualmente estan en forma de array, en string listos para el backend y se pasan al componente endExamModal
// el cual indica q se termino la prueba e indica q se subieron correctamente los resultados
  useEffect(() => { setTimeout(() => setTiempoAgotado(true), (tiempoLimiteMs +20000)/* 6000 */ /* 180000 */); }, [])

  const [finalString, setFinalString] = useState('');

  console.log()
  useEffect(() => {
    if (done === true) {
      console.log('DONEEEEEEEEEE');
      const resultadoFinal = resultadoDePrueba;
      resultadoFinal.shift();
      console.log(resultadoFinal.join() + ',')
      setFinalString(resultadoFinal.join() + ',')
      // console.log(functionCaritas(resultadoDePrueba))
    }
  }, [done])
  const isSmallerThan850px = useMediaQuery('(max-width:850px)');
  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      {/* CREAR UN CONTEXT Q ENVUELVA EL BOX DE ABAJO. Con un arreglo de {imgIndex:number,disabled:boolean}.
      Cada vez q el tipo marque una imagen, se dispara una funcion en el Context desde el componente Image q recorre el arreglo, y si */}
      {/* MEJOR AUN, si marco la anterior no problem, si no la marco: se dispara una funcion en el Context desde el componente Image q recorre el arreglo,
       esta funcion recorre desde el inicio del arreglo hasta la posicion de la imagen q se guardo y deshabilita todas las imagenes q recorrio para q ya no puedan ser marcadas.
       y si la imagen esta deshabilitada se cambia el estilo a mas gris o a backdropFilter: "blur(10px)" */}
      {/* OTRA OPCION, en el Context solo guardar un numero, el index de la ultima imagen marcada, CUANDO MARCA MANDA AL CONTEXT y
       compara, si es menor pues no deja marcar. O sea cada Imagen.js comprobar si su index es menor q el index del Context, y si es asi cambia estilo y no deja marcarse  */}
      <PruebaCaritasProvider>
        <Box sx={{ ...pCaritasContainer, overflow: isSmallerThan850px && 'auto', }}/* className='pCaritas' */>
          {matriz.map((fila) => {
            counter2++;
            return <FilaDe4Imagenes key={`${fila[0].counter}`} imagenes={fila} numeroDeFila={counter2} onTiempoAgotado={resultadosHandler} timeAgotado={tiempoAgotado} />
          })}
        </Box>
      </PruebaCaritasProvider>
      <CaritasEndExamInfoModal open={finalString ? true : false} examId ={examId} finalString={finalString}/>
    </Box>
  )
}

export default PruebaCaritas;