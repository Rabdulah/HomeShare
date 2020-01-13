import firebase from 'firebase';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  FNAME_CHANGED,
  LNAME_CHANGED,
  USERNAME_CHANGED,
} from './types';

export const emailChanged = text => {
  return {
    type: EMAIL_CHANGED,
    payload: text,
  };
};

export const passwordChanged = text => {
  return {
    type: PASSWORD_CHANGED,
    payload: text,
  };
};

export const fnameChanged = text => {
  return {
    type: FNAME_CHANGED,
    payload: text,
  };
};

export const lNameChanged = text => {
  return {
    type: LNAME_CHANGED,
    payload: text,
  };
};

export const usernameChanged = text => {
  return {
    type: USERNAME_CHANGED,
    payload: text,
  };
};

export const loginUser = ({ email, password }) => {
  // async req
  return async dispatch => {
    // dispatch login_user for "user loading" part (starts the spinner)
    dispatch({ type: LOGIN_USER });

    try {
      const user = await firebase.auth().signInWithEmailAndPassword(email, password);

      dispatch({ type: LOGIN_USER_SUCCESS, payload: user });
    } catch (error) {
      console.log(error);
      dispatch({ type: LOGIN_USER_FAIL });
    }
  };
};
