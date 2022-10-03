import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IsAuthenticated } from 'interfaces/isAuthenticated';


/* const initialState: CompanyState = {
  currentCompany: null,
}; */

const initialState:IsAuthenticated = {value: false};

const isAuthenticatedSlice = createSlice({
  name: 'selectedComponent',
  initialState,
  reducers: {
    setIsAuthenticated(state, action: PayloadAction<Partial<IsAuthenticated>>) {
      Object.assign(state, action.payload);
    },
  },
});

export const { setIsAuthenticated } = isAuthenticatedSlice.actions;

export default isAuthenticatedSlice.reducer;