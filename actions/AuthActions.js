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
  GROUP_ADDED_SUCCESS,
  GROUP_ADD_FAILED,
  REMOVE_FROM_GROUP,
  INVITATION_EMAIL_CHANGED,
  SEND_INVITE,
  SEND_INVITE_SUCCESS,
  SEND_INVITE_FAILED,
  GET_INVITES,
  ACCEPT_INVITE,
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

export const inviteEmailChanged = text => {
  return {
    type: INVITATION_EMAIL_CHANGED,
    payload: text
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
      console.log(error.code);
      switch (error.code) {
        case 'auth/user-not-found':
          error.message =
            'There is no user with this email and password combination.';
          break;
        case 'auth/wrong-password':
          error.message =
            'There is no user with this email and password combination.';
          break;
        default:
      }
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
    dispatch({ type: GROUP_ADDED });

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
      dispatch({ type: GROUP_ADDED_SUCCESS, payload });
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

export const sendInvite = ({ group, inviteEmail }) => {
  return async dispatch => {
    dispatch({ type: SEND_INVITE });
    try {
      let user = null;
      await firebase
        .firestore()
        .collection('users')
        .where('email', '==', inviteEmail)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            user = doc.id;
          });
        });

      if (user) {
        const invite = {
          group
        };

        await firebase
          .firestore()
          .collection('users')
          .doc(user)
          .update({
            pendingInvites: firebase.firestore.FieldValue.arrayUnion(invite)
          });
        dispatch({ type: SEND_INVITE_SUCCESS });
      } else {
        dispatch({
          type: SEND_INVITE_FAILED,
          payload: 'No user with this email exists.'
        });
      }
    } catch (error) {
      dispatch({
        type: SEND_INVITE_FAILED,
        payload: 'No user with this email exists.'
      });
    }
  };
};

export const getInvites = pendingInvites => {
  return async dispatch => {
    try {
      const invitePayload = [];
      const groupRefs = pendingInvites.map(async invite => {
        return invite.group.get();
      });
      const groupData = await Promise.all(groupRefs);
      groupData.forEach(invite => {
        let obj = invite.data();
        obj.id = invite.id;
        obj.ref = invite.ref;
        invitePayload.push(obj);
      });

      dispatch({ type: GET_INVITES, payload: invitePayload });
    } catch (error) {
      console.log(error);
    }
  };
};

export const acceptInvite = groupRef => {
  return async (dispatch, getState) => {
    try {
      await firebase
        .firestore()
        .collection('users')
        .doc(getState().auth.user)
        .update({
          pendingInvites: firebase.firestore.FieldValue.arrayRemove({
            group: groupRef
          }),
          inGroup: true,
          group: groupRef
        });
      const groupInfo = await groupRef.get().then(snapshot => snapshot.data());
      const payload = {
        groupRef,
        groupInfo
      };
      dispatch({ type: ACCEPT_INVITE, payload });
    } catch (error) {
      console.log(error);
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
      // The original error for user-not-found was a little inaccurate in our case.
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
