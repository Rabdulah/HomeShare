/*
  reducer = a function that returns some data
*/
import { combineReducers } from 'redux';

// requried to have minimum 1 reducer that returns NOT undefined.
export default combineReducers({
  auth: () => { return {} }
});