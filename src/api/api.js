import RestManager from "./RestManager";
import {
  BASE_URL,
  LIST_CAMPERVANS,
} from '../constants/apiEndpoints';

export const rest = {
  // Call API
  async fetchCampervans({limit, offset}) {
    const url = encodeURI(`${BASE_URL}${LIST_CAMPERVANS}&page[limit]=${limit}&page[offset]=${offset}`);
    console.log('Encoded url: ', url)
    return await RestManager.request(url);
  },


};
