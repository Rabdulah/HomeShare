import { RETRIEVE_CHORES, VIEW_CHORE } from './types';

export const retrieveChores = chores => {
  return {
    type: RETRIEVE_CHORES,
    payload: chores
  };
};

export const viewChore = chore => {
  return {
    type: VIEW_CHORE,
    payload: chore
  };
};
