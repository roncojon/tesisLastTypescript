import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function SelectGeneric({title,list,onSelected}) {
  const [val, setVal] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setVal(event.target.value)
    onSelected(event.target.value);
  };
const menuList =()=>{return list.map((el)=>{return(<MenuItem value={el.uId}>{el.nombre}</MenuItem>)})}
  return (
    <FormControl sx={{ m: 1, minWidth: 120, width:'275px' }} required /* size="small" */>
      <InputLabel id="demo-select-small">{title}</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={val}
        label={title}
        onChange={handleChange}
      >
{menuList()}
        {/* <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem> */}
      </Select>
    </FormControl>
  );
}