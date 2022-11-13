import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SubTopMenuElements } from '../interfaces/subTopMenuElements';

/* const initialState: CompanyState = {
  currentCompany: null,
}; */

const initialState:SubTopMenuElements = {elements: null};

const subTopMenuElementsSlice = createSlice({
  name: 'subTopMenuElements',
  initialState,
  reducers: {
    setSubTopMenuElements(state, action: PayloadAction<Partial<SubTopMenuElements>>) {
      Object.assign(state, action.payload);
    },
  },
});

export const { setSubTopMenuElements } = subTopMenuElementsSlice.actions;

export default subTopMenuElementsSlice.reducer;
