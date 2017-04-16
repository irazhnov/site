import { takeLatest } from 'redux-saga';
import { put, call } from 'redux-saga/effects';

import * as types from './constants';
import api from '../../api';
import * as DicClient from 'dic-client';
const dicClient = new DicClient.DefaultApi();
// var defaultClient = DicClient.ApiClient.instance;

export function* getCategory(options) {
  try {
    const dicClient = new DicClient.DefaultApi();
//     dicClient.diabetesTherapiesGet(1, callback);
    yield put({ type: types.FETCHING_CATEGORY, fetching: true });
    const feed =  yield call([dicClient, dicClient.getCategoryPostsGet], options.category, options.page, options.per_page);
//     debugger;
    yield put({ type: types.FETCHING_CATEGORY, fetching: false });
    yield put({ type: types.FETCHING_CATEGORY_SUCCEEDED, feed });
  } catch (e) {
    console.error(e);
    yield put({ type: types.FETCHING_CATEGORY, fetching: false });
    yield put({ type: types.FETCHING_CATEGORY_FAILED, message: e, error: true, payload: e });
  }
}

export function* getCategoryFlow() {
  yield* takeLatest(types.FETCHING_CATEGORY_REQUESTED, getCategory);
}

export function* getIntroCategory(options) {
  try {
    const dicClient = new DicClient.DefaultApi();
//     dicClient.diabetesTherapiesGet(1, callback);
    yield put({ type: types.FETCHING_INTRO, fetching: true });
    const editor =  yield call([dicClient, dicClient.getCategoryPostsGet], options.category, options.page, options.per_page);
    const recent =  yield call([dicClient, dicClient.getRecentPostsGet], options.page, options.per_page);
    const intro = {
      editor: editor,
      recent: recent,
    };
    yield put({ type: types.FETCHING_INTRO, fetching: false });
    yield put({ type: types.FETCHING_INTRO_SUCCEEDED, intro});
  } catch (e) {
    console.error(e);
    yield put({ type: types.FETCHING_INTRO, fetching: false });
    yield put({ type: types.FETCHING_INTRO_FAILED, message: e, error: true, payload: e });
  }
}

export function* getIntroCategoryFlow() {
  yield* takeLatest(types.FETCHING_INTRO_REQUESTED, getIntroCategory);
}