import React, { useContext, useState, useEffect } from 'react'
import './Image.css'
import coordsToCanvas from '../../functions/coordsToFillCanvas';
// import { green } from '@mui/material/colors';
import PruebaCaritasContext from '../../context/PruebaCaritasContext'

function Modulo({ imagen, respuestaCorrecta, index, onRespuesta }) {
  const [singleResponse, setSingleResponse] = useState(true);

  // Fila o columna index , creo
  const arrayPosition = () => {
    let resto = index % 4;
    resto--;
    if (resto === -1) {
      resto = 3;
    }
    return resto
  };

  const evaluacionHandler = (event) => {
    event.preventDefault();
    if (singleResponse) {
      indexHandler(index)
      if (`${imagen}${respuestaCorrecta}` === event.target.id) {
        //console.log("Respuesta CORRECTA");
        onRespuesta([{ imagenIndex: index, anotacion: true, error: false, respuestaMarcada:(event.target.id).slice(-1)  }, arrayPosition()]);
        setSingleResponse(false);

        const c = coordsToCanvas(event.target.coords);
        var canvas = document.getElementById(index);
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = "rgb(154, 215, 255)";
        ctx.fillRect(c[0], c[1], 66, 64);
      }
      else {
        onRespuesta([{ imagenIndex: index, anotacion: false, error: true, respuestaMarcada:(event.target.id).slice(-1) }, arrayPosition()]);
        setSingleResponse(false);

        const c = coordsToCanvas(event.target.coords);
        var canvas = document.getElementById(index);
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = "rgb(226, 196, 196)";
        ctx.fillRect(c[0], c[1], 66, 64);
      }
    }
  };
  const hoverHandlerIn = (event) => {
    if (singleResponse) {
      const c = coordsToCanvas(event.target.coords);
      var canvas = document.getElementById(index);
      var ctx = canvas.getContext("2d");
      ctx.fillStyle = "rgb(218, 215, 216)";
      ctx.fillRect(c[0], c[1], 66, 64);
    }
  }
  const hoverHandlerOut = (event) => {
    if (singleResponse) {
      const c = coordsToCanvas(event.target.coords);
      var canvas = document.getElementById(index);
      var ctx = canvas.getContext("2d");
      ctx.fillStyle = "white";
      ctx.fillRect(c[0], c[1], 66, 64);
    }
  }

  const {indexOfLastImageClicked, indexHandler} = useContext(PruebaCaritasContext);

  
  useEffect(() => {
if (indexOfLastImageClicked>index) {
  setSingleResponse(false)
}
  }, [indexOfLastImageClicked])
  
  return (
    <div className="modulo">
      <canvas className="myCanvas" id={index} width="200px" height="64px" /* ref={canvasX} */>
        {/* Your browser does not support the canvas element. */}
      </canvas>

      <img className="image" src={imagen} alt="Workplace" useMap={`#${imagen}`} style={{ opacity: !singleResponse && 0.6 }} />
      <map name={imagen}>
        <area className='ar' id={imagen + '1'} shape="rect" coords="0,0,66,64" alt="Computer" onClick={evaluacionHandler} onMouseOver={hoverHandlerIn} onMouseOut={hoverHandlerOut} />
        <area className='ar' id={imagen + '2'} shape="rect" coords="68,0,132,64" alt="Phone" onClick={evaluacionHandler} onMouseOver={hoverHandlerIn} onMouseOut={hoverHandlerOut} />
        <area className='ar' id={imagen + '3'} shape="rect" coords="134,0,200,64" alt="Coffee" onClick={evaluacionHandler} onMouseOver={hoverHandlerIn} onMouseOut={hoverHandlerOut} />
      </map>
    </div>
  )
}

export default Modulo;