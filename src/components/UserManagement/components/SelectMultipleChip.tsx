import * as React from 'react';
// import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import useTheme from '@mui/material/styles/useTheme';
import { Theme } from '@mui/material';
// import { Theme } from '@mui/material/styles';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

/* function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
} */

export default function MultipleSelectChip({title,list,onSelected}) {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    onSelected(
      typeof value === 'string' ? value.split(',') : value,
    )
  };
  const menuList =()=>{return list.map((el)=>{return(<MenuItem value={el.uId}>{el.nombre}</MenuItem>)})}

console.log('list')
console.log(list)

const showLabel = (val:string)=>{
  const actualRolObject = list.filter(rol=>{return rol.uId===val});
  console.log('actualRolObject')
  console.log(actualRolObject)

  console.log('actualRolObject.nombre')
  console.log(actualRolObject.nombre)

  return actualRolObject[0].nombre
}
  return (
    <div>
      <FormControl sx={{ m: 1, width: '275px' }} required>
        <InputLabel id="demo-multiple-chip-label">{title}</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip 
                key={value} 
                label={showLabel(value)} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {menuList()}
        </Select>
      </FormControl>
    </div>
  );
}