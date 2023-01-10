import Close from "@mui/icons-material/Close";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, makeStyles, Box, IconButton } from "@mui/material";

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

export default function ExamsResultsTable({ data, onClose })/* ({ data }: UserExamResult[]) */ {
    console.log('data ')
  console.log(data)

  console.log('data.results.usuarioCi ')
console.log(data.results)

 
  return (
        <Box sx={{ minWidth: '1000px', height: '100%', padding:'5px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'white', position: 'relative' }}>
            {/* <ERTable data={[testo, testo2]} /> */}
            <Box sx={{ width: '100%', height: '40px',/* pr:'20px',pt:'20px', */ position: 'absolute', top: '10px', right: '10px', display: 'flex', justifyContent: 'end' }}>
                <IconButton
                    onClick={onClose}
                // sx={{position: 'absolute', top: '5px', right: '5px'}}
                >
                    <Close />
                </IconButton>
            </Box>
            {data.results ?
                <TableContainer component={Paper} sx={{ minWidth: '980px', mt: '30px' }}>
                    <Table /* sx={{ minWidth: '980px', }} *//* className={classes.table} */ aria-label="simple table">
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
                           {data.results.map((userResult)=>{

                               return(
                                <TableRow /*  key={row.intentosTotales} */>
                                    <CustomTableCell component="th" scope="row" >{(data.usersRaw.find((u) => u.ci === userResult.usuarioCi)).nombre}</CustomTableCell>
                                    <CustomTableCell>{(data.usersRaw.find((u) => u.ci === userResult.usuarioCi)).apellidos}</CustomTableCell>
                                    <CustomTableCell>{userResult.intentosTotales}</CustomTableCell>
                                    <CustomTableCell>{userResult.anotacionesTotales}</CustomTableCell>
                                    <CustomTableCell>{userResult.erroresTotales}</CustomTableCell>
                                    <CustomTableCell>{userResult.omisionesTotales}</CustomTableCell>
                                    <CustomTableCell>{userResult.igap}</CustomTableCell>
                                    <CustomTableCell>{userResult.ici}</CustomTableCell>
                                    <CustomTableCell>{userResult.porCientoDeAciertos}</CustomTableCell>
                                    <CustomTableCell>{userResult.eficaciaAtencional}</CustomTableCell>
                                    <CustomTableCell>{userResult.eficienciaAtencional}</CustomTableCell>
                                    <CustomTableCell>{userResult.rendimientoAtencional}</CustomTableCell>
                                    <CustomTableCell>{userResult.calidadDeLaAtencion}</CustomTableCell>
                                </TableRow>
                            
                            )})}
                        </TableBody>
                    </Table>
                </TableContainer> :
                <Box>
                    <h3>Ningún usuario ha realizado este examen</h3>
                </Box>
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