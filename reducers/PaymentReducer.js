import {
  VIEW_PAYMENT,
  CREATE_PAYMENT,
  RETRIEVE_PAYMENTS
} from '../actions/types';

const INITIAL_STATE = {
  currentPayment: null,
  payments: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case VIEW_PAYMENT:
      return { ...state, currentPayment: action.payload };
    case CREATE_PAYMENT:
      // get shallow copy from state
      const clonedPayments = [...state.payments];

      const payment = action.payload;
      payment._id = clonedPayments.length;
      clonedPayments.push(payment);
      return { ...state, payments: clonedPayments };
    case RETRIEVE_PAYMENTS:
      return { ...state, payments: action.payload };
    default:
      return state;
  }
};
