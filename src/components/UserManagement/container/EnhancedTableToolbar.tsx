import { alpha, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import { useDeleteProtected } from "hooks/useDeleteProtected";
import React from "react";
import UserCreateOrModifyModal from "../components/CreateOrModifyModal";
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { DeleteSeveral, endpoint } from "httpRequests";

interface EnhancedTableToolbarProps {
  numSelected: number;
  onDelete: () => void
}

export const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected,/* idsList, */onDelete } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


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
            <UserCreateOrModifyModal isOpen={open} toClose={handleClose} />
            {numSelected === 1 &&
              <Tooltip title="Modificar datos de usuario">
                <IconButton onClick={handleOpen}>
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
        <Tooltip title="Ingresar un nuevo usuario">
          <IconButton onClick={handleOpen}>
            <PersonAddAlt1Icon />
          </IconButton>
        </Tooltip>
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