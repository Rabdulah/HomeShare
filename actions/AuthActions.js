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
  SIGNUP_USER,
  SIGNUP_USER_FAIL,
  SIGNUP_USER_SUCCESS,
  GET_USER_GROUP,
  CLEAR_ERRORS,
  GET_ALL_USERS_IN_GROUP,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL
} from './types';

export const getUserGroup = userId => {
  return async dispatch => {
    try {
      const response = await firebase
        .firestore()
        .collection('users')
        .doc(userId)
        .get()
        .then(doc => {
          return doc.data().group;
        });

      // get all users in a group too
      const users = [];
      await firebase
        .firestore()
        .collection('users')
        .where('group', '==', response)
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            const { email, name, username } = doc.data();
            users.push({ email, name, username, id: doc.id });
          });
        });

      dispatch({ type: GET_ALL_USERS_IN_GROUP, payload: users });
      dispatch({ type: GET_USER_GROUP, payload: response });
    } catch (error) {
      console.log(error);
      // TODO: Handle case where user is not in a group yet
    }
  };
};

const insertNewUser = async (firstName, lastName, username, email, uid) => {
  firebase
    .firestore()
    .collection('users')
    .doc(uid)
    .set({
      email,
      username,
      name: {
        firstName,
        lastName
      }
    });
};

export const emailChanged = text => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = text => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const fnameChanged = text => {
  return {
    type: FNAME_CHANGED,
    payload: text
  };
};

export const lnameChanged = text => {
  return {
    type: LNAME_CHANGED,
    payload: text
  };
};

export const usernameChanged = text => {
  return {
    type: USERNAME_CHANGED,
    payload: text
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

export const loginUser = ({ email, password }) => {
  // async req
  return async dispatch => {
    // dispatch login_user for "user loading" part (starts the spinner)
    dispatch({ type: LOGIN_USER });

    try {
      const response = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      const userSnapshot = await firebase
        .firestore()
        .collection('users')
        .doc(response.user.uid)
        .get();

      const user = userSnapshot.data();
      const groupSnapshot = await user.group.get(); // TODO: We need to fix this. causes bugs for firsttime sign up
      const group = groupSnapshot.data(); // TODO: We need to fix this. causes bugs for firsttime sign up

      const userPayload = {
        email: user.email,
        firstName: user.name.firstName,
        lastName: user.name.lastName,
        username: user.username,
        user: response.user.uid,
        groupInfo: group // TODO: We need to fix this. causes bugs for firsttime sign up
      };
      dispatch({ type: LOGIN_USER_SUCCESS, payload: userPayload });
    } catch (error) {
      console.log(error);
      dispatch({ type: LOGIN_USER_FAIL, payload: error });
    }
  };
};

export const signupUser = ({
  firstName,
  lastName,
  username,
  email,
  password
}) => {
  return async dispatch => {
    dispatch({ type: SIGNUP_USER });

    try {
      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      insertNewUser(firstName, lastName, username, email, response.user.uid);
      dispatch({ type: SIGNUP_USER_SUCCESS, payload: response.user.uid });
    } catch (error) {
      console.log(error);
      dispatch({ type: SIGNUP_USER_FAIL, payload: error });
    }
  };
};

export const resetPassword = ({ email }) => {
  return async dispatch => {
    dispatch({ type: RESET_PASSWORD });

    try {
      await firebase.auth().sendPasswordResetEmail(email);
      dispatch({ type: RESET_PASSWORD_SUCCESS });
    } catch (error) {
      // Firebase error can be broken into the error.code and error.message.
      // Default error.message is usually fine, but some of them may need to be modified a bit.
      // This case statement allows for a custom error message for a specific error code.
      // The original error for user-not-found was a little in accurate in our case.
      switch (error.code) {
        case 'auth/user-not-found':
          error.message = 'There is no user with this email.';
          break;
        default:
      }
      dispatch({ type: RESET_PASSWORD_FAIL, payload: error });
    }
  };
};
