/*
  reducer = a function that returns some data
*/
import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';

// requried to have minimum 1 reducer that returns NOT undefined.
export default combineReducers({
  auth: AuthReducer
});