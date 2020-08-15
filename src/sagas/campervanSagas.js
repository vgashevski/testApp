import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {
    FFETCH_CAMPERVANS,
    GET_RENTAL,
} from "../constants/ActionTypes";

import {
    getCampervansSuccess,
    getRentalSuccess,
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

function* doGetRental({payload}) {
    const { id } = payload;
    try {
        const result = yield call(rest.getRental, id);
        if (result && result.data) {
            yield put(getRentalSuccess(result));
        } else {
            console.log('single rental result: ', result);
        }
    } catch (error) {
        // yield put(showMessage(error));
        console.error('single rental ERRROR doGetRental: ', error);
    }
}

export function* fetchCampervans() {
    yield takeEvery(FFETCH_CAMPERVANS, doFetch);
}
export function* getRental() {
    yield takeEvery(GET_RENTAL, doGetRental);
}

export default function* rootSaga() {
    yield all([
        fork(fetchCampervans),
        fork(getRental),
    ]);
}