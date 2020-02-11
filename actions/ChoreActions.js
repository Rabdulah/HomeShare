import { RETRIEVE_CHORES } from './types';

export const retrieveChores = chores => {
  return {
    type: RETRIEVE_CHORES,
    payload: chores
  };
};
