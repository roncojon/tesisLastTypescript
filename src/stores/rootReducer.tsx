import { combineReducers } from '@reduxjs/toolkit';
// import globalReducer from './global.store';
import selectedComponentReducer from './selectedComponent.store';
import subTopMenuElementsReducer from './subTopMenuElements.store';
import authenticationInfoReducer from './authenticationState.store';

const rootReducer = combineReducers({
  // global: globalReducer,
  authenticationInfo: authenticationInfoReducer,
  selectedComponent: selectedComponentReducer,
  subTopMenuElements: subTopMenuElementsReducer
});

export default rootReducer;
