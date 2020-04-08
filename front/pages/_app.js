import React from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import PropTypes from 'prop-types';

const ReactSNS = ({ Component }) => {
  return (
    <>
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
    </>
  );
};

ReactSNS.PropTypes = {
  Component: PropTypes.elementType,
};

export default ReactSNS;
