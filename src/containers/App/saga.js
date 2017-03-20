import { takeLatest } from 'redux-saga';
import { put, call } from 'redux-saga/effects';

import * as types from './constants';
import api from '../../api';


export function* getUserSettings() {
  try {
    const apiInstance = api.getInstance();
    yield put({ type: types.FETCHING_USER_SETTINGS, fetching: true });
    const userSettings = yield call([apiInstance, apiInstance.getUserSettings]);
    yield put({ type: types.FETCHING_USER_SETTINGS, fetching: false });
    yield put({ type: types.FETCHING_USER_SETTINGS_SUCCEEDED, userSettings });
  } catch (e) {
    console.error(e);
    yield put({ type: types.FETCHING_USER_SETTINGS, fetching: false });
    yield put({ type: types.FETCHING_USER_SETTINGS_FAILED, message: e, error: true, payload: e });
  }
}


export function* getUserSettingsFlow() {
  yield* takeLatest(types.FETCHING_USER_SETTINGS_REQUESTED, getUserSettings);
}

export function* updateUserSettings(action) {
  try {
    const apiInstance = api.getInstance();
    yield put({ type: types.UPDATING_USER_SETTINGS, updating: true });
    const updatedSettings = yield call(
      [apiInstance, apiInstance.updateUserSettings],
      { settings: action.form },
    );
    yield put({ type: types.UPDATING_USER_SETTINGS, updating: false });
    yield put({ type: types.UPDATING_USER_SETTINGS_SUCCEEDED, updatedSettings });
  } catch (e) {
    console.error(e);
    yield put({ type: types.UPDATING_USER_SETTINGS, updating: false });
    yield put({ type: types.UPDATING_USER_SETTINGS_FAILED, message: e, error: true, payload: e });
  }
}


export function* updateUserSettingsFlow() {
  yield* takeLatest(types.UPDATING_USER_SETTINGS_REQUESTED, updateUserSettings);
}

export function* getCurrentUser() {
  try {
    const apiInstance = api.getInstance();
    yield put({ type: types.FETCHING_USER, fetching: true });
    const user = yield call([apiInstance, apiInstance.getCurrentUser]);
    yield put({ type: types.FETCHING_USER, fetching: false });
    yield put({ type: types.FETCHING_USER_SUCCEEDED, user });
  } catch (e) {
    console.error(e);
    yield put({ type: types.FETCHING_USER, fetching: false });
    yield put({ type: types.FETCHING_USER_FAILED, message: e, error: true, payload: e });
  }
}


export function* getCurrentUserFlow() {
  yield* takeLatest(types.FETCHING_USER_REQUESTED, getCurrentUser);
}

export function* getChannels() {
  try {
    const apiInstance = api.getInstance();
    yield put({ type: types.FETCHING_CHANNELS, fetching: true });
    const channels = yield call([apiInstance, apiInstance.getChannels]);
    yield put({ type: types.FETCHING_CHANNELS, fetching: false });
    yield put({ type: types.FETCHING_CHANNELS_SUCCEEDED, channels });
  } catch (e) {
    console.error(e);
    yield put({ type: types.FETCHING_CHANNELS, fetching: false });
    yield put({ type: types.FETCHING_CHANNELS_FAILED, message: e, error: true, payload: e });
  }
}


export function* getChannelsFlow() {
  yield* takeLatest(types.FETCHING_CHANNELS_REQUESTED, getChannels);
}

