import Close from "@mui/icons-material/Close";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, makeStyles, Box, IconButton, Button, Tooltip, Snackbar, Alert, Dialog } from "@mui/material";
import html2canvas from "html2canvas";
import * as html2pdf from 'html2pdf.js';
import jsPDF from "jspdf";
import { useEffect, useState } from "react";
import Chart from "./Chart";

interface UserExamResult {
    Nombre: string,
    Apellidos: string,
    Intentos: number,
    Anotaciones: number,
    Errores: number,
    Omisiones: number,
    Igap: number,
    Ici: number,
    Pcaciertos: number,
    Eficaciaatencional: number,
    Eficienciaatencional: number,
    RendimientoAtencional: number,
    Calidaddeatencion: number
}
interface UserExamResultArr { data: UserExamResult[] }
/* const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
}); */
const testo: UserExamResult = {
    Nombre: 'Alberto',
    Apellidos: 'Perez Martinez',
    Intentos: 60,
    Anotaciones: 50,
    Errores: 3,
    Omisiones: 7,
    Igap: 60,
    Ici: 70,
    Pcaciertos: 80,
    Eficaciaatencional: 82,
    Eficienciaatencional: 78,
    RendimientoAtencional: 60,
    Calidaddeatencion: 10
}
const testo2: UserExamResult = {
    Nombre: 'AlbertoAlberto',
    Apellidos: 'Perez MartinezMARTINES',
    Intentos: 50,
    Anotaciones: 45,
    Errores: 3,
    Omisiones: 2,
    Igap: 60,
    Ici: 70,
    Pcaciertos: 80,
    Eficaciaatencional: 82,
    Eficienciaatencional: 78,
    RendimientoAtencional: 60,
    Calidaddeatencion: 10
}


const CustomTableCell = (props) => {
    const { children, rest } = props
    return (
        <TableCell
            align="center"
            sx={{
                fontSize: '12px',
                fontWeight: 700,
                p: '5px',
                borderRight: '1px solid #e5e5e5'
            }}
            {...rest}
        >
            {children}
        </TableCell>
    )
}

const unixToDate = (unixtimestamp) => {
    // Convert timestamp to milliseconds
    const date = new Date(unixtimestamp);
    // Year
    var year = date.getFullYear();

    // Month
    var month = date.getMonth() + 1;

    // Day
    var day = date.getDate();

    // Hours
    var hours = date.getHours();

    // Minutes
    var minutes = "0" + date.getMinutes();

    // Display date time in dd-MM-yyyy h:m:s format
    return day + '-' + month + '-' + year + ' ' + hours + ':' + minutes.substr(-2);
}

