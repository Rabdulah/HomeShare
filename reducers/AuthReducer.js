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
  GET_ALL_USERS_IN_GROUP,
  GROUP_ADDRESS_CHANGED,
  GROUP_NAME_CHANGED,
  GROUP_ADDED,
  GROUP_ADD_FAILED,
  REMOVE_FROM_GROUP
} from '../actions/types';

const INITIAL_STATE = {
  email: 'fakeramzi@uwo.ca',
  password: 'password',
  user: null, // user id assigned from firebase
  errorLogin: '',
  errorSignUp: '',
  errorGroup: '',
  loading: false,
  firstName: '',
  lastName: '',
  username: '',
  group: '', // actual group reference
  groupInfo: null, // group info such as address, etc.
  groupAddress: '1099 western rd', // I think this is unnecessary. Will look at it later.
  groupName: '', // I think this is unnecessary. Will look at it later.
  inGroup: false,
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
      return { ...state, ...INITIAL_STATE, ...action.payload };
    case LOGIN_USER_FAIL:
      return { ...state, errorLogin: 'Authentication Failed.', loading: false };
    case SIGNUP_USER_FAIL:
      return { ...state, errorSignUp: action.payload.message, loading: false };
    case GET_USER_GROUP:
      return { ...state, group: action.payload };
    case CLEAR_ERRORS:
      return { ...state, errorLogin: '', errorSignUp: '', errorGroup: '' };
    case GET_ALL_USERS_IN_GROUP:
      return { ...state, allUsersInGroup: action.payload };
    case GROUP_ADDRESS_CHANGED:
      return { ...state, groupAddress: action.payload };
    case GROUP_NAME_CHANGED:
      return { ...state, groupName: action.payload };
    case GROUP_ADDED:
      return {
        ...state,
        inGroup: true,
        group: action.payload.response,
        groupInfo: action.payload.data
      };
    case GROUP_ADD_FAILED:
      return { ...state, errorGroup: action.payload };
      case REMOVE_FROM_GROUP:
          return { ...state, inGroup: false, group: null, groupInfo: null };
    default:
      return state;
  }
};
