import { takeLatest } from 'redux-saga';
import { put, call } from 'redux-saga/effects';

import * as types from './constants';
import api from '../../api';
import * as DicClient from 'dic-client';
const dicClient = new DicClient.DefaultApi();
// var defaultClient = DicClient.ApiClient.instance;
//
// var callback = function(error, data, response) {
//   debugger;
//   if (error) {
//     console.error(error);
//   } else {
//     console.log('API called successfully. Returned data: ' + data);
//   }
// };


export function* getCategory(options) {
  try {
    const dicClient = new DicClient.DefaultApi();
//     dicClient.diabetesTherapiesGet(1, callback);
    yield put({ type: types.FETCHING_CATEGORY, fetching: true });
    const feed =  yield call([dicClient, dicClient.categorySubcategoriesGet], options.category, options.subCategory, 1);
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

export function* getPaginatedCategory(options) {
  try {
    const dicClient = new DicClient.DefaultApi();
//     dicClient.diabetesTherapiesGet(1, callback);
    yield put({ type: types.FETCHING_CATEGORY, fetching: true });
    const feed =  yield call([dicClient, dicClient.categorySubcategoriesPagePageGet], options.category, options.subCategory,  options.pageNumber, 1);
//     debugger;
    yield put({ type: types.FETCHING_CATEGORY, fetching: false });
    yield put({ type: types.FETCHING_PAGINATED_CATEGORY_SUCCEEDED, feed });
  } catch (e) {
    console.error(e);
    yield put({ type: types.FETCHING_CATEGORY, fetching: false });
    yield put({ type: types.FETCHING_PAGINATED_CATEGORY_FAILED, message: e, error: true, payload: e });
  }
}

export function* getPaginatedCategoryFlow() {
  yield* takeLatest(types.FETCHING_PAGINATED_CATEGORY_REQUESTED, getPaginatedCategory);
}