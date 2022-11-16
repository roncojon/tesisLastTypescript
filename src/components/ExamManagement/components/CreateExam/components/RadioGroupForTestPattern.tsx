import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RadioGroupForTestPattern({ onPatternSelected }) {
  return (
    <FormControl>
      <h3 id="demo-radio-buttons-group-label">Patrón a usar en el examen</h3>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue={true}
        name="radio-buttons-group"
      >
        <FormControlLabel
          value={true}
          control={<Radio />}
          label="Patrón original" 
          onClick={()=>onPatternSelected(true)}
          />
        <FormControlLabel
          value={false}
          control={<Radio />}
          label="Patrón aleatorio"
          onClick={()=>onPatternSelected(false)}
          />
      </RadioGroup>
    </FormControl>
  );
}