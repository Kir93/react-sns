import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';

const Home = () => {
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
        <Link href="/about">
          <a>about</a>
        </Link>
        <div>Hello, Next!</div>
      </AppLayout>
    </>
  );
};

export default Home;
