import firebase from 'firebase';
import {
  VIEW_PAYMENT,
  CREATE_PAYMENT,
  RETRIEVE_PAYMENTS,
  GET_CURRENT_PAYMENT
} from './types';

export const viewPayment = payment => {
  return {
    type: VIEW_PAYMENT,
    payload: payment
  };
};

export const retrievePayments = payments => {
  return {
    type: RETRIEVE_PAYMENTS,
    payload: payments
  };
};

export const getCurrentPayment = currentPaymentId => {
  return async dispatch => {
    try {
      const paymentDocumentFromDb = await firebase
        .firestore()
        .collection('payments')
        .doc(currentPaymentId)
        .get()
        .then(snapshot => {
          const { cost, date, name, owner, payees } = snapshot.data();
          return { cost, date, name, owner, payees, id: snapshot.id };
        });

      dispatch({ type: GET_CURRENT_PAYMENT, payload: paymentDocumentFromDb });
    } catch (error) {
      console.log('error getting current payment', error);
    }
  };
};
