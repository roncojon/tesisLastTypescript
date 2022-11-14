import { imagenes } from "imgs";
import { type } from "os";
// import patternAsString 
const examenRaw = {
    "id": "8d6e3084-2c1b-407d-bc60-35706b4a9585",
    "pruebaMatrizNombre": "Caritas",
    "patronClave": "i46 2,i40 3,i20 1,i13 2,i17 2,i10 1,i32 2,i1 3,i50 1,i44 3,i22 2,i41 2,i2 2,i30 3,i45 3,i7 2,i6 3,i12 3,i43 3,i38 1,i16 2,i49 1,i14 1,i9 1,i21 2,i11 1,i33 1,i54 3,i31 2,i27 1,i55 2,i60 1,i48 1,i47 2,i4 2,i28 3,i39 2,i8 3,i57 3,i51 1,i5 3,i23 1,i59 2,i53 2,i37 1,i24 1,i3 2,i15 2,i29 1,i42 2,i52 2,i18 2,i19 3,i58 1,i26 1,i25 1,i35 2,i34 1,i56 3,i36 3,",
    "fecha": "2022-11-12T10:57:22.1242898",
    "descripcion": "Test de percepcion de diferencias. Selecciona la carita única en cada trío",
    "cantColumnas": 4,
    "cantidadFilas": 15,
    "tiempoLimiteMs": 180000
  };
// Pattern gonna hold the img src and the right answer
const pattern = [];

const decodeCellString = (cell:string)=>{ 
    const cellAsStringArray = cell.split(" ");
return {imagen:cellAsStringArray[0],respuestaCorrecta:Number(cellAsStringArray[1])}
}

const decodePatternAsString = (pattern:string)=>{
    const patternAsStringArray = pattern.split(",");
const patternAsObjArray = [];

    patternAsStringArray.forEach(imgRespObj => {
        patternAsObjArray.push(decodeCellString(imgRespObj));
    })

    return patternAsObjArray;
}
type cell = {imagen:string,respuestaCorrecta:number}
export const patternAsObjArray:cell[]=decodePatternAsString(examenRaw.patronClave);

const setImgsSourcesInPatternAsObjArray =()=> imagenes.forEach(img => {
const temp = patternAsObjArray.find(p=>p.imagen===img.key);
temp.imagen=img.src;
});

setImgsSourcesInPatternAsObjArray();

/* export const testooo=()=>{
    patternAsObjArray.forEach(element => {
    console.log(element)
 });
} */

