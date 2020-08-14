import React from 'react';
import createSagaMiddleware from 'redux-saga';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { logger } from 'redux-logger';
import reducer from './reducers';
import App from './components/App';
import rootSaga from './sagas';
import { Route, Switch } from "react-router-dom";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer(),
  applyMiddleware(sagaMiddleware, logger),
);

sagaMiddleware.run(rootSaga);

render(
  <Provider store={store}>
    <App />
    {/*  <Switch>*/}
    {/*      <Route path="/" component={App} />*/}
    {/*  </Switch>*/}
  </Provider>,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept(App);
}

