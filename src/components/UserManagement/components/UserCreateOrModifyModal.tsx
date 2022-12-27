import { Box, Button, FormControl, Modal, TextField } from '@mui/material'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import MyRadioButton from './MyRadioButton';
import MultipleSelectChip from './SelectMultipleChip';
import SelectGeneric from './SelectGeneric';
import { endpoint } from 'httpRequests';
import { useGetAllGeneric } from 'hooks/useGetAllGeneric';
import { usePost } from 'hooks/usePost';

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
  ci: "",
  password: "",
  nombre: "",
  apellidos: "",
  sexoUId: '',
  rolesUIds: [],
  escolaridadUId: ""
}

const UserCreateOrModifyModal = ({ isOpen, onCloseModal, userData }/* : any */) => {
  // Final data oganized for backend
  const [userDataToSend,setUserDataToSend] = useState({});
  const [send,setSend] = useState(false);
  const prepareUserDataToSend = ()=>{
    const finalUserDataToSend = {
      ci: userObj.ci,
      password: userObj.password,
      nombre: userObj.nombre,
      apellidos: userObj.apellidos,
      sexoUId: userObj.sexoUId,
      escolaridadUId: userObj.escolaridadUId
    };
    setUserDataToSend ({usuario:finalUserDataToSend,rolesUIds:userObj.rolesUIds})
    setSend(!send)
  }
const {response,loading:loadingRegisterResponse} = usePost(userData ? endpoint.usuarios.usuarioModify : endpoint.usuarios.usuarioRegister,userDataToSend,send)
console.log('userDataToSend')
console.log(userDataToSend)

console.log('loadingRegisterResponse')
console.log(loadingRegisterResponse)
// // // // // // 

  const { data, loading } = useGetAllGeneric(endpoint.usuarios.DataForCreateUser, true);
  const [userObj, setUserObj] = useState(baseUser);

  const rolesSelectedHandler = (rolesSelected) => { if (JSON.stringify(userObj.rolesUIds) !== JSON.stringify(rolesSelected)) { setUserObj(prevState => { return { ...prevState, rolesUIds: rolesSelected } }) } };
  const sexSelectedHandler = (sexoUidSelected) => { setUserObj(prevState => { return { ...prevState, sexoUId: sexoUidSelected } }) };
  const scholaritySelectedHandler = (escolaridadUidSelected) => { setUserObj(prevState => { return { ...prevState, escolaridadUId: escolaridadUidSelected } }) };

  useEffect(() => {
    if (userData !== null) {
      const userDataTemp = baseUser;
      userDataTemp.ci = userData.ci;
      userDataTemp.nombre = userData.nombre
      userDataTemp.apellidos = userData.apellidos
      userDataTemp.password = ''/* userData.password */
      userDataTemp.sexoUId = userData.sexoNombre
      userDataTemp.rolesUIds = userData.roles
      userDataTemp.escolaridadUId = userData.escolaridadNombre

      setUserObj(userDataTemp);
    }
    else {
      const userDataTemp = baseUser;
      userDataTemp.ci = '';
      userDataTemp.nombre = ''
      userDataTemp.apellidos = ''
      userDataTemp.password = ''
      userDataTemp.sexoUId = ''
      userDataTemp.rolesUIds = []
      userDataTemp.escolaridadUId = ''
      setUserObj(userDataTemp);
    }
  }, [userData])

  const [disableSendDataButton, setDisableSendDataButton] = useState(true);

  const disableSubmitButtonHandler = () => {
    let disable = false;
   
    if (userData) {
      const userTemp = { ...userObj }
      delete userTemp.password
      const userTempObjValues = Object.values(userTemp);
      userTempObjValues.forEach(element => {
        if (!element.length)
          disable = true
      });
    }
    else {
      const userObjValues = Object.values(userObj);
      userObjValues.forEach(element => {
        if (!element.length)
          disable = true
      });
    }
    console.log('userObj.ci.length')
    console.log(userObj.ci.length)
    if (userObj.ci.length !== 11)
      disable = true;
    if (disable !== disableSendDataButton)
      setDisableSendDataButton(disable)
  }

  useEffect(() => {
    disableSubmitButtonHandler()
  }, [userObj])

   useEffect(() => {
     disableSubmitButtonHandler()
   }, [userData])

  return (
    <Modal
      open={isOpen}
      onClose={() => { setUserObj(baseUser); onCloseModal() }}
    /* aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description" */
    >
      <Box sx={style}>
        {loading ?
          'Cargando...' :
          data ?
            <>
              <TextField
                type="number" /* required  */
                value={userObj.ci /* userData ? userData.ci : '' */}
                onChange={(e) => { e.target.value =/*  Math.max(0, parseInt(e.target.value) ).toString(). */e.target.value.slice(0, 11); setUserObj(prevState => { return { ...prevState, ci: e.target.value } }) }}
                label="Ci"
                variant="standard"
                autoComplete="off"
                sx={{ width: '100%' }}
                helperText={userData ? (userObj.ci.length !== 11 ? 'El Ci debe contener 11 dígitos' : '') : (userObj.ci ? (userObj.ci.length !== 11 ? 'El Ci debe contener 11 dígitos' : '') : 'Este campo es requerido')}
              />
              <hr style={{ border: '1px solid transparent' }} />
              <br />
              <TextField
                type="text" /* required  */
                value={userObj.nombre/* userData ? userData.nombre : '' */}
                onChange={(e) => setUserObj(prevState => { return { ...prevState, nombre: e.target.value } })}
                label="Nombre"
                autoComplete="off"
                variant="standard"
                sx={{ width: '100%' }}
                helperText={userData ? '' : (userObj.nombre ? '' : 'Este campo es requerido')}
              />
              <hr style={{ border: '1px solid transparent' }} />
              <br />
              <TextField
                type="text" /* required  */
                value={userObj.apellidos}
                onChange={(e) => setUserObj(prevState => { return { ...prevState, apellidos: e.target.value } })}
                label="Apellidos"
                autoComplete="off"
                variant="standard"
                sx={{ width: '100%' }}
                helperText={userObj.apellidos ? '' : 'Este campo es requerido'} />
              <hr style={{ border: '1px solid transparent' }} />
              <br />
              <TextField
                type="password" /* required  */
                // inputProps={{ maxLength: 12 }}

                // defaultValue={userData ? '12345678' : ''}
                // placeholder='12345678'

                // value={userObj.password}
                onChange={(e) => setUserObj(prevState => { return { ...prevState, password: e.target.value } })}
                label="Contraseña"
                autoComplete="new-password"
                variant="standard"
                sx={{ width: '100%'/* , backgroundColor:userData && (userData.password !== userObj.password ? '#e8cccc' : 'white')  */ }}
                // helperText={userData && (userData.password !== userObj.password ? "Ha cambiado la contraseña" : '')}
                helperText={userData ? '' : (userObj.password ? '' : 'Este campo es requerido')}
              />
              <hr style={{ border: '1px solid transparent' }} />

              <br />
              {/* Roles */}
              <MultipleSelectChip
                title='Roles'
                list={data.roles}
                values={userData ? userData.roles : []}
                onSelected={rolesSelectedHandler}
                helperText={userData ? '' : (userObj.rolesUIds.length ? '' : 'Este campo es requerido')}
              />
              <hr style={{ border: '1px solid transparent' }} />
              <br />
              {/* Sexo */}
              <SelectGeneric
                title='Sexo'
                list={data.sexoList}
                value={userObj.sexoUId}
                onSelected={sexSelectedHandler}
                helperText={userData ? '' : (userObj.sexoUId ? '' : 'Este campo es requerido')}
              />
              <hr style={{ border: '1px solid transparent' }} />
              <br />
              {/* Esxolaridad */}
              <SelectGeneric
                title='Escolaridad'
                list={data.escolaridadList}
                value={userObj.escolaridadUId}
                onSelected={scholaritySelectedHandler}
                helperText={userData ? '' : (userObj.escolaridadUId ? '' : 'Este campo es requerido')}
              />
              <hr style={{ border: '1px solid transparent' }} />
              <br />
              <Button sx={{ border: 'none', backgroundColor: 'transparent' }} onClick={prepareUserDataToSend} disabled={disableSendDataButton}>Completar</Button>
              <Button sx={{ border: 'none', backgroundColor: 'transparent' }} onClick={() => {setUserObj(baseUser);onCloseModal()}}>Cancelar</Button>
            </> :
            'Error estableciendo comunicación con el servidor'}
      </Box>
    </Modal>
  )
}

export default UserCreateOrModifyModal