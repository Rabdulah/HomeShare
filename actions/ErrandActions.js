import { VIEW_ERRAND } from './types';

export const viewErrand = errand => {
  return {
    type: VIEW_ERRAND,
    payload: errand
  };
};
