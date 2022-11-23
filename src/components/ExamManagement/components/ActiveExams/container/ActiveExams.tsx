import { Box, Button } from '@mui/material'
import { useGetAllGeneric } from 'hooks/useGetAllGeneric'
import { endpoint, PostDisableExam, PostGeneric } from 'httpRequests'
import React, { useState ,useEffect} from 'react'

const ActiveExams = () => {
    // Mostrar solo examenes activos y dar la opcion de finalizarlos

   const [getActivosAgain,setGetActivosAgain] = useState<boolean>(false)
   const {data:examenesActivos,loading}= useGetAllGeneric(endpoint.examenes.examenesActivos,getActivosAgain)

   // Disable request
   const[/* disableExamRequest, */setDisableExamRequest] = useState<boolean>(false)
   const[examId,setExamId] = useState<string>('')
   
   const [dat,setData] = useState(null)
const [loadingDisableRequest,setLoadingDisableRequest]= useState(true)

   async function httpResp(){
    const temp = await PostDisableExam('examenId',examId,endpoint.examenes.examenesActivos/*, accessToken */)
    if(temp!==null)
    await setData(temp)
    await setLoadingDisableRequest(false)
  }

   useEffect(() => {
    if(examId){
    setLoadingDisableRequest(true)
    httpResp()
    setExamId('')
}
setGetActivosAgain(!getActivosAgain)

   }, [/* disableExamRequest, */ examId])

   
   
    return (
        <Box sx={{display:'flex', flexDirection:'column'}}>
        {/* <Button onClick={()=>setGetActivosAgain(!getActivosAgain)}>GET ACTIVOS AGAIN</Button> */}
            {!loading && examenesActivos ?
            examenesActivos.map((e)=>
   <Button onClick={()=>setExamId(e.id)}>Tipo:{e.pruebaMatrizNombre}. Fecha:{e.fecha}. Activo:{e.activo.toString().replace('true','Si').replace('false','No')}.</Button>
            )
        :
        <h3>Cargando...</h3>}
        </Box>
    )
}

export default ActiveExams