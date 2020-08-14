
import { all } from 'redux-saga/effects';
import campervanSagas from './campervanSagas';

export default function* rootSaga(getState) {
  yield all([
    campervanSagas(),
  ]);
}
