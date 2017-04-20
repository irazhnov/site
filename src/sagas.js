import { fork } from 'redux-saga/effects';
import {   getCategoryFlow } from './containers/App/saga';
import { freeSearchFlow } from './containers/SearchApp/saga';
import { getEditorPostFlow, getRecentPostFlow } from './containers/IntroApp/saga';

// The root saga is what we actually send to Redux's middleware. In here we fork
// each saga so that they are all "active" and listening.
// Sagas are fired once at the start of an app and can be thought of as processes running
// in the background, watching actions dispatched to the store.
export default function* rootSaga() {
 yield fork(freeSearchFlow);
 yield fork(getCategoryFlow);
 yield fork(getEditorPostFlow);
 yield fork(getRecentPostFlow);
}
