import { take, call, put } from 'redux-saga/effects';
import { browserHistory } from 'react-router';

import auth from './auth';
import * as types from './constants';


function forwardTo(location) {
  browserHistory.push(location);
}


/**
 * Effect to handle authorization
 * @param  {string} username               The username of the user
 * @param  {string} password               The password of the user
 */
export function* authorize({ username, password }) {
    // We send an action that tells Redux we're sending a request
  yield put({ type: types.SENDING_REQUEST, sending: true });

    // We then try to log in the user
  try {
    return yield call(auth.login, username, password);
  } catch (error) {
        // If we get an error we send Redux the appropiate action and return
    yield put({ type: types.REQUEST_ERROR, error: true, payload: error });
    return false;
  } finally {
        // When done, we tell Redux we're not in the middle of a request any more
    yield put({ type: types.SENDING_REQUEST, sending: false });
  }
}

/**
 * Log in saga
 */
export function* loginFlow() {
    // Because sagas are generators, doing `while (true)` doesn't block our program
    // Basically here we say "this saga is always listening for actions"
  while (true) {
        // And we're listening for `LOGIN_REQUEST` actions and destructuring its payload
    const request = yield take(types.LOGIN_REQUEST);
    const { username, password } = request.data;

    const loggedIn = yield call(authorize, { username, password });

    if (loggedIn) {
      yield put({ type: types.SET_AUTH, newAuthState: true }); // User is logged in (authorized)
      yield put({ type: types.CHANGE_FORM, newFormState: { username: '', password: '' } }); // Clear form
      forwardTo('/create');
    }
  }
}