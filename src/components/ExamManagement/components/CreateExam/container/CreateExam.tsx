import { Box, Button, Checkbox } from '@mui/material'
import UsersList from 'components/ExamManagement/components/CreateExam/components/ExamUserManagement'
import SelectTest from 'components/ExamManagement/components/CreateExam/components/SelectTest'
import { usePost } from 'hooks/usePost'
import { useGetAllGeneric } from 'hooks/useGetAllGeneric'
import { endpoint, Post, PostGeneric } from 'httpRequests'
import React, { useEffect, useState } from 'react'
import RadioGroupForTestPattern from '../components/RadioGroupForTestPattern'
import Separator from '../components/Separator'
import EUsersTransferList from '../components/EUsersTransferList'
import UsersTransferList from '../components/UsersTransferList'
import NewExamModal from '../components/NewExamModal'
import { Examen } from '../components/ExamUserManagement/container/Commons'
import ExamDateTimePicker from '../components/ExamDateTimePicker'

/* export type User = {
  "ci": string | null,
  "nombre": string | null,
  "apellidos": string | null,
  "userName": string | null,
  "password": string | null,
  "sexoNombre": string | null,
  "edad": number | null,
  "roles": [
    {
      uId: string | null,
      nombre: string | null
    }
  ],
  "grupoEtarioNombre": string | null,
  "escolaridadNombre": string | null
} | null; */

const CreateExam = () => {

  const [send, setSend] = useState<boolean>(false);
  
  const { data:tests, loading } = useGetAllGeneric(endpoint.pruebas.matriz, null);
  const { data:users, loading:loadingUsers } = useGetAllGeneric(endpoint.usuarios.usuariosAll, null);
  // console.log(data)

// USUARIOS ASIGNADOS
const [usuariosAsignados,setUsuariosAsignados] = useState([])
const usuariosAsignadosHandler = (asignedUsers)=>{
setExamObject(prevState => { 

  return { ...prevState, usuariosCiList: asignedUsers } })
}

  // POSTING THE NEW EXAM
  const [examObject,setExamObject] = useState<Examen>(
    {
      testUId: null,
      isPatronOriginal: true,
      usuariosCiList: null,
      fechaInicio: 0,
      fechaFin: 0
    }
  )
  const [postResponse, setPostResponse] = useState(null)
  const [loadingPostResponse, setLoadingPostResponse] = useState(false);

  async function httpResp() {
      const temp = await Post(endpoint.examenes.general, examObject)
      if (temp !== null)
        await setPostResponse(temp)
      await setLoadingPostResponse(false)
    /* } */
  }

  
  const postExam = () => {
    setLoadingPostResponse(true)
    httpResp();
    // Ahora Toca reiniciar los estados de la data etc
  }

  useEffect(() => {
    console.log('examObject');
    console.log(examObject);
    postExam()

  }, [send])
  // TILL HERE

  const testSelectedHandler = (test) => {
      setExamObject(prevState => { return { ...prevState, testUId: test.uId } })
  }

  const patternSelectedHandler = (isPatronOriginal) => {
      setExamObject(prevState => { return { ...prevState, isPatronOriginal: isPatronOriginal } })
  }
  const startDateSelectedHandler = (fechaInicio) => {
    setExamObject(prevState => { return { ...prevState, fechaInicio: fechaInicio } })
}
const endDateSelectedHandler = (fechaFin) => {
  setExamObject(prevState => { return { ...prevState, fechaFin: fechaFin } })
}
   console.log(usuariosAsignados)


/// Modal
const [open, setOpen] = React.useState(false);

   const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>

     {/*  <h3 style={{ marginBottom: '10px' }}>Asignar usuarios a examen: </h3>
      <UsersList startWithUsers onUsuariosAsignados={usuariosAsignadosHandler} asignedUsers={usuariosAsignados}/>

      <Separator />

      <h3 style={{ marginBottom: '10px' }}>Usuarios asignados: </h3>
      <UsersList startWithUsers={false} onUsuariosAsignados={usuariosAsignadosHandler} asignedUsers={usuariosAsignados}/>
 */}
 <h3 style={{ marginBottom: '10px', position:'relative' }}>Asignar usuarios: </h3>
<>{loadingUsers 
?
 "Cargando..." :
 users ?  
 <UsersTransferList users={users} loadingUsers={loadingUsers} onUsuariosAsignados={usuariosAsignadosHandler}/>
 :
 "No se encuentran datos"
}
 </>
      <Separator />

      {/* SELECCIONADOR DE PRUEBA */}
      <h3 style={{ marginBottom: '10px' }}>Tipo de Prueba: </h3>
      <SelectTest data={tests} onTestSelected={testSelectedHandler} />

      <Separator />

      <RadioGroupForTestPattern onPatternSelected={patternSelectedHandler} />
      
      <Separator />
      <h3 style={{ marginBottom: '10px', position:'relative' }}>Fecha de inicio: </h3>
      <ExamDateTimePicker/>

      <Separator />
      <h3 style={{ marginBottom: '10px', position:'relative' }}>Fecha de fin: </h3>
      <ExamDateTimePicker/>
      <br />
      <Button
        variant='contained'
        onClick={ handleClickOpen /* setSend(!send) */}
      >
        Completar creación de examen
        </Button>
 <NewExamModal open={open} onConfirm={()=>{setSend(!send); handleClose()}} onClosing={handleClose}/> 
        
    </Box>
    
  )
}

export default CreateExam
