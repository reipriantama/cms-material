import {
    combineReducers,
    configureStore
  } from '@reduxjs/toolkit';
  
  import AuthReducer from './Auth';
  
  const reducers = combineReducers({
    auth: AuthReducer 
  });
  
  const store = configureStore({
    reducer: reducers
  });
  
  export { store };