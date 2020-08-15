import React from 'react';
import createSagaMiddleware from 'redux-saga';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import App from './components/App';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [];
middlewares.push(sagaMiddleware);
if (process.env.NODE_ENV === `development`) {
    const { logger } = require(`redux-logger`);
    middlewares.push(logger);
}

const store = createStore(
  reducer(),
  applyMiddleware(...middlewares),
);

sagaMiddleware.run(rootSaga);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept(App);
}

