import { Box, Button, FormControl, Modal, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MyRadioButton from './MyRadioButton';
import MultipleSelectChip from './SelectMultipleChip';
import SelectGeneric from './SelectGeneric';
import { endpoint } from 'httpRequests';
import { useGetAllGeneric } from 'hooks/useGetAllGeneric';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: '#FFFFFF',
  border: '2px solid #F5F5F5',
  borderRadius: '4px',
  boxShadow: 24,
  p: 4,
};

const baseUser = {
  "ci": "",
  "nombre": "",
  "apellidos": "",
  "password": "",
  "sexoUid": '',
  "rolUidsList": [],
  "escolaridadUid": ""
}

const UserCreateOrModifyModal = ({ isOpen, onCloseModal, userData }/* : any */) => {
const {data,loading} = useGetAllGeneric(endpoint.usuarios.DataForCreateUser,true);
// const {actualUserData,loadingActualUserData} = 
console.log('DataForCreateUser')
console.log(data)


  const [userObj, setUserObj] = useState(baseUser);

  const selectedOptionHandler = (option, userProp) => {
    setUserObj((prevState) => {
      // console.log('selectedOption')
      return { ...prevState, [userProp]: option /* userProp!=="sexo" ? parseFloat(option): userProp */ }
    })
  }
  const rolesSelectedHandler =(rolesSelected)=>{setUserObj(prevState => { return { ...prevState, rolUidsList: rolesSelected } })};
  const sexSelectedHandler =(sexoUidSelected)=>{console.log(sexoUidSelected);setUserObj(prevState => { return { ...prevState, sexoUid: sexoUidSelected } })} ;
  const scholaritySelectedHandler =(escolaridadUidSelected)=>{console.log(escolaridadUidSelected);setUserObj(prevState => { return { ...prevState, escolaridadUid: escolaridadUidSelected } })};

  console.log('userData')
  console.log(userData)

  console.log('userObj')
  console.log(userObj)

  useEffect(() => {
    if(userData!== null){
    const userDataTemp = baseUser;
    userDataTemp.ci = userData.ci;
    userDataTemp.nombre = userData.nombre
    userDataTemp.apellidos =  userData.apellidos
    userDataTemp.password = ''/* userData.password */
    userDataTemp.sexoUid = userData.sexoNombre
    userDataTemp.rolUidsList = userData.roles
    userDataTemp.escolaridadUid = userData.escolaridadNombre

    setUserObj(userDataTemp);
  }
  else
{
  const userDataTemp = baseUser;
    userDataTemp.ci = '';
    userDataTemp.nombre = ''
    userDataTemp.apellidos =  ''
    userDataTemp.password = ''
    userDataTemp.sexoUid =''
    userDataTemp.rolUidsList = []
    userDataTemp.escolaridadUid = ''
  setUserObj(userDataTemp);
}
  }, [userData])
  
  return (
    <Modal
      open={isOpen}
      onClose={()=>{ setUserObj(baseUser);onCloseModal()}}
      /* aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description" */
    >
      <Box sx={style}>
        {loading ? 
        'Cargando...' : 
        data ? 
        <>
        <TextField
         type="text" /* required  */
         value={userObj.ci /* userData ? userData.ci : '' */}
          onChange={(e) => setUserObj(prevState => { return { ...prevState, ci: e.target.value } })} 
          label="Ci"
           variant="standard"  
           autoComplete="off"
            sx={{ width: '100%' }} />
        <hr style={{ border: '1px solid transparent' }} />
        <TextField  
        type="text" /* required  */
        value={userObj.nombre/* userData ? userData.nombre : '' */}
         onChange={(e) => setUserObj(prevState => { return { ...prevState, nombre: e.target.value } })} 
         label="Nombre" 
         autoComplete="off"
          variant="standard" 
          sx={{ width: '100%' }} />
        <hr style={{ border: '1px solid transparent' }} />
        <TextField
         type="text" /* required  */
         value={userObj.apellidos}
          onChange={(e) => setUserObj(prevState => { return { ...prevState, apellidos: e.target.value } })} 
          label="Apellidos" 
          autoComplete="off"
           variant="standard" 
           sx={{ width: '100%' }} />
        <hr style={{ border: '1px solid transparent' }} />
        <TextField 
        type="password" /* required  */
        value={userObj.password}
         onChange={(e) => setUserObj(prevState => { return { ...prevState, password: e.target.value } })} 
         label="Contraseña" 
         autoComplete="new-password" 
         variant="standard" 
         sx={{ width: '100%' }} />
        <hr style={{ border: '1px solid transparent' }} />
        <br />
        {/* Roles */}
        <MultipleSelectChip title='Roles' list={data.roles} onSelected={rolesSelectedHandler}/>
        <hr style={{ border: '1px solid transparent' }} />
        {/* Sexo */}
        <SelectGeneric 
        title='Sexo' 
        list={data.sexoList} 
value={userObj.sexoUid}
        onSelected={sexSelectedHandler}/>
        <hr style={{ border: '1px solid transparent' }} />
        {/* Esxolaridad */}
        <SelectGeneric
         title='Escolaridad'
          list={data.escolaridadList} 
          value={userObj.escolaridadUid}
          onSelected={scholaritySelectedHandler}/>
        <hr style={{ border: '1px solid transparent' }} />
        <br />
        <Button sx={{ border: 'none', backgroundColor: 'transparent' }}>Completar</Button>
        <Button sx={{ border: 'none', backgroundColor: 'transparent' }} onClick={()=>onCloseModal()}>Cancelar</Button>
      </> : 
      'Error estableciendo comunicación con el servidor'}
        
      </Box>
    </Modal>
  )
}

export default UserCreateOrModifyModal