import {
  FFETCH_CAMPERVANS_SUCCESS,
  FFETCH_CAMPERVANS,
  GET_RENTAL,
  GET_RENTAL_SUCCESS,
  CLEANUP_SELECTED,
} from "../constants/ActionTypes";

const initState = {
  campervanList: [],
  selectedItemData: {},
  loading: true,
  total: 0,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case FFETCH_CAMPERVANS: case GET_RENTAL:
      return { ...state, loading: true };

    case FFETCH_CAMPERVANS_SUCCESS:
      if (action.payload.offset === 0) {
        return { ...state, campervanList: [...action.payload.data], loading: false, total:  action.payload.meta.total}
      } else {
        return { ...state, campervanList: [...state.campervanList,...action.payload.data], loading: false, total:  action.payload.meta.total}
      }
    case GET_RENTAL_SUCCESS:
      return {...state, selectedItemData: {...action.payload}, loading: false};
    case CLEANUP_SELECTED:
      return {...state, selectedItemData: {}, loading: false};

    default:
      return state;
  }
};

export default reducer;
