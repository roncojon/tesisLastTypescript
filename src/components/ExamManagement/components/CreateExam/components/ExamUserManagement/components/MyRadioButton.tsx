import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


export default function MyRadioButton({options,onSelectOption,userProp}) {
  
  return (
    <FormControl required>
      <FormLabel id="demo-row-radio-buttons-group-label">Sexo</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        {options.map((option)=>
          <FormControlLabel onChange={()=>onSelectOption(option.value,userProp)} value={option.value} control={<Radio />} label={option.label} />
        )}
        {/* <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="other" control={<Radio />} label="Other" /> */}
      </RadioGroup>
    </FormControl>
  );
}
