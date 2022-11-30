import * as React from 'react';
// import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {es} from 'date-fns/locale'
import { useEffect } from 'react';

export default function ExamDateTimePicker({onDateSelected}) {
  const [value, setValue] = React.useState(new Date()/* dayjs('2022-04-07') */);
console.log('FECHAAAAAAAAAAA');
console.log(value.getTime());

useEffect(() => {
  onDateSelected(value.getTime());
}, [value])


  return (
    <LocalizationProvider locale={es} dateAdapter={AdapterDateFns}>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label="Fecha"
        value={value}
        ampm={true}
        onChange={(newValue) => {
          setValue(newValue);
        }}
      />
    </LocalizationProvider>
  );
}
/* import React from 'react'

export const ExamDatePicker = () => {
  return (
    <div>ExamDatePicker</div>
  )
} */
