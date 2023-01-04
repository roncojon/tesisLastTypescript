import { combineReducers } from '@reduxjs/toolkit';
// import globalReducer from './global.store';
import authenticationInfoReducer from './authenticationState.store';

const rootReducer = combineReducers({
  // global: globalReducer,
  authenticationInfo: authenticationInfoReducer,
});

export default rootReducer;
