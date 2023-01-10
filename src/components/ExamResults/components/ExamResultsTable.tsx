import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, makeStyles } from "@mui/material";

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
                borderRight:'1px solid #e5e5e5'
            }}
            {...rest}
        >
            {children}
        </TableCell>
    )
}

export default function ExamsResultsTable ({data,onClose})/* ({ data }: UserExamResult[]) */ {
    return (
        <div style={{width:'1000px', padding:'2px'}}>
        {/* <ERTable data={[testo, testo2]} /> */}
        <TableContainer component={Paper} >
            <Table sx={{ minWidth: '980px', }}/* className={classes.table} */ aria-label="simple table">
                <TableHead sx={{ fontSize: '8px' }}>
                    <TableRow sx={{ height: '30px', }}>
                        <CustomTableCell /* width={110} */component="th" scope="row" >Nombre</CustomTableCell>
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
        </div>
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