import { combineReducers } from 'redux'
import Campervan from './Campervan';

const createRootReducer = () => combineReducers({
  campervan: Campervan
});

export default createRootReducer;