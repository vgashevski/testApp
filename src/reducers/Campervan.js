import {
  FFETCH_CAMPERVANS_SUCCESS,
  FFETCH_CAMPERVANS,
} from "../constants/ActionTypes";

const initState = {
  campervanList: [],
  loading: true,
  total: 0,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case FFETCH_CAMPERVANS:
      return { ...state, loading: true }
    case FFETCH_CAMPERVANS_SUCCESS:
      console.log('reducer action: ', action);
      return { ...state, campervanList: [...state.campervanList,...action.payload.data], loading: false, total:  action.payload.meta.total}
    default:
      return state;
  }
};

export default reducer;
