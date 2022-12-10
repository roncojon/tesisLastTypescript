import * as React from 'react';
// import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import { alpha, Typography } from '@mui/material/';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
// import {DeleteIcon} from '@mui/icons-material/Delete';
// import FilterListIcon from '@mui/icons-material/FilterList';
import UserCreateOrModifyModal from '../components/CreateOrModifyModal';
import { useDeleteProtected } from 'hooks/useDeleteProtected';
import { EnhancedTableToolbar } from './EnhancedTableToolbar';
import { createData, Data, getComparator, Order, stableSort } from './Commons';
import { EnhancedTableHead } from './EnhancedTableHead';
// import { useGetAllGeneric } from 'hooks/useUserGetAllProtected';
import { DeleteSeveral, endpoint } from 'httpRequests';
import { useAppState } from "stores";
import SearchBar from 'components/Layouts/MainLayout/components/topBar/components/SearchBar';
import { useEffect, useState } from 'react';
import { useSearchOne } from 'hooks/useSearchOne';
// import { testooo } from 'functions/decodePatternFromBackend';
import { useGetAllGeneric } from 'hooks/useGetAllGeneric';



// const rows = [
/* createData('Cupcake', 305, 3.7, 67, 4.3),
createData('Donut', 452, 25.0, 51, 4.9),
createData('Eclair', 262, 16.0, 24, 6.0),
createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
createData('Gingerbread', 356, 16.0, 49, 3.9),
createData('Honeycomb', 408, 3.2, 87, 6.5),
createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
createData('Jelly Bean', 375, 0.0, 94, 0.0),
createData('KitKat', 518, 26.0, 65, 7.0),
createData('Lollipop', 392, 0.2, 98, 0.0),
createData('Marshmallow', 318, 0, 81, 2.0),
createData('Nougat', 360, 19.0, 9, 37.0),
createData('Oreo', 437, 18.0, 63, 4.0), */
// ];
const requestParamKey = "userName";

// let counter = 0;

export default function EnhancedTable() {
  // const rowsAll = [];
  // const rowsByName = [];

  const [rows, setRows] = useState([]);
  const [getAllAgain, setGetAllAgain] = useState(true);
  const [getByNameAgain, setGetByNameAgain] = useState(false);
  const [debouncedValue, setDebouncedValue] = useState("");
  const [sourceUsed, setSourceUsed] = useState("");
  const { data, loading } = useGetAllGeneric(endpoint.usuarios.usuariosAll, getAllAgain);
  const { usuariosByName, loadingUsuariosByName } = useSearchOne(requestParamKey, debouncedValue, endpoint.usuarios.usuariosByName, getByNameAgain);
  // console.log('ssssssss '+counter++);

  const setDataState = (users) => {
    const rowsTemp = [];
    if (users !== null) {
      users.forEach(data => {
        // console.log(data)
        const rolesNames = data.roles.map((rol,index)=>{ 
          if(index!==data.roles.length-1)
           return (rol.nombre + ', ')
          else
        return rol.nombre
      })
        rowsTemp.push({
          id: data.id,
          nombre: data.nombre,
          apellidos: data.apellidos,
          // grupoEtario: data.grupoEtarioNombre,
          ci: data.ci,
          escolaridad: data.escolaridadNombre,
          roles: rolesNames ? rolesNames : '-',
        })
      });
    }
    setRows(rowsTemp);
    setIdsList([]);
  }

  useEffect(() => {
    setSourceUsed("All");
    if(data)
    setDataState(data)
  }, [data/* , loading */])

  useEffect(() => {
    setSourceUsed("By Name");
    setDataState(usuariosByName)
  }, [usuariosByName, loadingUsuariosByName])

  const handleShowUsersByName = (debVal) => {
    setSelected([]);
    if (debVal !== debouncedValue)
      setDebouncedValue(debVal);
    else
      setGetByNameAgain(!getByNameAgain);
  }

  const handleShowAllUsers = () => { setSelected([]); setGetAllAgain(!getAllAgain) }

  const [idsList, setIdsList] = useState([]);

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('nombre');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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
    const selectedIndex = selected.indexOf(name.toString());
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name.toString());
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
  const deleteHandler = async () => {
    console.log('idsList')
    console.log(idsList)
    await DeleteSeveral(idsList, endpoint.usuarios.usuariosDeleteSeveral)
    setSelected([]);
    setIdsList([]);
    // console.log('ZZZZZZZZZZZZZZZZZZZZZZ ' + sourceUsed)
    if (sourceUsed === "All")
      setGetAllAgain(!getAllAgain);
    else
      setGetByNameAgain(!getByNameAgain);
  }

  /* useEffect(() => {
    if (selected.length ===0)

  }, [selected]) */
  
  //testooo();
  return (
    <Box sx={{ width: '80%', minWidth: '1000px' }}>
      <SearchBar onResponseUsersByName={handleShowUsersByName} onRefresh={handleShowAllUsers} />
      {loading || loadingUsuariosByName ?
        <h3>Cargando...</h3> :
        rows.length > 0 ?
          <>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <EnhancedTableToolbar numSelected={selected.length} onDelete={deleteHandler}/* idsList={} */ />
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
                  <TableBody>
                    {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
                    {stableSort(rows, getComparator(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => {
                        const isItemSelected = isSelected(row.nombre);
                        const labelId = `enhanced-table-checkbox-${index}`;
                        return (
                          <TableRow
                            hover
                            onClick={(event) => handleClick(event, row.nombre, row.ci)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.nombre}
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
                              component="th"
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
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
              labelRowsPerPage="Filas por página: "
                rowsPerPageOptions={[5, 10, 25]}
                labelDisplayedRows={({ from, to, count }) =>{
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
          </> :
          <h3>No se encontraron usuarios</h3>}
    </Box>
  );
}
