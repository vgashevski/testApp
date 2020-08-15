import {
  FFETCH_CAMPERVANS,
  FFETCH_CAMPERVANS_SUCCESS,
  GET_RENTAL,
  GET_RENTAL_SUCCESS,
  CLEANUP_SELECTED,
} from "../constants/ActionTypes";

export const getCampervans = (params) => {
  return {
    type: FFETCH_CAMPERVANS,
    payload: params
  }
};

export const getCampervansSuccess = (payload) => {
  return {
    type: FFETCH_CAMPERVANS_SUCCESS,
    payload
  }
};
export const getRental = (payload) => {
  return {
    type: GET_RENTAL,
    payload
  }
};
export const getRentalSuccess  = (payload) => {
  return {
    type: GET_RENTAL_SUCCESS,
    payload
  }
};
export const cleanUpSelected  = () => {
  return {
    type: CLEANUP_SELECTED,
  }
};

// TODO
// export const fetchError = (error) => {
//   return {
//     type: FETCH_ERROR,
//     payload: error
//   }
// };

