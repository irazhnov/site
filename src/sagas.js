import { fork } from 'redux-saga/effects';
import {
  getCategoryFlow,
  getPaginatedCategoryFlow,
} from './containers/App/saga';
import { freeSearchFlow } from './containers/SearchApp/saga';


//import { loginFlow } from './containers/LoginApp/saga';

//import { getMediaFlow, getImageMetadataByIdFlow } from './containers/MediaSearchApp/saga';
//import { articleListSaga, searchArticlesFlow } from './containers/ArticlesListApp/saga';
//import {
//    findLocationsFlow,
//    getLocationMetadataByIdFlow,
//    findAreasFlow,
//    findLocationsByTermFlow } from './containers/LocationsPopupApp/saga';

//import { createAdminTagFlow, deleteAdminTagFlow, updateAdminTagFlow } from './containers/AdminTagsApp/saga';

// The root saga is what we actually send to Redux's middleware. In here we fork
// each saga so that they are all "active" and listening.
// Sagas are fired once at the start of an app and can be thought of as processes running
// in the background, watching actions dispatched to the store.
export default function* rootSaga() {
 yield fork(freeSearchFlow);
 yield fork(getCategoryFlow);
 yield fork(getPaginatedCategoryFlow);
}
