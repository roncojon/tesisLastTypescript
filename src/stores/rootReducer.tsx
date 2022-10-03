import { combineReducers } from '@reduxjs/toolkit';
// import globalReducer from './global.store';
import selectedComponentReducer from './selectedComponent.store';
import isAuthenticatedReducer from './isAuthenticated.store';

const rootReducer = combineReducers({
  // global: globalReducer,
  isAuthenticated: isAuthenticatedReducer,
  selectedComponent: selectedComponentReducer
});

export default rootReducer;
