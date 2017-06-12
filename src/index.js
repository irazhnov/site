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
import IntroApp from './containers/IntroApp';
import App from './containers/App';
import SearchApp from './containers/SearchApp';
import PostApp from './containers/PostApp';
import MenuApp from './containers/MenuApp';
import NotFound from './containers/NotFound';
import '../assets/gray.png';
import '../assets/noImage.png';
import '../assets/noImageRetina.png';

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
      replace('/intro');
    }
    if (nextState.location.pathname && nextState.location.state) {
      replace(nextState.location.pathname);
    }
  } else if (nextState.location.pathname !== '/intro') {
    replace('/intro');
  }
}

ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <Router history={history}>
        <Route path="/intro" component={IntroApp} />
        <Route path="/menu" component={MenuApp} />
        <Route path="/categories" component={App} />
        <Route path="/search" component={SearchApp} />
        <Route path="/post" component={PostApp} />
        <Route path="/" component={IntroApp}>
          <IndexRedirect to="/intro" />
            <Route path="/categories/:categoryId" component={App} />

           {/*  <Route path="/article/:articleId/edit" component={WriterApp} />
          <Route path="/articles" component={ArticlesList} />
          <Route path="/articles/folder/:folderId" component={ArticlesList} />
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
