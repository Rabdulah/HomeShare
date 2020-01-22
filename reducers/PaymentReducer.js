import { VIEW_PAYMENT } from '../actions/types';

const INITIAL_STATE = {
  currentPayment: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case VIEW_PAYMENT:
      return { ...state, currentPayment: action.payload };
    default:
      return state;
  }
};
