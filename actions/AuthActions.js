import firebase from 'firebase';
import geoSearch from '../server/location/locationFunction';
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
  GROUP_ADDRESS_CHANGED,
  GROUP_NAME_CHANGED,
  GROUP_ADDED,
  GROUP_ADD_FAILED,
  REMOVE_FROM_GROUP
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
      inGroup: false,
      name: {
        firstName,
        lastName
      }
    });
};

const updateUserGroupData = (groupRef, user) => {
  firebase
    .firestore()
    .collection('users')
    .doc(user)
    .update({
      inGroup: true,
      group: groupRef
    });
};

const removeUserFromGroup = user => {
  firebase
    .firestore()
    .collection('users')
    .doc(user)
    .update({
      inGroup: false,
      group: null
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
export const groupAddressChanged = text => {
  return {
    type: GROUP_ADDRESS_CHANGED,
    payload: text
  };
};
export const groupNameChanged = text => {
  return {
    type: GROUP_NAME_CHANGED,
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

      var userPayload = {
        email: user.email,
        firstName: user.name.firstName,
        lastName: user.name.lastName,
        username: user.username,
        user: response.user.uid,
        inGroup: user.inGroup
      };
      if (user.inGroup) {
        const groupSnapshot = await user.group.get();
        const group = groupSnapshot.data();
        userPayload = { ...userPayload, groupInfo: group };
      }
      dispatch({ type: LOGIN_USER_SUCCESS, payload: userPayload });
    } catch (error) {
      console.log(error);
      dispatch({ type: LOGIN_USER_FAIL });
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

      const userPayload = {
        firstName,
        lastName,
        username,
        email,
        user: response.user.uid
      };

      dispatch({ type: SIGNUP_USER_SUCCESS, payload: userPayload });
    } catch (error) {
      console.log(error);
      dispatch({ type: SIGNUP_USER_FAIL, payload: error });
    }
  };
};

export const addGroup = ({ name, address }) => {
  return async (dispatch, getState) => {
    try {
      let location = await geoSearch(address);
      location = new firebase.firestore.GeoPoint(location.lat, location.lon);
      const response = await firebase
        .firestore()
        .collection('groups')
        .add({ name, address, location });

      const user = getState().auth.user;
      updateUserGroupData(response, user);

      let data = await response.get();
      data = data.data();

      const payload = {
        response,
        data
      };
      dispatch({ type: GROUP_ADDED, payload });
    } catch (error) {
      console.log(error);
      dispatch({
        type: GROUP_ADD_FAILED,
        payload: 'Address does not exist.'
      });
    }
  };
};

export const leaveGroup = () => {
  return async (dispatch, getState) => {
    try {
      removeUserFromGroup(getState().auth.user);
      dispatch({ type: REMOVE_FROM_GROUP });
    } catch (error) {
      console.log(error);
    }
  };
};
