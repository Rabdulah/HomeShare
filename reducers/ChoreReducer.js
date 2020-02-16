import { RETRIEVE_CHORES, VIEW_CHORE } from '../actions/types';

const INITIAL_STATE = {
  chores: null,
  currentChore: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RETRIEVE_CHORES:
      return { ...state, chores: action.payload };
    case VIEW_CHORE:
      return { ...state, currentChore: action.payload };
    default:
      return state;
  }
};
