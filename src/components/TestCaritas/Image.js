import React, { useState } from 'react'
import './Image.css'
import coordsToCanvas from '../../functions/coordsToFillCanvas';
import { green } from '@mui/material/colors';

function Modulo({ imagen, respuestaCorrecta, index, onRespuesta }) {
  const [singleResponse, setSingleResponse] = useState(true);
  /* const canvasX = useRef(); */


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
      /*    console.log({
           img: event.target,
           imgsrc: imagen,
           target: event.target, id: event.target.id,
           correct: respuestaCorrecta
         }); */
      if (`${imagen}${respuestaCorrecta}` === event.target.id) {
        //console.log("Respuesta CORRECTA");
        onRespuesta([{ imagenIndex: index, anotacion: true, error: false }, arrayPosition()]);
        setSingleResponse(false);

        const c = coordsToCanvas(event.target.coords);
        var canvas = document.getElementById(index);
        var ctx = canvas.getContext("2d");
        ctx.fillStyle =  "rgb(154, 215, 255)";     /* "rgb(68, 175, 218)" ; */
        ctx.fillRect(c[0], c[1], 66, 64);
      }
      else {
        //console.log("Respuesta Erronea");
        onRespuesta([{ imagenIndex: index, anotacion: false, error: true }, arrayPosition()]);
        setSingleResponse(false);

        const c = coordsToCanvas(event.target.coords);
        console.log('aaaaaaaaaaaa '+c)
        var canvas = document.getElementById(index);
        var ctx = canvas.getContext("2d");
        ctx.fillStyle =  "rgb(226, 196, 196)";     /* "rgb(68, 175, 218)" ; */
        ctx.fillRect(c[0], c[1], 66, 64);
        /* const c = coordsToCanvas(event.target.coords);
        var canvas = document.getElementById(index);
        var ctx = canvas.getContext("2d");

        ctx.beginPath();
        ctx.moveTo(50,16);
        ctx.lineTo(40,19.2);
        ctx.lineTo(100,32);
        ctx.lineTo(90,38.4);
        ctx.closePath();
        ctx.fill(); */

        //ctx.fillStyle = "rgb(226, 57, 99)" /* "rgb(177, 181, 182)"  */ 
        //ctx.fillRect(c[0], c[1], 66, 64);

        
      }

     /*  const c = coordsToCanvas(event.target.coords);
      var canvas = document.getElementById(index);
      var ctx = canvas.getContext("2d");
      ctx.fillStyle =  "rgb(177, 181, 182)"  
      ctx.fillRect(c[0], c[1], 66, 64); */

/* "rgb(201, 123, 142)" */ /* "rgb(190, 76, 76)" */;

     /*  ctx.lineWidth = 2;
    ctx.strokeRect(c[0], c[1], 66, 64); */
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
  const hoverHandlerOut =(event)=>{ if (singleResponse) {
    const c = coordsToCanvas(event.target.coords);
    var canvas = document.getElementById(index);
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(c[0], c[1], 66, 64);
    
  }}

  return (

    <div className="modulo">
      <canvas className="myCanvas" id={index} width="200px" height="64px" /* ref={canvasX} */>
        {/* Your browser does not support the canvas element. */}
      </canvas>

      <img className="image" src={imagen} alt="Workplace" useMap={`#${imagen}`} />
      <map name={imagen}>
        <area className='ar' id={imagen + '1'} shape="rect" coords="0,0,66,64" alt="Computer" onClick={evaluacionHandler} onMouseOver={hoverHandlerIn} onMouseOut={hoverHandlerOut} />
        <area className='ar' id={imagen + '2'} shape="rect" coords="68,0,132,64" alt="Phone" onClick={evaluacionHandler} onMouseOver={hoverHandlerIn} onMouseOut={hoverHandlerOut}/> 
        <area className='ar' id={imagen + '3'} shape="rect" coords="134,0,200,64" alt="Coffee" onClick={evaluacionHandler} onMouseOver={hoverHandlerIn} onMouseOut={hoverHandlerOut}/>
      </map>
    </div>
  )
}

export default Modulo;