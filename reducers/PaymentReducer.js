import { VIEW_PAYMENT, CREATE_PAYMENT } from '../actions/types';

const INITIAL_STATE = {
  currentPayment: null,
  payments: [
    {
      _id: 0,
      cost: 30,
      name: 'Internet',
      payees: [
        {
          amount: 10,
          isPaid: false,
          user: 'matt'
        },
        {
          amount: 10,
          isPaid: false,
          user: 'spencer'
        }
      ]
    },
    {
      _id: 1,
      cost: 36,
      name: 'Furnace',
      payees: [
        {
          amount: 10,
          isPaid: false,
          user: 'spencer'
        },
        {
          amount: 10,
          isPaid: false,
          user: 'ramzi'
        }
      ]
    },
    {
      _id: 2,
      cost: 18,
      name: 'Hydro',
      payees: [
        {
          amount: 10,
          isPaid: false,
          user: 'matt'
        },
        {
          amount: 10,
          isPaid: false,
          user: 'ramzi'
        }
      ]
    },
    {
      _id: 3,
      cost: 21,
      name: 'Random',
      payees: [
        {
          amount: 10,
          isPaid: false,
          user: 'matt'
        },
        {
          amount: 10,
          isPaid: false,
          user: 'ramzi'
        }
      ]
    }
  ]
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
    default:
      return state;
  }
};
