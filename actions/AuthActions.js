import firebase from 'firebase';
import { 
  EMAIL_CHANGED, 
  PASSWORD_CHANGED, 
  LOGIN_USER_SUCCESS
} from './types';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  }
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  }
};

export const loginUser = ({ email, password }) => {
  // async req
  return async (dispatch) => {
    let user = await firebase.auth().signInWithEmailAndPassword(email, password);
  
    dispatch({ type: LOGIN_USER_SUCCESS, payload: user })
  }
}

