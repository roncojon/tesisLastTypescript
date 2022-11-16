import { Box, Button } from '@mui/material'
import { useGetAllGeneric } from 'hooks/useGetAllGeneric'
import { endpoint, PostDisableExam, PostGeneric } from 'httpRequests'
import React, { useState ,useEffect} from 'react'

const OldExams = () => {
    // Mostrar solo examenes activos y dar la opcion de finalizarlos

   const {data:examenes,loading}= useGetAllGeneric(endpoint.examenes.general,true)

   // Disable request
  /* const[disableExamRequest,setDisableExamRequest] = useState<boolean>(false)
   const[examId,setExamId] = useState<string>('')
   
   const [data,setData] = useState(null)
const [loadingDisableRequest,setLoadingDisableRequest]= useState(true)

    async function httpResp(){
    const temp = await PostDisableExam('examenId',examId,endpoint.examenes.examenesActivos)  // , accessToken 
    if(temp!==null)
    await setData(temp)
    await setLoadingDisableRequest(false)
  }

   useEffect(() => {
    if(examId){
    setLoadingDisableRequest(true)
    httpResp()
}
   }, [disableExamRequest, examId]) */

    return (
        <Box sx={{display:'flex', flexDirection:'column'}}>
            {!loading ?
            examenes.map((e)=>
<Button /* onClick={()=>{setExamId(e.id)}} */>Tipo:{e.pruebaMatrizNombre}. Fecha:{e.fecha}. Activo:{e.activo.toString().replace('true','Si').replace('false','No')}.</Button>
            )
        :
        <h3>Cargando...</h3>}
        </Box>
    )
}

export default OldExams