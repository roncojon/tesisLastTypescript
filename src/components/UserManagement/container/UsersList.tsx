import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { EnhancedTableToolbar } from './EnhancedTableToolbar';
import { Data, getComparator, Order, stableSort } from './Commons';
import { EnhancedTableHead } from './EnhancedTableHead';
import { DeleteSeveral, endpoint } from 'httpRequests';
// import SearchBar from 'components/Layouts/MainLayout/components/topBar/components/SearchBar';
import { useEffect, useState } from 'react';
import { useSearchOne } from 'hooks/useSearchOne';
import { useGetAllGeneric } from 'hooks/useGetAllGeneric';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import SearchBar from '../components/SearchBar';
import { useAppState } from 'stores';
// import SearchBar from '../components/SearchBar';

//const requestParamKey = "userName";

export default function EnhancedTable() {

  const [rows, setRows] = useState([]);
  const [getAllAgain, setGetAllAgain] = useState(true);

  const { data, loading } = useGetAllGeneric(endpoint.usuarios.usuariosAll, getAllAgain);
  // const { usuariosByName, loadingUsuariosByName } = useSearchOne(requestParamKey, debouncedValue, endpoint.usuarios.usuariosByName, getByNameAgain);

  const [rendering, setRendering] = useState(false);

  const setDataState = (users) => {
    const rowsTemp = [];
    if (users) {
      users.forEach(data => {
        const rolesNames = data.roles.map((rol, index) => {
          if (index !== data.roles.length - 1)
            return (rol.nombre + ', ')
          else
            return rol.nombre
        })
        rowsTemp.push({
          id: data.id,
          nombre: data.nombre,
          apellidos: data.apellidos,
          ci: data.ci,
          escolaridad: data.escolaridadNombre,
          roles: rolesNames ? rolesNames : '-',
        })
      });
      setRows(rowsTemp);
      setIdsList([]);
    }
    else {
      setRows([]);
      setIdsList([]);
    }
  }

  useEffect(() => {
    setDataState(data);
  }, [data])

  useEffect(() => {
    loading && setRendering(true)
  }, [loading])

  useEffect(() => {
    !loading && setRendering(false)
  }, [rows])

  /*   useEffect(() => {
      setSourceUsed("By Name");
      setDataState(usuariosByName)
    }, [usuariosByName, loadingUsuariosByName]) */

  const handleShowUsersByName = (debVal) => {
    setSelected([]);
    console.log('debVal')
    console.log(debVal)
    // Filtrar data para obtener los q tengan ese nombre-apellidos y hacer rows=(resultado de ese filtro)
    if (!debVal.length) {
      if (!refresh)
        handleShowAllUsers();
    }
    // setRefresh(true)
    else {
      setRefresh(false)
      let allUsersTemp = data;

      let filteredByName = allUsersTemp.filter((u) =>
        // u.nombre.toLowerCase().includes(debVal.toLowerCase()) || u.apellidos.toLowerCase().includes(debVal.toLowerCase())
        (u.nombre.toLowerCase() + ' ' + u.apellidos.toLowerCase()).includes(debVal.toLowerCase())
      );
      setDataState(filteredByName);

    }
  }
  const [refresh, setRefresh] = useState(false);
  const handleShowAllUsers = () => { setSelected([]); setRefresh(true); setGetAllAgain(true) }

  useEffect(() => {
    if (!loading)
      setGetAllAgain(false)
  }, [loading])

  const [idsList, setIdsList] = useState([]);

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('nombre');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string | number, ci: string) => {
    const selectedIndex = selected.indexOf(ci.toString());
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, ci.toString());
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
    modifyIdsList(ci);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (name: string | number) => selected.indexOf(name.toString()) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const modifyIdsList = (ci) => {
    idsList.includes(ci) ?
      setIdsList((prevState) => { let temp = prevState; return temp.filter(x => x !== ci) }) :
      setIdsList((prevState) => [...prevState, ci])
  }
  const [deleteBackenResponse, setDeleteBackendResponse] = useState("");
  const { accessToken } = useAppState((state) => state.authenticationInfo);

  const deleteHandler = async () => {
    setOpenDeleteModal(false)

    const delResp = await DeleteSeveral(idsList, endpoint.usuarios.usuariosDeleteSeveral, accessToken)
    setDeleteBackendResponse(delResp);
  }

  // UserSelectedData if there is just one selected
  const [userSelectedData, setUserSelectedData] = React.useState<any | null>(null);
  useEffect(() => {
    if (idsList.length === 1) {
      console.log('1 USER IS SELECTED')
      let temp = data;
      const userData = temp.filter(x => x.ci === idsList[0]);
      setUserSelectedData(userData[0])
    }
    else {
      console.log('Less or More Than 1 User Is Selected')
      setUserSelectedData(null)
    }
  }, [idsList])
  console.log('userSelectedData')
  console.log(userSelectedData)

  //Modal;
  // const { data:dataNeededForCreateUser, loading:loadingDataNeededForCreateUser } = useGetAllGeneric(endpoint.usuarios.DataForCreateUser, true);


  /* const [openCreateUserModal, setOpenCreateUserModal] = React.useState(false);
  const handleOpenCreateUserModal = () => setOpenCreateUserModal(true);
  const handleCloseCreateUserModal = () => {console.log('GAAAAAAAaa'); setOpenCreateUserModal(false); setGetAllAgain(!getAllAgain) }; */

  // DELETE ASK CONFIRMATION MODAL
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => { setOpenDeleteModal(false); setDeleteBackendResponse("")/* setOpenResponseModal(false);getAllAgain(); */ };

  return (
    <Box sx={{ width: '80%', minWidth: '1000px' }}>
      <SearchBar onResponseUsersByName={handleShowUsersByName} refresh={refresh}/* onRefresh="" *//* {()=>handleShowUsersByName("")} */ />
      {loading || rendering/* || loadingUsuariosByName || (!rows.length && (data || usuariosByName)) */ ?
        <h3>Cargando...</h3> :
        /* rows.length > 0 ? */
        <>
          <Paper sx={{ width: '100%', mb: 2 }}>
            <EnhancedTableToolbar
              numSelected={selected.length}
              onDelete={handleOpenDeleteModal}
              userData={userSelectedData}
              getAllAgain={handleShowAllUsers}
              deleteBackenResponse={deleteBackenResponse}
            />
            <TableContainer>
              <Table
                sx={{ minWidth: 950 }}
                aria-labelledby="tableTitle"
                size={dense ? 'small' : 'medium'}
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                {rows.length > 0 ?
                  <TableBody>
                    {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
                    {stableSort(rows, getComparator(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => {
                        const isItemSelected = isSelected(row.ci);
                        const labelId = `enhanced-table-checkbox-${index}`;
                        return (
                          <TableRow
                            hover
                            onClick={(event) => handleClick(event, row.nombre, row.ci)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.ci}
                            selected={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                color="primary"
                                checked={isItemSelected}
                                inputProps={{
                                  'aria-labelledby': labelId,
                                }}
                              />
                            </TableCell>
                            <TableCell
                              // component="th"
                              id={labelId}
                              scope="row"
                              padding="none"
                            >
                              {row.nombre}
                            </TableCell>
                            <TableCell align="right">{row.apellidos}</TableCell>
                            <TableCell align="right">{row.ci}</TableCell>
                            <TableCell align="right">{row.escolaridad}</TableCell>
                            <TableCell align="right">{row.roles}</TableCell>
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow
                        style={{
                          height: (dense ? 33 : 53) * emptyRows,
                        }}
                      >
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody> :
                  <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} >
                  <h3>No se encontraron usuarios</h3>
                  </TableCell>
                </TableRow>
                
                }
              </Table>
            </TableContainer>
            <TablePagination
              labelRowsPerPage="Usuarios por página: "
              rowsPerPageOptions={[10, 25, 100]}
              labelDisplayedRows={({ from, to, count }) => {
                return `${from}–${to} de ${count !== -1 ? count : `more than ${to}`}`;
              }}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>

          <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label="Filas estrechas"
          />
        </>

      }
      <DeleteConfirmationModal open={openDeleteModal} onConfirm={deleteHandler} onClose={handleCloseDeleteModal} />
    </Box>
  );
}
