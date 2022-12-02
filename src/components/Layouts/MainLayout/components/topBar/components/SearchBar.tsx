import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SearchIcon from '@mui/icons-material/Search';
import useDebounce from 'hooks/useDebounce';
import { useSearchOne } from 'hooks/useSearchOne';
import CachedIcon from '@mui/icons-material/Cached';
import { useEffect,useState } from 'react';
import { endpoint } from 'httpRequests';

export default function SearchBar({onResponseUsersByName,onRefresh}) {

const [value, setValue] = useState('');
const debouncedValue = useDebounce(value, 500);

useEffect(() => {
    onResponseUsersByName(debouncedValue)

}, [debouncedValue])


const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <FormControl sx={{ mb: 1, width: '300px', backgroundColor:'white' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Buscar por nombre y/o apellidos</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type='text'
            value={value}
            onChange={handleChange}
            
            endAdornment={
              <InputAdornment position="end" disablePointerEvents={value.length < 4}>
                {value.length > 3 
                ?
                <Button sx={{minHeight:0, minWidth:0}} onClick={()=>{setValue("");onRefresh()}}>
                <CachedIcon/>
                </Button>
                :
                <Button sx={{minHeight:0, minWidth:0}}>
                <SearchIcon/>
                </Button>
                }
              </InputAdornment>
            }
            label="Buscar por nombre y/o apellidos"
          />
        </FormControl>
  );
}