export default function ExamsResultsTable({ data, onClose })/* ({ data }: UserExamResult[]) */ {
    const [counter,setCounter] = useState(0);
    console.log('data ')
    console.log(data)

    console.log('data.results.usuarioCi ')
    console.log(data.results)

    const handleDownloadPdf = () => {
       /*  const el = document.getElementById('examTableToPdf');
        const opt = {
            margin: [10, 20, 10, 10],
            pagebreak: { mode: 'avoid-all' },
            jsPDF: { orientation: 'l', format: 'legal' },
            // html2canvas:{backgroundColor:'red'}
        };
        const endDate = unixToDate(data.fechaFin);
        const testName = data.nombre;
        html2pdf().set(opt).from(el).save(`${testName}-${endDate}.pdf`); */

        const el = document.getElementById('examTableToPdf');
        const endDate = unixToDate(data.fechaFin);
        const testName = data.nombre;
        const doc = new jsPDF({
            orientation: 'l',
            unit: 'pt',
            format: 'a4',
          });
        doc.html(el, {
            callback(d) {
              d.save(`${testName}-${endDate}.pdf`);
            },
            width:980,
            windowWidth: 1280,
             autoPaging: 'text',
            margin: [28, 30, 30, 50],
          }); 
        
        // pdf.save(`${testName}-${endDate}.pdf`);
      
    }

    // Snackbar
    const [open, setOpen] = useState(true);
    const handleClose = () => {
        setOpen(false);
    }
    // Chart
    const [openChart, setOpenChart] = useState(false);
    const [chartData, setChartData] = useState(null);

    const handleCloseChart = () => {
        setOpenChart(false);
    }
    const handleOpenChart = () => {
        setOpenChart(true);
    }
    const handleSetChartData = (userExamData) => {
        setCounter(counter+1);
        setChartData(userExamData);
    }
    useEffect(() => {
        if(counter>0) 
        handleOpenChart();
    }, [chartData])
    
    return (
        <Box sx={{ minWidth: '990px', height: '100%', padding: '5px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'white', position: 'relative', p: '15px' }}>
            {/* <ERTable data={[testo, testo2]} /> */}
            <Box sx={{ width: '100%', height: '40px',/* pr:'20px',pt:'20px', */ position: 'absolute', top: '10px', right: '10px', display: 'flex', justifyContent: 'end' }}>
                <IconButton
                    onClick={onClose}
                // sx={{position: 'absolute', top: '5px', right: '5px'}}
                >
                    <Close />
                </IconButton>
            </Box>
            {data.results.length>0 ?
                <div id="examTableToPdf" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '90%',  /* minWidth: '940px', */ maxWidth: '980px', background: 'white', }}>
                    <h3 style={{ marginBottom: '20px' }}>{`${data.nombre}. Fin: ${unixToDate(data.fechaFin)}`}</h3>

                    <TableContainer component={Paper} sx={{ /* minWidth: '940px', maxWidth: '1024px', */ /* maxHeight: '90%' */ /* mt: '30px' */ }}>
                        <Table  /* sx={{ minWidth: '980px', }} *//* className={classes.table} */ aria-label="simple table">
                            <TableHead sx={{ fontSize: '8px' }}>
                                <TableRow sx={{ height: '30px', }}>
                                    <CustomTableCell /* width={110} */ component="th" scope="row" >Nombre</CustomTableCell>
                                    <CustomTableCell /* width={120} */>Apellidos</CustomTableCell>
                                    <CustomTableCell>Intentos</CustomTableCell>
                                    <CustomTableCell>Anotaciones</CustomTableCell>
                                    <CustomTableCell>Errores</CustomTableCell>
                                    <CustomTableCell>Omisiones</CustomTableCell>
                                    <CustomTableCell>Igap</CustomTableCell>
                                    <CustomTableCell>Ici</CustomTableCell>
                                    <CustomTableCell>% aciertos</CustomTableCell>
                                    <CustomTableCell>Eficacia atencional</CustomTableCell>
                                    <CustomTableCell>Eficiencia atencional</CustomTableCell>
                                    <CustomTableCell>Rendimiento Atencional</CustomTableCell>
                                    <CustomTableCell>Calidad atención</CustomTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody sx={{ fontSize: '8px' }}>
                                {data.results.map((userResult) => {
                                   const userTemp = (data.usersRaw.find((u) => u.ci === userResult.usuarioCi)) 
                                    return (
                                        <TableRow /*  key={row.intentosTotales} */
                                        key={userResult.usuarioCi}
                                        onClick={()=>handleSetChartData({filas:userResult.filas,nombre:userTemp.nombre +' '+ userTemp.apellidos})}
                                        sx={{
                                            /* '&:hover,&:focus': {
                                              background: '#FEF8F2 !important',
                                              boxShadow: '0px 2px 14px rgba(25, 118, 210, 0.3) !important'
                                            } */
                                            '&:hover':{
                                                background: '#F3F0EF !important',
                                                boxShadow: '0px 2px 14px rgba(25, 118, 210, 0.3) !important'
                                              },
                                              '&.Mui-selected': {
                                                background: '#FEF8F2 !important',
                                                boxShadow: '0px 2px 14px rgba(25, 118, 210, 0.3) !important'
                                              }
                                        }}
                                        >
                                            <CustomTableCell component="th" scope="row" >{(data.usersRaw.find((u) => u.ci === userResult.usuarioCi)).nombre}</CustomTableCell>
                                            <CustomTableCell>{(data.usersRaw.find((u) => u.ci === userResult.usuarioCi)).apellidos}</CustomTableCell>
                                            <CustomTableCell>{userResult.intentosTotales ? userResult.intentosTotales : '-'}</CustomTableCell>
                                            <CustomTableCell>{userResult.intentosTotales ? userResult.anotacionesTotales : '-'}</CustomTableCell>
                                            <CustomTableCell>{userResult.intentosTotales ? userResult.erroresTotales : '-'}</CustomTableCell>
                                            <CustomTableCell>{userResult.intentosTotales ? userResult.omisionesTotales : '-'}</CustomTableCell>
                                            <CustomTableCell>{userResult.intentosTotales ? userResult.igap : '-'}</CustomTableCell>
                                            <CustomTableCell>{userResult.intentosTotales ? userResult.ici : '-'}</CustomTableCell>
                                            <CustomTableCell>{userResult.intentosTotales ? userResult.porCientoDeAciertos : '-'}</CustomTableCell>
                                            <CustomTableCell>{userResult.intentosTotales ? userResult.eficaciaAtencional : '-'}</CustomTableCell>
                                            <CustomTableCell>{userResult.intentosTotales ? userResult.eficienciaAtencional : '-'}</CustomTableCell>
                                            <CustomTableCell>{userResult.intentosTotales ? userResult.rendimientoAtencional : '-'}</CustomTableCell>
                                            <CustomTableCell>{userResult.intentosTotales ? userResult.calidadDeLaAtencion : '-'}</CustomTableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </div> :
                <Box>
                    <h3>No se encuentran usuarios asignados a este examen</h3>
                </Box>
            }
            {data.results.length>0 &&
            <>
            <Snackbar
                open={open}
                autoHideDuration={10000}
                onClose={handleClose}
            >
                <Alert
                    severity="info"
                    sx={{ width: '100%', backgroundColor: '#42b4ff', }}
                    color="info"
                    variant="filled"
                >
                    Click en una fila para ver detalles
                </Alert>
            </Snackbar>
            <Button variant="contained" sx={{ mt: '20px' }} onClick={handleDownloadPdf}>Descargar como pdf</Button>
            <Dialog 
            open={openChart} 
             onClose={handleCloseChart} 
             maxWidth='lg'
             >
                 {chartData &&
                <Chart data={chartData}/>
            }
            </Dialog>
            </>
            }
        </Box>
    )
}

/* export function ERTable({ data }: UserExamResultArr) {
    // const classes = useStyles();

    return (
        <TableContainer component={Paper} >
            <Table sx={{ minWidth: '980px', }}aria-label="simple table">
                <TableHead sx={{ fontSize: '8px' }}>
                    <TableRow sx={{ height: '30px', }}>
                        <CustomTableCell component="th" scope="row" >Nombre</CustomTableCell>
                        <CustomTableCell >Apellidos</CustomTableCell>
                        <CustomTableCell>Intentos</CustomTableCell>
                        <CustomTableCell>Anotaciones</CustomTableCell>
                        <CustomTableCell>Errores</CustomTableCell>
                        <CustomTableCell>Omisiones</CustomTableCell>
                        <CustomTableCell>Igap</CustomTableCell>
                        <CustomTableCell>Ici</CustomTableCell>
                        <CustomTableCell>% aciertos</CustomTableCell>
                        <CustomTableCell>Eficacia atencional</CustomTableCell>
                        <CustomTableCell>Eficiencia atencional</CustomTableCell>
                        <CustomTableCell>Rendimiento Atencional</CustomTableCell>
                        <CustomTableCell>Calidad atención</CustomTableCell>
                    </TableRow>
                </TableHead>
                <TableBody sx={{ fontSize: '8px' }}>
                    {data.map((row) => (
                        <TableRow key={row.Intentos}>
                            <CustomTableCell component="th" scope="row" >{row.Nombre}</CustomTableCell>
                            <CustomTableCell>{row.Apellidos}</CustomTableCell>
                            <CustomTableCell>{row.Intentos}</CustomTableCell>
                            <CustomTableCell>{row.Anotaciones}</CustomTableCell>
                            <CustomTableCell>{row.Errores}</CustomTableCell>
                            <CustomTableCell>{row.Omisiones}</CustomTableCell>
                            <CustomTableCell>{row.Igap}</CustomTableCell>
                            <CustomTableCell>{row.Ici}</CustomTableCell>
                            <CustomTableCell>{row.Pcaciertos}</CustomTableCell>
                            <CustomTableCell>{row.Eficaciaatencional}</CustomTableCell>
                            <CustomTableCell>{row.Eficienciaatencional}</CustomTableCell>
                            <CustomTableCell>{row.RendimientoAtencional}</CustomTableCell>
                            <CustomTableCell>{row.Calidaddeatencion}</CustomTableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
} */