import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { Button } from 'react-bootstrap';
// import jsPDF from 'npm';
import html2canvas from 'html2canvas';
import { Button } from '@mui/material';
import { jsPDF } from 'jspdf';
// import jsPDF from 'jspdf';

const Chart = () => {
  const data = [
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
  ];
  const downloadChart = () => {
    const input = document.getElementById('chart');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0, 0 ,0);
        pdf.save('download.pdf');
      });
  }
  return (
    <div id='chart' style={{ width: 1200, height: 300 }}>
      <>
      <ResponsiveContainer>
      <LineChart
        /* width={500}
        height={300} */
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
      </ResponsiveContainer>
      <Button onClick={downloadChart}>Download Chart</Button>
      </>
    </div>
  );
};
export default Chart;