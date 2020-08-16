import { initState, reducer} from '../../src/reducers/CampervanReducer';
import { getStore } from '../../__fixtures__/store'
import {
    FFETCH_CAMPERVANS_SUCCESS,
    GET_RENTAL_SUCCESS,
} from "../../src/constants/ActionTypes";

const mockDataRes = {
    data: [
        {},
        {},
        {},
        {},
        {},
    ],
    meta: {
        total: 34,
    }
};
const mockDataNoRes = {
    data: [],
    meta: {
        total: 0,
    }
};
const mockDataSingleResult = {
    data: {
        id: '1232',
        attributes: {

        },
        relationships: {},
        type: 'rentals'
    },
    included: [
        {},
        {},
        {},
    ],
};
describe('redux-reducer test', () => {
    let store = null;

    beforeEach(() => {
        store = getStore({
            testState: initState
        });
    });

    afterEach(() => {
        store = null;
    })

    it('should return correct state when FETCH_CAMPERVANS_SUCCESS action type occurs', () => {
        const state = store.getState().testState
        const result = reducer(state,{ type: FFETCH_CAMPERVANS_SUCCESS, payload: mockDataRes});
        expect(result.campervanList.length).toEqual(5);
    })
    it('should return correct state when GET_RENTAL_SUCCESS action type occurs', () => {
        const state = store.getState().testState
        const result = reducer(state,{ type: GET_RENTAL_SUCCESS, payload: mockDataSingleResult});
        expect(Object.keys(result.selectedItemData).length).toEqual(2);
        expect(Object.keys(result.selectedItemData.data).length).toEqual(4);
        expect(result.selectedItemData.included.length).toEqual(3);
    })

})
