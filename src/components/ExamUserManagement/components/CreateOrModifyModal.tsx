import { Box, Button, Modal, TextField } from '@mui/material'
import React, { useState } from 'react'
import MyRadioButton from './MyRadioButton';

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
  "ci": 0,
  "nombre": "",
  "apellidos": "",
  "password": "",
  "sexo": false,
  "edad": 0,
  "rolId": 1,
  "centrosIds": [
    1
  ],
  "escolaridadId": 1
}

const UserCreateOrModifyModal = ({ isOpen, toClose }: any) => {


  const [userObj, setUserObj] = useState(baseUser);

  const selectedOptionHandler = (option, userProp) => {
    setUserObj((prevState) => {
      // console.log('selectedOption')
      return { ...prevState, [userProp]: option /* userProp!=="sexo" ? parseFloat(option): userProp */ }
    })
  }


  return (
    <Modal
      open={isOpen}
      onClose={toClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form>
          <TextField id="ci" type="number" required onChange={(e) => setUserObj(prevState => { return { ...prevState, ci: parseFloat(e.target.value) } })} label="Ci" variant="standard" sx={{ width: '100%' }} />
          <hr style={{ border: '1px solid transparent' }} />
          <TextField id="userNombre" type="text" required onChange={(e) => setUserObj(prevState => { return { ...prevState, nombre: e.target.value } })} label="Nombre" variant="standard" sx={{ width: '100%' }} />
          <hr style={{ border: '1px solid transparent' }} />
          <TextField id="apellidos" type="text" required onChange={(e) => setUserObj(prevState => { return { ...prevState, apellidos: e.target.value } })} label="Apellidos" variant="standard" sx={{ width: '100%' }} />
          <hr style={{ border: '1px solid transparent' }} />
          <TextField id="userPassword" type="password" required onChange={(e) => setUserObj(prevState => { return { ...prevState, password: e.target.value } })} label="Contraseña" variant="standard" sx={{ width: '100%' }} />
          <hr style={{ border: '1px solid transparent' }} />

          <br />
          <MyRadioButton options={[{ value: true, label: 'Femenino' }, { value: false, label: 'Masculino' }]} onSelectOption={selectedOptionHandler} userProp="sexo" />
          <hr style={{ border: '1px solid transparent' }} />

          <TextField id="edad" type="number" onChange={(e) => setUserObj(prevState => { return { ...prevState, ci: parseFloat(e.target.value) } })} label="Nombre" variant="standard" sx={{ width: '100%' }} />
          <hr style={{ border: '1px solid transparent' }} />
          <TextField id="rolId" type="number" onChange={(e) => setUserObj(prevState => { return { ...prevState, ci: parseFloat(e.target.value) } })} label="Nombre" variant="standard" sx={{ width: '100%' }} />
          <hr style={{ border: '1px solid transparent' }} />
          <TextField id="centrosIds" type="number" onChange={(e) => setUserObj(prevState => { return { ...prevState, ci: parseFloat(e.target.value) } })} label="Nombre" variant="standard" sx={{ width: '100%' }} />
          <hr style={{ border: '1px solid transparent' }} />
          <TextField id="escolaridadId" type="number" onChange={(e) => setUserObj(prevState => { return { ...prevState, ci: parseFloat(e.target.value) } })} label="Nombre" variant="standard" sx={{ width: '100%' }} />
          <hr style={{ border: '1px solid transparent' }} />
          <br/>
          <Button /* onClick={loginHandler} */ style={{ border: 'none', backgroundColor: 'transparent' }}>Completar</Button>
          <Button /* onClick={loginHandler} */ style={{ border: 'none', backgroundColor: 'transparent' }}>Cancelar</Button>
        </form>
      </Box>
    </Modal>
  )
}

export default UserCreateOrModifyModal