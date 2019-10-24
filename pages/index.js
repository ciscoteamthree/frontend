import React from 'react';
import Head from 'next/head';
import WebexClient from '../components/WebexClient';

const Home = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '8fr 2fr',
      gridTemplateRows: '1fr',
      gridColumnGap: '5px',
      height: '800px'
    }}
  >
    <Head>
      <title>Home</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <WebexClient />
    <div>Placeholder</div>
  </div>
);

export default Home;
