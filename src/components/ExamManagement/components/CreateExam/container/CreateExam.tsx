import { Box, Button, Checkbox, IconButton } from '@mui/material'
// import UsersList from 'components/ExamManagement/components/CreateExam/components/ExamUserManagement'
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
import ErrorDateModal from '../components/ErrorDateModal'
import ErrorSelectingTestModal from '../components/ErrorSelectintTestModal'
import ErrorUsersCiListModal from '../components/ErrorUsersCiListModal'
import BackendResponseModal from '../components/BackendResponseModal'
import CloseIcon from '@mui/icons-material/Close';

interface ExamValues {
  examValues?: {
    nombre: string,
    uId:string,
    fechaInicio: number,
    fechaFin: number,
    estaActivo: boolean,
    usersForTooltip: any/* UserBasicInfo[] | any */,
    usersRaw: any,
    isOriginalPattern: boolean
  } | null,
  onClose?: any
}
// interface ExamVals {:ExamValues} 

const CreateExam = ({ examValues, onClose }: ExamValues) => {
  const [counter, setCounter] = useState<number>(0);

  const [send, setSend] = useState<boolean>(false);

  const { data: tests, loading } = useGetAllGeneric(endpoint.pruebas.matriz, null);
  const { data: users, loading: loadingUsers } = useGetAllGeneric(endpoint.usuarios.usuariosAll, null);
  // console.log(data)

  // USUARIOS ASIGNADOS
  const [usuariosAsignados, setUsuariosAsignados] = useState([])
  const usuariosAsignadosHandler = (asignedUsers) => {
    setExamObject(prevState => {

      return { ...prevState, usuariosCiList: asignedUsers }
    })
  }

  // POSTING THE NEW EXAM
  const [examObject, setExamObject] = useState<Examen>(
    {
      testUId: null,
      isPatronOriginal: true,
      usuariosCiList: null,
      fechaInicio: (new Date()).getTime(),
      fechaFin: (new Date()).getTime()
    }
  )
  const [postResponse, setPostResponse] = useState("")
  const [loadingPostResponse, setLoadingPostResponse] = useState(false);

  async function httpResp() {
    const temp = await Post(endpoint.examenes.general, examObject)
    // if (temp !== null)
    setPostResponse(temp)
    setLoadingPostResponse(false)
  }

  const postExam = () => {
    setLoadingPostResponse(true)
    httpResp();
    // Ahora Toca reiniciar los estados de la data etc
  }

  useEffect(() => {
    const fechaActual = (new Date()).getTime();

    if (counter) {
      if (examObject.fechaFin <= examObject.fechaInicio || examObject.fechaFin <= fechaActual || examObject.fechaInicio < fechaActual - 5000000)
        setOpenDateError(true)
      else {
        if (examObject.testUId === null)
          setOpenTestError(true)
        else {
          if (examObject.usuariosCiList === null)
            setOpenUsersCiError(true)
          else
            postExam()
        }
      }
    }
    setCounter(counter + 1);

  }, [send])
  // TILL HERE

  const testSelectedHandler = (test) => {
    setExamObject(prevState => { return { ...prevState, testUId: test.uId } })
  }

  const patternSelectedHandler = (isPatronOriginal) => {
    setExamObject(prevState => { return { ...prevState, isPatronOriginal: isPatronOriginal } })
  }

  // Date 
  const startDateSelectedHandler = (fechaInicio) => {
    setExamObject(prevState => { return { ...prevState, fechaInicio: fechaInicio } })
  }
  const endDateSelectedHandler = (fechaFin) => {

    setExamObject(prevState => { return { ...prevState, fechaFin: fechaFin } })
  }
  console.log(usuariosAsignados)

  /// Modal
  const [open, setOpen] = React.useState(false);
  const [openDateError, setOpenDateError] = React.useState(false);
  const [openTestError, setOpenTestError] = React.useState(false);
  const [openUsersCiError, setOpenUsersCiError] = React.useState(false);
  const [openResponseModal, setOpenResponseModal] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseDateError = () => {
    setOpenDateError(false);
  };
  const handleCloseTestError = () => {
    setOpenTestError(false);
  };
  const handleCloseUsersCiListError = () => {
    setOpenUsersCiError(false);
  };
  const handleCloseResposneModal = () => {
    setOpenResponseModal(false);
    // closing modal if exist
    if (onClose)
      onClose()
  }

  useEffect(() => {
    console.log('postResponse')
    console.log(postResponse)
    if (counter !== 0 && postResponse !== "")
      setOpenResponseModal(true)
  }, [postResponse])

  useEffect(() => {
    if (!openResponseModal) {
      setPostResponse("");
      setLoadingPostResponse(false)
    }
  }, [openResponseModal])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', backgroundColor: '#f5f5f5', p: '20px',pb:examValues&&'40px' }}>
      {examValues && 
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'right' }}>
        <IconButton
        onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      }
      <h3 style={{ marginBottom: '10px', position: 'relative' }}>Asignar usuarios: </h3>
      <>{loadingUsers
        ?
        "Cargando..." :
        users ?
          /* Seleccionar usuarios */
          <UsersTransferList users={users} loadingUsers={loadingUsers} onUsuariosAsignados={usuariosAsignadosHandler} defaultValue={examValues && examValues.usersRaw}/>
          :
          "No se encuentran datos"
      }
      </>
      <Separator />

      {/* SELECCIONAR DE PRUEBA */}
      <h3 style={{ marginBottom: '10px' }}>Tipo de Prueba: </h3>
      <SelectTest data={tests} onTestSelected={testSelectedHandler} defaultValue={examValues && examValues}/>

      <Separator />
      {/* Seleccionar patron aleatorio o no */}
      <RadioGroupForTestPattern onPatternSelected={patternSelectedHandler} defaultValue={examValues && examValues.isOriginalPattern}/>

      <Separator />
      {/* Seleccionar fecha inicio */}
      <h3 style={{ marginBottom: '10px', position: 'relative' }}>Fecha de inicio: </h3>
      <ExamDateTimePicker onDateSelected={startDateSelectedHandler} defaultValue={examValues && examValues.fechaInicio}/>

      <Separator />
      {/* Seleccionar fecha fin */}
      <h3 style={{ marginBottom: '10px', position: 'relative' }}>Fecha de fin: </h3>
      <ExamDateTimePicker onDateSelected={endDateSelectedHandler} defaultValue={examValues && examValues.fechaFin}/>
      <br />
      <Button
        variant='contained'
        onClick={handleClickOpen}
      >
        Completar creación de examen
      </Button>
      <NewExamModal open={open} onConfirm={() => { setSend(!send); handleClose() }} onClosing={handleClose} />
      <ErrorDateModal open={openDateError} onClosing={handleCloseDateError} />
      <ErrorSelectingTestModal open={openTestError} onClosing={handleCloseTestError} />
      <ErrorUsersCiListModal open={openUsersCiError} onClosing={handleCloseUsersCiListError} />

      <BackendResponseModal open={openResponseModal} onClosing={handleCloseResposneModal} postResponse={postResponse} />
    </Box>

  )
}

export default CreateExam
