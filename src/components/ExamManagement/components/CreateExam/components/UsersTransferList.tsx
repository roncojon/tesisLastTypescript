import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { Box, Tooltip } from '@mui/material';
import { Data, Order, stableSort, getComparator } from '../../../../../commons/Commons';
import { useEffect } from 'react';

function not(a: readonly number[], b: readonly number[]) {
  // return a.filter((value) => b.indexOf(value) === -1);
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: readonly number[], b: readonly number[]) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

interface Rol {
  uId: string,
  nombre: string
}

interface User {
  ci: string,
  nombre: string,
  apellidos: string,
  userName: string,
  password: string,
  sexoNombre: string,
  edad: number,
  roles: Rol[],
  grupoEtarioNombre: string,
  escolaridadNombre: string
}

interface UsersTransferListProps {
  users,
  loadingUsers,
  onUsuariosAsignados,
  assignedUsers?,
  defaultValue?
}

export default function UsersTransferList({ users, loadingUsers, onUsuariosAsignados, assignedUsers, defaultValue }: UsersTransferListProps) {
  const [checked, setChecked] = React.useState([]);

  const [left, setLeft] = React.useState(users);
  const [right, setRight] = React.useState([]);

  React.useEffect(() => {
    const userIdsList = right.map((u) => u.ci);
    console.log('userIdsList')
    console.log(userIdsList)
    onUsuariosAsignados(userIdsList);
  }, [right])

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value/* : number */) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  useEffect(() => {
    // The defaultValue is an array of users saved in db, the users have escolaridadId, not escolaridadName, etc
    // Thats why i need to find that user according to his ci, in my users "data", where they have the info
    // needed to compare them, when im seeing if a defaultValue-user exist in "data", a function compares them,
    // but if they dont have same all props same all values, the function never finds the user from defaultValue in "data"
    // so i first find the users in data with same ci that users in defaultValue and problem solved
    if (defaultValue) {
      const defaultAssignedUsers = [];
      defaultValue.forEach((preAssignedUser) => {
        left.forEach((actuallyAssignedUser) =>{ 
          if(actuallyAssignedUser.ci === preAssignedUser.ci)
          defaultAssignedUsers.push(actuallyAssignedUser)
        })
      })
      setRight(right.concat(defaultAssignedUsers));
      setLeft(not(left, defaultAssignedUsers));
      setChecked(not(checked, defaultAssignedUsers));
    }
  }, [defaultValue])

 /*  console.log("left")
  console.log(left)

  console.log("right")
  console.log(right.length) */

  // ORDER
  const [orderBy, setOrderBy] = React.useState<keyof User>('nombre');
  const [order, setOrder] = React.useState<Order>('asc');

  /*  stableSort(items, getComparator(order, orderBy))
   .map((row, index) => {}) */

  const customList = (items, title/* : readonly number[] */) => (
    <Paper sx={{ width: { xs: '220px', sm: '350px', xl: '600px' }, height: '400px'/* minHeight: '430px',maxHeight:'430px' */, overflow: 'auto' }}>
      {users &&
        <>
          <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: '15px' }}>{title}</Box>
          <List dense component="div" role="list">
            {stableSort(items, getComparator(order, orderBy))
              .map((item, index/* value: number */) => {
                const labelId = `transfer-list-item-${index}-label`;

                return (
                  <Tooltip disableInteractive title={`CI: ${item.ci} | Edad: ${item.edad} | Escolaridad: ${item.escolaridadNombre}  `}>
                    <ListItem
                      key={index}
                      role="listitem"
                      button
                      onClick={handleToggle(item)}
                    >
                      <ListItemIcon>
                        <Checkbox
                          checked={checked.indexOf(item) !== -1}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText id={labelId} primary={`${item.nombre} ${item.apellidos}`} />   {/* ${index + 1} */}
                    </ListItem>
                  </Tooltip>
                );
              })}
            <ListItem />
          </List>
        </>}
    </Paper>
  );

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      {users && users !== "Err" && <>
        <Grid item>{customList(left, "Usuarios no asignados")}</Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleAllRight}
              disabled={left.length === 0}
              aria-label="move all right"
            >
              ≫
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleCheckedRight}
              disabled={leftChecked.length === 0}
              aria-label="move selected right"
            >
              &gt;
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0}
              aria-label="move selected left"
            >
              &lt;
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleAllLeft}
              disabled={right.length === 0}
              aria-label="move all left"
            >
              ≪
            </Button>
          </Grid>
        </Grid>
        <Grid item>{customList(right, "Usuarios asignados")}</Grid>
      </>}
    </Grid>
  );
}