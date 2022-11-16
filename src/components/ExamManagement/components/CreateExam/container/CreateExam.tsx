import { Box, Button, Checkbox } from '@mui/material'
import UsersList from 'components/ExamManagement/components/CreateExam/components/ExamUserManagement'
import SelectTest from 'components/ExamManagement/components/CreateExam/components/SelectTest'
import { usePost } from 'hooks/usePost'
import { useGetAllGeneric } from 'hooks/useGetAllGeneric'
import { endpoint, PostGeneric } from 'httpRequests'
import React, { useEffect, useState } from 'react'
import RadioGroupForTestPattern from '../components/RadioGroupForTestPattern'
import Separator from '../components/Separator'

const CreateExam = () => {
  //{ key1: 'pruebaMatrizNombre', value1: 'Caritas', key2: 'isPatronOriginal', value2: 'true' }
  type PostNeeds = { key1: 'pruebaMatrizNombre' | null, value1: string | null, key2: 'isPatronOriginal' | null, value2: string | null } | null
  const postNeedsTemp: PostNeeds = { key1: 'pruebaMatrizNombre', value1: null, key2: 'isPatronOriginal', value2: null }
  // usersIds ["6f162118-3a8d-4354-a62c-6aaa31d04186", "47acd0b1-44cf-4d16-8bb8-7021f5dbaa22"]
  type PostData = string[] | null

  const [send, setSend] = useState<boolean>(false);
  const [postNeeds, setPostNeeds] = useState<PostNeeds>(null);
  const [postData, setPostData] = useState<PostData>(["44cc508a-f359-4cdd-b349-05838d5eccf1"]);
  // const { response, loading } = usePost(postNeeds.key1, postNeeds.value1, postNeeds.key2, postNeeds.value2, endpoint.examen, postData);
  const { data, loading } = useGetAllGeneric(endpoint.pruebas.matriz, null);
  // console.log(data)

// USUARIOS ASIGNADOS
const [usuariosAsignados,setUsuariosAsignados] = useState([])
const usuariosAsignadosHandler = (asignedUsers)=>{console.log('PINGGGGGGAAAAAAAAAAAA');console.log(asignedUsers);setUsuariosAsignados(asignedUsers)}

  // POSTING THE NEW EXAM
  const [postResponse, setPostResponse] = useState(null)
  const [loadingPostResponse, setLoadingPostResponse] = useState(false)
  async function httpResp() {
    if (postNeeds) {
      const usuariosAsignadosIds = usuariosAsignados.map(u=> u.id)
      const temp = await PostGeneric(postNeeds.key1, postNeeds.value1, postNeeds.key2, postNeeds.value2, endpoint.examenes.general, usuariosAsignadosIds)
      if (temp !== null)
        await setPostResponse(temp)
      await setLoadingPostResponse(false)
    }

  }

  const postExam = () => {
    setLoadingPostResponse(true)
    httpResp();
    // Ahora Toca reiniciar los estados de la data etc
  }

  useEffect(() => {
    postExam()
  }, [send])
  // TILL HERE

  const testSelectedHandler = (testName) => {
    postNeeds ?
      setPostNeeds(prevState => { return { ...prevState, value1: testName } })
      :
      setPostNeeds({ ...postNeedsTemp, value1: testName })
  }

  const patternSelectedHandler = (isPatronOriginal) => {
    postNeeds ?
      setPostNeeds(prevState => { return { ...prevState, value2: isPatronOriginal.toString() } })
      :
      setPostNeeds({ ...postNeedsTemp, value2: isPatronOriginal.toString() })
  }
   console.log(usuariosAsignados)


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>

      <h3 style={{ marginBottom: '10px' }}>Asignar usuarios a examen: </h3>
      <UsersList startWithUsers onUsuariosAsignados={usuariosAsignadosHandler} asignedUsers={usuariosAsignados}/>

      <Separator />

      <h3 style={{ marginBottom: '10px' }}>Usuarios asignados: </h3>
      <UsersList startWithUsers={false} onUsuariosAsignados={usuariosAsignadosHandler} asignedUsers={usuariosAsignados}/>

      <Separator />

      {/* SELECCIONADOR DE PRUEBA */}
      <h3 style={{ marginBottom: '10px' }}>Tipo de Prueba: </h3>
      <SelectTest data={data} onTestSelected={testSelectedHandler} />

      <Separator />

      <RadioGroupForTestPattern onPatternSelected={patternSelectedHandler} />
      <br />
      <Button
        variant='contained'
        onClick={() => setSend(!send)}
      >
        Completar creación de examen</Button>
    </Box>
  )
}

export default CreateExam
