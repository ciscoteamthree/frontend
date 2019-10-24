import React from 'react';
import Head from 'next/head';
import Column from '../components/Column';

const Admin = () => (
  <div>
    <Head>
      <title>Admin</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Column width={'80%'} text="Hei" />
    <Column width={'20%'} text="hehe" />
  </div>
);

export default Admin;
