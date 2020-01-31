import {
  VIEW_PAYMENT,
  CREATE_PAYMENT,
  RETRIEVE_PAYMENTS,
  GET_CURRENT_PAYMENT
} from '../actions/types';

const INITIAL_STATE = {
  currentPaymentId: null, // uid of payment document
  currentPayment: null, // actual payment document
  payments: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case VIEW_PAYMENT:
      return { ...state, currentPaymentId: action.payload };
    case CREATE_PAYMENT:
      // get shallow copy from state
      const clonedPayments = [...state.payments];

      const payment = action.payload;
      payment._id = clonedPayments.length;
      clonedPayments.push(payment);
      return { ...state, payments: clonedPayments };
    case RETRIEVE_PAYMENTS:
      return { ...state, currentPayment: null, payments: action.payload };
    case GET_CURRENT_PAYMENT:
      return { ...state, currentPayment: action.payload };
    default:
      return state;
  }
};
