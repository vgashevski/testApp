import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {
    FFETCH_CAMPERVANS
} from "../constants/ActionTypes";

import {
    getCampervansSuccess
} from "../actions/CampervanActions";

import {
    rest
} from "../api/api";

import {
    DEFAULT_RESPONSE_LIMIT,
    DEFAULT_RESPONSE_OFFSET,
} from "../constants/appConstants";


function* doFetch({payload}) {
    const { limit, offset, filter } = payload;
    try {
        const params = {
            limit: limit || DEFAULT_RESPONSE_LIMIT,
            offset: offset || DEFAULT_RESPONSE_OFFSET,
            filter: filter || ''
        };

        const fetchedCampervans = yield call(rest.fetchCampervans, params);
        if (fetchedCampervans && fetchedCampervans.data) {
            yield put(getCampervansSuccess({ ...fetchedCampervans, offset}));
        } else {
            console.log('fetched campervans result: ', fetchedCampervans);
        }
    } catch (error) {
        // yield put(showMessage(error));
        console.error('fetched campervans ERRROR fetchedCampervans: ', error);
    }
}
export function* fetchCampervans() {
    yield takeEvery(FFETCH_CAMPERVANS, doFetch);
}

export default function* rootSaga() {
    yield all([
        fork(fetchCampervans),
    ]);
}