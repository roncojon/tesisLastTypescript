const coordsToCanvas = (coordString)=>{
    const strArray =coordString.split(",");
    const result = strArray.map(s=>Number(s)-2)

    return result;
}

export default coordsToCanvas;