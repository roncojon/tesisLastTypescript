import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
// import { Button } from 'react-bootstrap';
// import jsPDF from 'npm';
import html2canvas from 'html2canvas';
import { Button } from '@mui/material';
import { jsPDF } from 'jspdf';
// import jsPDF from 'jspdf';

const convertFilasToChartReadable = (f) => {
  const result = [];
  if (f) {
    if (f.length>0) {
      f.forEach((fil,index) => {
        const filaTemp = {fila:index,intentos:fil.attempts,anotaciones:fil.annotations,errores:fil.errors,omisiones:fil.omissions}
        result.push(filaTemp);
      });
      return result;
    }
  }
}

const Chart = (props) => {
  console.log('props')
  console.log(props)
  /* const data = [
    {
      name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
    },
    {
      name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
    },
    {
      name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
    },
    {
      name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
    },
    {
      name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
    },
    {
      name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
    },
    {
      name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
    },
  ]; */
  const [data, setData] = useState<any>([{ fila: 0,intentos:0, anotaciones: 0, errores: 0, omisiones: 0 }]);

  useEffect(() => {
    setData(convertFilasToChartReadable(props.data.filas))
  }, [props])

  const downloadChart = () => {
    const input = document.getElementById('chart');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'l',
        unit: 'pt',
        format: 'a4'});
        pdf.addImage(imgData, 'PNG', 60, 100, 0 ,0);
        pdf.save('download.pdf');
      });
  }
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
    <div id='chart' style={{ width: 880, height: 470, padding: '20px 20px 0px 0px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>{props.data.nombre}</h2>
    {/*   <ResponsiveContainer> */}
        <LineChart
          width={730}
          height={400}
          data={data}
        /*  margin={{
           top: 5, right: 30, left: 20, bottom: 5,
         }} */
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="fila">
          <Label value="Filas" offset={-10} position="insideBottomLeft" />
          </XAxis>
          <YAxis >
          <Label value="Valores" angle={-90} offset={20} position="insideBottomLeft" />
          </YAxis>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="intentos" stroke="#58c6ff"  /* activeDot={{ r: 8 }} *//>
          <Line type="monotone" dataKey="anotaciones" stroke="#82ca9d" /* activeDot={{ r: 8 }} *//>
          <Line type="monotone" dataKey="errores" stroke="red" /* activeDot={{ r: 8 }} *//>
          <Line type="monotone" dataKey="omisiones" stroke="#8884d8" /* activeDot={{ r: 8 }} *//>
        </LineChart>
      {/* </ResponsiveContainer> */}

    </div>
    <Button onClick={downloadChart} sx={{mb:'20px'}} variant="outlined">Descargar gráfico</Button>
    </div>
  );
};
export default Chart;