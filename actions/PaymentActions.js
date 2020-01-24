import { VIEW_PAYMENT, CREATE_PAYMENT } from './types';

export const viewPayment = payment => {
  return {
    type: VIEW_PAYMENT,
    payload: payment
  };
};

export const createPayment = payment => {
  return {
    type: CREATE_PAYMENT,
    payload: payment
  };
};
