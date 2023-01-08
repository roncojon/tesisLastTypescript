import { alpha, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import { useDeleteProtected } from "hooks/useDeleteProtected";
import React, { useEffect } from "react";
import UserCreateOrModifyModal from "../components/UserCreateOrModifyModal";
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { DeleteSeveral, endpoint } from "httpRequests";
import { useGetAllGeneric } from "hooks/useGetAllGeneric";
import CrudConfirmationModal from "../components/CrudConfirmationModal";

interface EnhancedTableToolbarProps {
  numSelected: number;
  onDelete: () => void;
  userData:any,
  getAllAgain: any,
  deleteBackenResponse?
}

export const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected,/* idsList, */onDelete,userData,getAllAgain,deleteBackenResponse } = props;
  const [counter, setCounter] = React.useState(0);

  const { data, loading } = useGetAllGeneric(endpoint.usuarios.DataForCreateUser, true);

  // RESPONSE OF POST OR PUT REQUEST -- BOOLEAN
  const [isBackendResponseOkTemp, setIsBackendResponseOkTemp] = React.useState(null);
  const [isBackendResponseOk, setIsBackendResponseOk] = React.useState(null);

  const [openModifyUserModal, setOpenModifyUserModal] = React.useState(false);
  const handleOpenModifyUserModal = () => setOpenModifyUserModal(true);
  const handleCloseModifyUserModal = () => setOpenModifyUserModal(false);
  const handleUserModify = (isBackendResponseOk) => {

    setIsBackendResponseOkTemp(isBackendResponseOk);
     setOpenModifyUserModal(false);}

  const [openCreateUserModal, setOpenCreateUserModal] = React.useState(false);
  const handleOpenCreateUserModal = () => setOpenCreateUserModal(true);
  const handleCloseCreateUserModal = () => setOpenCreateUserModal(false);
  const handleUserCreate = (isBackendResponseOk) => {setIsBackendResponseOkTemp(isBackendResponseOk ? true : false);setOpenCreateUserModal(false); }

  const [openResponseModal, setOpenResponseModal] = React.useState(false);
  const handleOpenResponseModal = () => setOpenResponseModal(true);
  const handleCloseResponseModal = () => { setOpenResponseModal(false);getAllAgain(); };
 

  useEffect(() => {
    console.log('isBackendResponseOkTemp')
    console.log(isBackendResponseOkTemp)
    if(!openModifyUserModal)
    {

   setIsBackendResponseOk(isBackendResponseOkTemp/*  ? true : false */);
  }
  }, [openModifyUserModal])

useEffect(() => {
  if(!openCreateUserModal)
 setIsBackendResponseOk(isBackendResponseOkTemp/*  ? true : false */);
}, [openCreateUserModal])


  useEffect(() => {
    if(isBackendResponseOk!==null)
    handleOpenResponseModal();
  }, [isBackendResponseOk])
  
  useEffect(() => {
    if(!openResponseModal){
    setIsBackendResponseOk(null);
    setIsBackendResponseOkTemp(null);
  }
  }, [openResponseModal])
  
  // DELETE RESPONSE FROM BACKEND
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => {setOpenDeleteModal(false);getAllAgain(); };

  useEffect(() => {
     if(numSelected>0)
    handleOpenDeleteModal()
    // setCounter(counter+1)
  }, [deleteBackenResponse])
  
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected}  {numSelected > 1 ? ' seleccionados' : ' seleccionado'}
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Usuarios
        </Typography>
      )}
      {numSelected > 0 ?
        (
          <>
            <UserCreateOrModifyModal isOpen={openModifyUserModal} onCloseModal={handleCloseModifyUserModal} userData={userData} data={data} loading={loading} onCreateOrModifyUser={handleUserModify}/>
            {numSelected === 1 &&
              <Tooltip title="Modificar datos de usuario">
                <IconButton onClick={handleOpenModifyUserModal}>
                  <ManageAccountsIcon />
                </IconButton>
              </Tooltip>
            }
            <Tooltip title="Elminar usuario">
              <IconButton
                onClick={() => {
                  onDelete();
                 /*  handleOpenDeleteModal() */
                }}
                size="small">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </>
        ) :
        <>
          <Tooltip title="Ingresar un nuevo usuario">
            <IconButton onClick={handleOpenCreateUserModal}>
              <PersonAddAlt1Icon />
            </IconButton>
          </Tooltip>
          <UserCreateOrModifyModal isOpen={openCreateUserModal} onCloseModal={handleCloseCreateUserModal} /* userData={userData} */ data={data} loading={loading} onCreateOrModifyUser={handleUserCreate}/>
        </>
        /* (
          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon />
              
            </IconButton>
          </Tooltip>
        ) */}
        {/* CREATE OR MODIFY BACKEND RESPONSE */}
<CrudConfirmationModal isOpen={openResponseModal} backendResponse={isBackendResponseOk} onClose={handleCloseResponseModal}/>

{/* <DeleteConfirmationModal isOpen={openDeleteResponseModal} backendResponse={isBackendResponseOk} onClose={handleCloseResponseModal}/> */}

{/* DELETE BACKEND RESPONSE */}
<CrudConfirmationModal isOpen={openDeleteModal} backendResponse={deleteBackenResponse} isDeleteModal onClose={handleCloseDeleteModal}/>

    </Toolbar>
  );
};