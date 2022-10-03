import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SelectedComponent } from '../interfaces/selectedComponent';

/* const initialState: CompanyState = {
  currentCompany: null,
}; */

const initialState:SelectedComponent = {value: 1};

const selectedComponentSlice = createSlice({
  name: 'selectedComponent',
  initialState,
  reducers: {
    setSelectedComponent(state, action: PayloadAction<Partial<SelectedComponent>>) {
      Object.assign(state, action.payload);
    },
  },
});

export const { setSelectedComponent } = selectedComponentSlice.actions;

export default selectedComponentSlice.reducer;
