import React from 'react';
import Head from 'next/head';
import Column from '../components/Column';

const Admin = () => (
  <div style={{display: 'grid', gridTemplateColumns: '8fr 2fr', gridTemplateRows: '1fr', gridColumnGap: '5px'}}>
    <Head>
      <title>Admin</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Column style={{background: 'red'}} text="Hei" />
    <Column style={{background: 'blue'}} text="hehe" />
  </div>
);

export default Admin;
