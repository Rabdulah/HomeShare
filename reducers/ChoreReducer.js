import { RETRIEVE_CHORES } from '../actions/types';

const INITIAL_STATE = {
  chores: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RETRIEVE_CHORES:
      console.log('reducers', action.payload);
      return { ...state, chores: action.payload };
    default:
      return state;
  }
};
