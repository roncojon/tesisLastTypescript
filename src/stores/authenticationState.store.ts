import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthenticationStateObject } from 'interfaces/authenticationStateObject';


/* const initialState: CompanyState = {
  currentCompany: null,
}; */

const initialState:AuthenticationStateObject = {isAuthenticated: false, accessToken: null};

const authenticationSlice = createSlice({
  name: 'selectedComponent',
  initialState,
  reducers: {
    setIsAuthenticated(state, action: PayloadAction<Partial<AuthenticationStateObject>>) {
      Object.assign(state, action.payload);
    },
  },
});

export const { setIsAuthenticated } = authenticationSlice.actions;

export default authenticationSlice.reducer;