import React from 'react';
import AppLayout from '../components/AppLayout';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import axios from 'axios';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import reducer from '../reducers';
import rootSaga from '../sagas';
import { LOAD_USER_REQUEST } from '../reducers/user';
import { Helmet } from 'react-helmet';
import App, { Container } from 'next/app';

const ReactSNS = ({ Component, store, pageProps }) => {
  return (
    <Container>
      <Provider store={store}>
        <Helmet
          title="ReactSNS"
          htmlAttributes={{ lang: 'ko' }}
          meta={[
            {
              charset: 'UTF-8',
            },
            {
              name: 'viewport',
              content:
                'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes,viewport-fit=cover',
            },
            {
              'http-equiv': 'X-UA-Compatible',
              content: 'IE=edge',
            },
            {
              name: 'description',
              content: 'React SNS Portfolio',
            },
            {
              name: 'og:title',
              content: 'ReactSNS',
            },
            {
              name: 'og:description',
              content: 'React SNS Portfolio',
            },
            {
              property: 'og:type',
              content: 'website',
            },
            {
              property: 'og:image',
              content: 'http://kir93.me/favicon.ico',
            },
            {
              property: 'og:image:width',
              content: '800',
            },
            {
              property: 'og:image:height',
              content: '400',
            },
          ]}
          link={[
            {
              rel: 'shortcut icon',
              href: '/favicon.ico',
            },
            {
              rel: 'stylesheet',
              href:
                'https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css',
            },
            {
              rel: 'stylesheet',
              href:
                'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css',
            },
            {
              rel: 'stylesheet',
              href:
                'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css',
            },
          ]}
        />
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </Provider>
    </Container>
  );
};

ReactSNS.propTypes = {
  Component: PropTypes.elementType.isRequired,
  store: PropTypes.object.isRequired,
  pageProps: PropTypes.object.isRequired,
};

ReactSNS.getInitialProps = async (context) => {
  const { ctx, Component } = context;
  let pageProps = {};
  const state = ctx.store.getState();
  const cookie = ctx.isServer ? ctx.req.headers.cookie : '';
  if (ctx.isServer && cookie) {
    axios.defaults.headers.Cookie = '';
    axios.defaults.headers.Cookie = cookie;
  }
  if (!state.user.me) {
    ctx.store.dispatch({
      type: LOAD_USER_REQUEST,
    });
  }
  if (Component.getInitialProps) {
    pageProps = (await Component.getInitialProps(ctx)) || {};
  }
  return { pageProps };
};

const configureStore = (initialState, options) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const enhancer = compose(
    applyMiddleware(...middlewares),
    !options.isServer &&
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f,
  );
  const store = createStore(reducer, initialState, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

export default withRedux(configureStore)(withReduxSaga(ReactSNS));
