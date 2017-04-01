import { takeLatest } from 'redux-saga';
import { put, call } from 'redux-saga/effects';

import * as types from './constants';
import api from '../../api';
import * as DicClient from 'dic-client';
const dicClient = new DicClient.TherapiesApi();
var defaultClient = DicClient.ApiClient.instance;

var callback = function(error, data, response) {
  debugger;
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};

export function* getGlucoseControl() {
  try {
    const apiInstance = api.getInstance();
    const dicClient = new DicClient.TherapiesApi();
//     dicClient.diabetesTherapiesGet(1, callback);

    yield put({ type: types.FETCHING_GLUC_CONTROL_SETTINGS, fetching: true });
    const userSettings =  yield call([dicClient, dicClient.diabetesTherapiesBloodGlucoseControlGet], 1);
//     debugger;
    yield put({ type: types.FETCHING_GLUC_CONTROL_SETTINGS, fetching: false });
    yield put({ type: types.FETCHING_GLUC_CONTROL_SETTINGS_SUCCEEDED, userSettings });
  } catch (e) {
    console.error(e);
    yield put({ type: types.FETCHING_GLUC_CONTROL_SETTINGS, fetching: false });
    yield put({ type: types.FETCHING_GLUC_CONTROL_SETTINGS_FAILED, message: e, error: true, payload: e });
  }
}

export function* getGlucoseControlFlow() {
  yield* takeLatest(types.FETCHING_GLUC_CONTROL_SETTINGS_REQUESTED, getGlucoseControl);
}

export function* getCategory(action) {
  try {
    const dicClient = new DicClient.CategoriesApi();
//     dicClient.diabetesTherapiesGet(1, callback);

    yield put({ type: types.FETCHING_CATEGORY, fetching: true });
    const feed =  yield call([dicClient, dicClient.categorySubcategoriesGet], action.category, action.subCategory, 1);
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
