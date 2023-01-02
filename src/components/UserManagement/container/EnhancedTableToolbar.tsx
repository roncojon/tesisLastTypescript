import { alpha, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import { useDeleteProtected } from "hooks/useDeleteProtected";
import React from "react";
import UserCreateOrModifyModal from "../components/UserCreateOrModifyModal";
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { DeleteSeveral, endpoint } from "httpRequests";
import { useGetAllGeneric } from "hooks/useGetAllGeneric";

interface EnhancedTableToolbarProps {
  numSelected: number;
  onDelete: () => void;
  userData:any,
  getAllAgain: any
}

export const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected,/* idsList, */onDelete,userData,getAllAgain } = props;

  const { data, loading } = useGetAllGeneric(endpoint.usuarios.DataForCreateUser, true);

  const [openModifyUserModal, setOpenModifyUserModal] = React.useState(false);
  const handleOpenModifyUserModal = () => setOpenModifyUserModal(true);
  const handleCloseModifyUserModal = () => setOpenModifyUserModal(false);
  const handleUserModify = () => {getAllAgain();setOpenModifyUserModal(false);}

  const [openCreateUserModal, setOpenCreateUserModal] = React.useState(false);
  const handleOpenCreateUserModal = () => setOpenCreateUserModal(true);
  const handleCloseCreateUserModal = () => setOpenCreateUserModal(false);
  const handleUserCreate = () => {getAllAgain();setOpenCreateUserModal(false);}

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
          <UserCreateOrModifyModal isOpen={openCreateUserModal} onCloseModal={handleCloseCreateUserModal} userData={userData} data={data} loading={loading} onCreateOrModifyUser={handleUserCreate}/>
        </>


        /* (
          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon />
              
            </IconButton>
          </Tooltip>
        ) */}
    </Toolbar>
  );
};