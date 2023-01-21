import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthenticationStateObject } from 'commons/storeTypes/authenticationStateObject';


/* const initialState: CompanyState = {
  currentCompany: null,
}; */

const initialState:AuthenticationStateObject = {isAuthenticated: false, accessToken: null ,userRol:null , userId:null};

const authenticationSlice = createSlice({
  name: 'selectedComponent',
  initialState,
  reducers: {
    setAuthenticationInfo(state, action: PayloadAction<Partial<AuthenticationStateObject>>) {
      Object.assign(state, action.payload);
    },
  },
});

export const { setAuthenticationInfo } = authenticationSlice.actions;

export default authenticationSlice.reducer;