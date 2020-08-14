import { FFETCH_CAMPERVANS, FFETCH_CAMPERVANS_SUCCESS } from "../constants/ActionTypes";

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

// export const fetchError = (error) => {
//   return {
//     type: FETCH_ERROR,
//     payload: error
//   }
// };
export const getNews = () => ({
  type: 'GET_NEWS',
});
