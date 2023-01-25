/* // @ts-nocheck */
import React, { useEffect, useState, } from 'react'
import FilaDe4Imagenes from './FilaDe4Imagenes'
import { Box,  useMediaQuery } from '@mui/material';
import { pCaritasContainer } from './PruebaCaritasStyle';
import { PruebaCaritasProvider } from 'context/PruebaCaritasContext';
import CaritasEndExamInfoModal from './CaritasEndExamInfoModal';

function PruebaCaritas({ pattern: imgs, examId ,cantColumnas, tiempoLimiteMs}) {
  let filaTemp = [];
  let matriz = [];
  let counter = 1;
  let counter2 = 0;

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
  const [resultadoDePrueba, setResultadoDePrueba] = useState([]);
  const [done, setDone] = useState(false)

  const resultadosHandler = (fila, index) => {
    const resultTemp = resultadoDePrueba;

    fila.forEach((img)=>{
      const imgIndexString = 'i'+img.imagenIndex+' ';
      const imgAnswer = img.respuestaMarcada;

    resultTemp[img.imagenIndex] = imgIndexString + imgAnswer;

    })
    setResultadoDePrueba(resultTemp);
    if (index === 14)
      setDone(true)
  };
// CUANDO EL TIEMPO SE AGOTA, LAS FILAS SUBEN SUS RESULTADOS PARA ACA Y SE ORGANIZAN CON LA FUNCION resultadosHandler()
// Cuando termina la funcion resultadosHandler() se activa el done, y al hacerlo se convierten los resultadosDePrueba q
// actualmente estan en forma de array, en string listos para el backend y se pasan al componente endExamModal
// el cual indica q se termino la prueba e indica q se subieron correctamente los resultados
  useEffect(() => { setTimeout(() => setTiempoAgotado(true), tiempoLimiteMs); }, [])
  const [finalString, setFinalString] = useState('');

  useEffect(() => {
    if (done === true) {
      const resultadoFinal = resultadoDePrueba;
      resultadoFinal.shift();
      console.log(resultadoFinal.join() + ',')
      setFinalString(resultadoFinal.join() + ',')
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
        <Box sx={{ ...pCaritasContainer, overflow: isSmallerThan850px && 'auto', }}>
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