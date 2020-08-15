import RestManager from "./RestManager";
import {
  BASE_URL,
  LIST_CAMPERVANS,
  GET_RENTAL_BY_ID,
} from '../constants/apiEndpoints';

export const rest = {
  // Call API
  async fetchCampervans({ limit, offset, filter }) {
    const terms = filter ? `&filter[keywords]=${filter}` : '';
    const url = encodeURI(`${BASE_URL}${LIST_CAMPERVANS}&page[limit]=${limit}&page[offset]=${offset}${terms}`);
    return await RestManager.request(url);
  },
  async getRental(id) {
    const url = encodeURI(`${BASE_URL}${GET_RENTAL_BY_ID}/${id}`);
    return await RestManager.request(url);
  },


};
