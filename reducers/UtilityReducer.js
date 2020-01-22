import { VIEW_UTILITY } from '../actions/types';

const INITIAL_STATE = {
  currentUtility: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case VIEW_UTILITY:
      return { ...state, currentUtility: action.payload };
    default:
      return state;
  }
};
