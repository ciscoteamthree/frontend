import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

const Login = ({ socket, token }) => {
  const router = useRouter();
  const code = router.query.code;
  const [loginUrl, setLoginUrl] = useState();

  useEffect(() => {
    if (code) {
      socket.emit('oauth', code);
    }

    socket.on('token', token => {
      router.push('/admin');
    });
    socket.on('auth_missing', url => {
      setLoginUrl(url);
    });
  }, [code]);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '8fr 2fr',
        gridTemplateRows: '1fr',
        gridColumnGap: '5px',
        height: '100vh',
        width: '100vw'
      }}
    >
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ textAlign: 'center' }}>
        {loginUrl && <a href={loginUrl}>Login</a>}
        {!loginUrl && !token && 'Loading..'}
        {token && 'Logged in'}
      </div>
    </div>
  );
};

export default Login;
