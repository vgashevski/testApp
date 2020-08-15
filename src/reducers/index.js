import { combineReducers } from 'redux'
import CampervanReducer from './CampervanReducer';

const createRootReducer = () => combineReducers({
  campervan: CampervanReducer
});

export default createRootReducer;