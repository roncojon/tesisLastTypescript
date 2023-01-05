import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useEffect } from 'react';

interface SelectTestProps {
  data: any,
  onTestSelected: any,
  defaultValue?: any
}

export default function SelectTest({ data, onTestSelected, defaultValue }:SelectTestProps) {
  const [test, setTest] = React.useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setTest(event.target.value as string);
  };

  useEffect(() => {
    if (defaultValue) {
      if (defaultValue.nombre) {
        setTest(defaultValue.nombre);
        onTestSelected(defaultValue.uId)
      }
    }
  }, [defaultValue])

  return (
    <Box sx={{ minWidth: '350px', backgroundColor: 'white' }}>
      {data && data !== "Err" &&
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label"></InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={test}
            label=""
            onChange={handleChange}
          >
            {data && data !== "Err" &&
              data.map((prueba) =>
                <MenuItem
                  value={prueba.nombre}
                  onClick={() => onTestSelected(prueba)}
                >{prueba.nombre}</MenuItem>
              )}

          </Select>
        </FormControl>
      }
    </Box>
  );
}
