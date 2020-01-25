import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  FNAME_CHANGED,
  LNAME_CHANGED,
  USERNAME_CHANGED,
  SIGNUP_USER,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAIL,
  GET_USER_GROUP,
  CLEAR_ERRORS,
  GET_ALL_USERS_IN_GROUP
} from '../actions/types';

const INITIAL_STATE = {
  email: 'matt@uwo.ca',
  password: 'password',
  user: null,
  errorLogin: '',
  errorSignUp: '',
  loading: false,
  firstName: '',
  lastName: '',
  username: '',
  group: '',
  groupInfo: null,
  allUsersInGroup: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FNAME_CHANGED:
      return { ...state, firstName: action.payload };
    case LNAME_CHANGED:
      return { ...state, lastName: action.payload };
    case USERNAME_CHANGED:
      return { ...state, username: action.payload };
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case SIGNUP_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      // add the new user model to our application state
      return { ...state, ...INITIAL_STATE, ...action.payload };
    case SIGNUP_USER_SUCCESS:
      // add the new user model to our application state
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case LOGIN_USER_FAIL:
      return { ...state, errorLogin: 'Authentication Failed.', loading: false };
    case SIGNUP_USER_FAIL:
      return { ...state, errorSignUp: action.payload.message, loading: false };
    case GET_USER_GROUP:
      return { ...state, group: action.payload };
    case CLEAR_ERRORS:
      return { ...state, errorLogin: '', errorSignUp: '' };
    case GET_ALL_USERS_IN_GROUP:
      return { ...state, allUsersInGroup: action.payload };
    default:
      return state;
  }
};
