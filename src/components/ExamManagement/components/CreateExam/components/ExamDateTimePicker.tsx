import * as React from 'react';
// import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {es} from 'date-fns/locale'
import { useEffect } from 'react';

interface ExamDateTimePickerProps {
  onDateSelected:any,
   defaultValue?:number
  }

export default function ExamDateTimePicker({onDateSelected, defaultValue}:ExamDateTimePickerProps) {
  const [value, setValue] = React.useState(new Date()/* dayjs('2022-04-07') */);
/* console.log('FECHAAAAAAAAAAA');
console.log(value.getTime());
 */
useEffect(() => {
  onDateSelected(value.getTime());
}, [value])

useEffect(() => {
  if(defaultValue)
  setValue(new Date(defaultValue));
}, [defaultValue])

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
