import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

interface RadioGroupForTestPatternProps { 
  onPatternSelected: any,
   defaultValue?: boolean
  }

export default function RadioGroupForTestPattern({ onPatternSelected, defaultValue }) {

React.useEffect(() => {
  if(defaultValue!==null && defaultValue!==undefined)
  onPatternSelected(defaultValue)
}, [defaultValue])

  return (
    <FormControl>
      <h3 id="demo-radio-buttons-group-label">Patrón de examen</h3>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
       defaultValue={(defaultValue!==null && defaultValue!==undefined) ? (defaultValue===true ? true : false) : true}
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