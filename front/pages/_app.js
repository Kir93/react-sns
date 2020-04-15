import React from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import reducer from '../reducers';
import rootSaga from '../sagas';

const ReactSNS = ({ Component, store }) => {
  return (
    <Provider store={store}>
      <Head>
        <title>ReactSNS</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.26.12/antd.css"
        />
      </Head>
      <AppLayout>
        <Component />
      </AppLayout>
    </Provider>
  );
};

ReactSNS.PropTypes = {
  Component: PropTypes.elementType.isRequired,
  store: PropTypes.object.isRequired,
};

const configureStore = (initialState, options) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const enhancer = compose(
    applyMiddleware(...middlewares),
    !options.isServer && window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f,
  );
  const store = createStore(reducer, initialState, enhancer);
  sagaMiddleware.run(rootSaga);
  return store;
};

export default withRedux(configureStore)(ReactSNS);
