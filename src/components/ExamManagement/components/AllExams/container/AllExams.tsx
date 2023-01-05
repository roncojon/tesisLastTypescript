import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, IconButton, Modal, Tooltip, tooltipClasses, TooltipProps } from '@mui/material';
import { useGetAllGeneric } from 'hooks/useGetAllGeneric';
import { endpoint } from 'httpRequests';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/';
import CreateExam from '../../CreateExam';
import { getComparator, Order, stableSort } from 'components/UserManagement/container/Commons';

interface UserBasicInfo {
    nombre: string,
    apellidos: string,
    ci: string,
}
interface ExamInfoToShow {
    nombre: string,
    uId:string,
    fechaInicio: number,
    fechaFin: number,
    estaActivo: boolean,
    usersForTooltip: any/* UserBasicInfo[] | any */,
    usersRaw: any,
    isOriginalPattern: boolean
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
    // SHOWING EXAM INFO
    const [getAgain,setGetAgain] = useState(false);
    const { data: examenes, loading } = useGetAllGeneric(endpoint.examenes.getAllPlus, getAgain)

    const [rows, setRows] = useState([]);
    useEffect(() => {
        if (examenes) {
            // let usersBasicInfoForTooltipAsString ="";
            const order: Order = 'asc';
            const orderBy: keyof ExamInfoToShow = 'fechaInicio';

            const rowsTemp: ExamInfoToShow[] = examenes.map((e) => {
                return {
                    nombre: e.testNombre,
                    uId: e.testUId,
                    fechaInicio: e.fechaInicio,
                    fechaFin: e.fechaFin,
                    estaActivo: e.estaActivo,
                    usersForTooltip: <>
                        {e.usuarios.length ?
                            e.usuarios.map((u) => <div>{"Nombre: " + u.nombre + " |  Apellidos: " + u.apellidos + " | Ci: " + u.ci}<br /></div>)
                            :
                            <div>Aún no hay usuarios asignados a este examen</div>}
                    </>,
                    usersRaw: e.usuarios,
                    isOriginalPattern: e.esPatronOriginal
                }
            });
            setRows(stableSort(rowsTemp, getComparator(order, orderBy)))
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
        return day + '-' + month + '-' + year + ' ' + hours + ':' + minutes.substr(-2);
    }
    // SHOWING EXAM INFO ends

    // Passing exam values to modifyExam Modal
    const [openModal, setOpenModal] = useState(false);
    const [examValues, setExamValues] = useState(null);

    const handleEdit = (row) => { setExamValues(row) }
    useEffect(() => {
        if (examValues)
            setOpenModal(true)
    }, [examValues])
    const handleCloseModal = (row) => { setOpenModal(false);setGetAgain(!getAgain); }

    return (
        <>
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
                                    leaveDelay={200}
                                >
                                    <TableRow
                                        // key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } , backgroundColor:row.estaActivo &&'#ffd0a0'}}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.testNombre}
                                        </TableCell>
                                        <TableCell align="left">{unixToDate(row.fechaInicio)}</TableCell>
                                        <TableCell align="left">{unixToDate(row.fechaFin)}</TableCell>
                                        <TableCell align="left">{row.estaActivo ? "Sí" : "No"}</TableCell>
                                        <TableCell align="right">
                                            {<IconButton
                                                onClick={() => { handleEdit(row) }}
                                            >
                                                <EditIcon />
                                            </IconButton>}
                                        </TableCell>
                                        <TableCell align="right">
                                            {<IconButton
                                            // onClick={handleOpenModifyUserModal}
                                            >
                                                <DeleteIcon />
                                            </IconButton>}
                                        </TableCell>
                                    </TableRow>
                                </HtmlTooltip>
                            ))}
                        </TableBody>
                        :
                        loading ?
                            <Box sx={{ height: '50px', display: 'flex', alignItems: 'center', ml: '10px' }}>Cargando... </Box>
                            :
                            <Box sx={{ height: '50px', display: 'flex', alignItems: 'center', ml: '10px' }}>No se encuentran exámenes actualmente </Box>

                    }
                </Table>
            </TableContainer>
            <Modal open={openModal} sx={{ p: '20px', overflow: 'auto' }}>
                <CreateExam examValues={examValues} onClose={handleCloseModal} />
            </Modal>
        </>
    );
}