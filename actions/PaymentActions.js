import firebase from 'firebase';
import { VIEW_PAYMENT, CREATE_PAYMENT, RETRIEVE_PAYMENTS } from './types';

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
