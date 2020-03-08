import { VIEW_ERRAND } from '../actions/types';

const INITIAL_STATE = {
  currentErrand: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case VIEW_ERRAND:
      return { ...state, currentErrand: action.payload };
    default:
      return state;
  }
};
