import { takeLatest, delay } from 'redux-saga';
import { put, call } from 'redux-saga/effects';

import * as types from './constants';
import api from '../../api';
import * as DicClient from 'dic-client';
const dicClient = new DicClient.DefaultApi();

export function* freeSearch(options) {
  try {
    const dicClient = new DicClient.DefaultApi();

    yield put({ type: types.FETCHING_FREE_SEARCH, fetching: true });
    yield delay(350);
    const selected =  yield call([dicClient, dicClient.rootGet], options.query, 1);

    yield put({ type: types.FETCHING_FREE_SEARCH, fetching: false });
    yield put({ type: types.FETCHING_FREE_SEARCH_SUCCEEDED, selected });
  } catch (e) {
    console.error(e);
    yield put({ type: types.FETCHING_FREE_SEARCH, fetching: false });
    yield put({ type: types.FETCHING_FREE_SEARCH_FAILED, message: e, error: true, payload: e });
  }
}

export function* freeSearchFlow() {
  yield* takeLatest(types.FETCHING_FREE_SEARCH_REQUESTED, freeSearch);
}