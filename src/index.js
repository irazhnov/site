import { AppContainer } from 'react-hot-loader';
import ReactDOM from 'react-dom';
import React from 'react';
import { combineReducers, applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { Router, browserHistory, Route, IndexRedirect } from 'react-router';
//import createSagaMiddleware from 'redux-saga';
//import { megadraftMessages } from 'megadraft';
//import { intlReducer } from 'react-intl-redux';
//import { IntlProvider } from 'react-intl';

//import { crashReporter, errorReporter } from './newrelic-reporter';
import * as reducers from './reducers';
//import rootSaga from './sagas';
//import '../favicon.ico';
//import '../assets/pointer.png';
//import '../assets/minusrect.png';
//import '../assets/plusrect.png';
//import WriterApp from './containers/WriterApp';
import App from './containers/App';
//import AdminTagsApp from './containers/AdminTagsApp';
//import AdminApp from './containers/AdminApp';
import LoginApp from './containers/LoginApp';
//import ArticlesList from './containers/ArticlesListApp';
//import SwiftApp from './containers/SwiftApp';
import NotFound from './containers/NotFound';

const reducer = combineReducers({
  ...reducers,
  routing: routerReducer,
});
//const middlewares = [sagaMiddleware];
//const appliedMiddlewares = applyMiddleware(...middlewares);
window.env = process.env.NODE_ENV;

const storeFactory = compose(
//  appliedMiddlewares,
  // install redux dev tools extension for chrome to use that
  window.devToolsExtension ? window.devToolsExtension() : f => f)(createStore);

const store = storeFactory(reducer);

//sagaMiddleware.run(rootSaga);

const history = syncHistoryWithStore(browserHistory, store);

const rootEl = document.getElementById('root');

function checkAuth(nextState, replace) {
  const { loggedIn } = store.getState().login;

//   store.dispatch(clearError());

  if (loggedIn) {
    if (nextState.location.pathname === '/login') {
      replace('/create');
    }
    if (nextState.location.pathname && nextState.location.state) {
      replace(nextState.location.pathname);
    }
  } else if (nextState.location.pathname !== '/login') {
    replace('/login');
  }
}

ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <Router history={history}>
        <Route path="/login" onEnter={checkAuth} component={LoginApp} />
        <Route path="/" onEnter={checkAuth} component={App}>
          <IndexRedirect to="/create" />
          {/*
            <Route path="/create" component={WriterApp} />
          <Route path="/article/:articleId/edit" component={WriterApp} />
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
