import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function SelectTest({data,onTestSelected}) {
  const [test, setTest] = React.useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setTest(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: '350px', backgroundColor:'white' }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label"></InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={test}
          label=""
          onChange={handleChange}
        >
          {data &&
          data.map((prueba)=>
            <MenuItem 
            value={prueba.nombre}
            onClick={()=>onTestSelected(prueba.nombre)}
            >{prueba.nombre}</MenuItem>
          )}
          
        </Select>
      </FormControl>
    </Box>
  );
}
