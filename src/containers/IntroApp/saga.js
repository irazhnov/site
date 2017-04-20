import { takeLatest } from 'redux-saga';
import { put, call } from 'redux-saga/effects';

import * as types from './constants';
import api from '../../api';
import * as DicClient from 'dic-client';
// const dicClient = new DicClient.DefaultApi();

export function* getEditorPost(options) {
  try {
    const dicClient = new DicClient.DefaultApi();
    yield put({ type: types.FETCHING_INTRO, fetching: true });
    const editor =  yield call([dicClient, dicClient.getCategoryPostsGet], options.category, options.page, options.per_page);
    yield put({ type: types.FETCHING_INTRO, fetching: false });
    yield put({ type: types.FETCHING_INTRO_SUCCEEDED, editor});
  } catch (e) {
    console.error(e);
    yield put({ type: types.FETCHING_INTRO, fetching: false });
    yield put({ type: types.FETCHING_INTRO_FAILED, message: e, error: true, payload: e });
  }
}

export function* getEditorPostFlow() {
  yield* takeLatest(types.FETCHING_INTRO_REQUESTED, getEditorPost);
}

export function* getRecentPost(options) {
  try {
    const dicClient = new DicClient.DefaultApi();
    yield put({ type: types.FETCHING_RECENT, fetching: true });
    const recent =  yield call([dicClient, dicClient.getRecentPostsGet], options.page, options.per_page);
    yield put({ type: types.FETCHING_RECENT, fetching: false });
    yield put({ type: types.FETCHING_RECENT_SUCCEEDED, recent});
  } catch (e) {
    console.error(e);
    yield put({ type: types.FETCHING_RECENT, fetching: false });
    yield put({ type: types.FETCHING_RECENT_FAILED, message: e, error: true, payload: e });
  }
}

export function* getRecentPostFlow() {
  yield* takeLatest(types.FETCHING_RECENT_REQUESTED, getRecentPost);
}
