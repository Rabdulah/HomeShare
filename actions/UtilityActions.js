import { VIEW_UTILITY } from './types';

export const viewUtility = utility => {
  return {
    type: VIEW_UTILITY,
    payload: utility
  };
};