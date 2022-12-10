import { Box, Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import { Data, Order } from "./Commons";
import { visuallyHidden } from '@mui/utils';


interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
  }
  
  const headCells: readonly HeadCell[] = [
    {
      id: 'nombre',
      numeric: false,
      disablePadding: true,
      label: 'Nombre',
    },
    {
      id: 'apellidos',
      numeric: true,
      disablePadding: false,
      label: 'Apellidos',
    },
    {
      id: 'ci',
      numeric: true,
      disablePadding: false,
      label: 'Carnet de Identidad',
    },
    {
      id: 'escolaridad',
      numeric: true,
      disablePadding: false,
      label: 'Escolaridad',
    },
    {
      id: 'roles',
      numeric: true,
      disablePadding: false,
      label: 'Roles',
    },
    
    
  ];

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
  }
  
  export function EnhancedTableHead(props: EnhancedTableProps) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
      props;
    const createSortHandler =
      (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
      };
  
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            {/* <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
            /> */}
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }