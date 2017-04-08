import { AppContainer } from 'react-hot-loader';
import ReactDOM from 'react-dom';
import React from 'react';
import { combineReducers, applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { Router, browserHistory, Route, IndexRedirect } from 'react-router';
import createSagaMiddleware from 'redux-saga';

import * as reducers from './reducers';
import rootSaga from './sagas';
import App from './containers/App';
//import ArticlesList from './containers/ArticlesListApp';
//import SwiftApp from './containers/SwiftApp';
import NotFound from './containers/NotFound';

const sagaMiddleware = createSagaMiddleware();
const reducer = combineReducers({
  ...reducers,
  routing: routerReducer,
});
const middlewares = [sagaMiddleware];
const appliedMiddlewares = applyMiddleware(...middlewares);
window.env = process.env.NODE_ENV;

const storeFactory = compose(
  appliedMiddlewares,
  // install redux dev tools extension for chrome to use that
  window.devToolsExtension ? window.devToolsExtension() : f => f)(createStore);

const store = storeFactory(reducer);

sagaMiddleware.run(rootSaga);

const history = syncHistoryWithStore(browserHistory, store);

const rootEl = document.getElementById('root');

function checkAuth(nextState, replace) {
  const { loggedIn } = store.getState().login;

  if (loggedIn) {
    if (nextState.location.pathname === '/login') {
      replace('/categories');
    }
    if (nextState.location.pathname && nextState.location.state) {
      replace(nextState.location.pathname);
    }
  } else if (nextState.location.pathname !== '/categories') {
    replace('/categories');
  }
}

ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <Router history={history}>
        <Route path="/categories" onEnter={checkAuth} component={App} />
        <Route path="/" onEnter={checkAuth} component={App}>
          <IndexRedirect to="/categories" />
            <Route path="/categories/:categoryId" component={App} />
           {/*  <Route path="/article/:articleId/edit" component={WriterApp} />
          <Route path="/articles" component={ArticlesList} />
          <Route path="/articles/folder/:folderId" component={ArticlesList} />
          <Route path="/swift" component={SwiftApp} />
          <Route path="/admin" component={AdminApp}>
            <Route path="tags" component={AdminTagsApp} />
          </Route>
          */}
          <Route path="*" component={NotFound} />
        </Route>
      </Router>
    </Provider>
  </AppContainer>,
  rootEl);
