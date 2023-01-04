import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, IconButton, Tooltip, tooltipClasses, TooltipProps } from '@mui/material';
import { useGetAllGeneric } from 'hooks/useGetAllGeneric';
import { endpoint } from 'httpRequests';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/';

interface UserBasicInfo {
    nombre: string,
    apellidos: string,
    ci: string,
}

interface Trow {
    testNombre: string,
    fechaInicio: number,
    fechaFin: number,
    estaActivo: boolean,
    modifyButton: any,
    deleteButton: any,
    usersForTooltip: any/* UserBasicInfo[] | any */,
    usersRaw: any,
}

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        maxWidth: 820,
        width: 'max-content',
        fontSize: theme.typography.pxToRem(12),
        backgroundColor: 'rgba(97, 97, 97, 0.92)',
        color: '#fff'
    },
}));

export default function AllExams() {
    const { data: examenes, loading } = useGetAllGeneric(endpoint.examenes.getAllPlus, true)

    const [rows, setRows] = useState([]);
    useEffect(() => {
        if (examenes) {
            // let usersBasicInfoForTooltipAsString ="";
            setRows(examenes.map((e) => {
                //    console.log('e.usuarios')
                //  console.log(e.usuarios)
                // e.usuarios.forEach((u)=>{usersBasicInfoForTooltipAsString=usersBasicInfoForTooltipAsString+"Nombre: "+u.nombre +" |  Apellidos: "+u.apellidos+" | Ci: "+u.ci+"\n"});
                return {
                    testNombre: e.testNombre,
                    fechaInicio: e.fechaInicio,
                    fechaFin: e.fechaFin,
                    estaActivo: e.estaActivo,

                    modifyButton: <IconButton
                        onClick={() => {
                            //onDelete();
                        }}
                        size="small">
                        <EditIcon />
                    </IconButton>,

                    deleteButton: <IconButton
                    // onClick={handleOpenModifyUserModal}
                    >
                        <DeleteIcon />
                    </IconButton>,
                    usersForTooltip: <>
                        {e.usuarios.map((u) => <div /* style={{whiteSpace: 'nowrap'}} */>{"Nombre: " + u.nombre + " |  Apellidos: " + u.apellidos + " | Ci: " + u.ci}<br /></div>)}
                    </>,
                    usersRaw: e.usuarios
                }
            }))
        }
    }, [examenes])

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
   return  day+'-'+month+'-'+year+' '+hours + ':' + minutes.substr(-2);
    }
    return (
        <TableContainer component={Paper} sx={{ width: '80%' }}>
            <Table sx={{ minWidth: 750, }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell align="left">Fecha inicio</TableCell>
                        <TableCell align="left">Fecha de fin</TableCell>
                        <TableCell align="left">Activo</TableCell>
                        <TableCell align="right">&nbsp;</TableCell>
                        <TableCell align="right">&nbsp;</TableCell>
                    </TableRow>
                </TableHead>
                {!loading && rows.length > 0 ?
                    <TableBody>
                        {rows.map((row) => (
                            <HtmlTooltip
                                title={row.usersForTooltip}
                            // placement="bottom"
                            // enterNextDelay={1000}
                            /* leaveDelay={10000}
                            sx={{
                                "& .MuiTooltip-tooltip": { maxWidth: '50px', backgroundColor:'red',border: "solid red 10px"},
                                "& .MuiTooltip-popper": { maxWidth: '50px',},
                                "& .MuiTooltip-tooltipPlacementBottom": { maxWidth: '50px',},
                                
                            }} */
                            >
                                <TableRow
                                    // key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.testNombre}
                                    </TableCell>
                                    <TableCell align="left">{unixToDate(row.fechaInicio)}</TableCell>
                                    <TableCell align="left">{unixToDate(row.fechaFin)}</TableCell>
                                    <TableCell align="left">{row.estaActivo ? "Sí" : "No"}</TableCell>
                                    <TableCell align="right">{row.modifyButton}</TableCell>
                                    <TableCell align="right">{row.deleteButton}</TableCell>
                                </TableRow>
                            </HtmlTooltip>
                        ))}
                    </TableBody>
                    :
                    "Cargando..."
                }
            </Table>
        </TableContainer>
    );
}