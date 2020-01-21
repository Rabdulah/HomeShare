import { VIEW_PAYMENT } from './types';

export const viewPayment = payment => {
  return {
    type: VIEW_PAYMENT,
    payload: payment
  };
};
