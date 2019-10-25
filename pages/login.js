import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import io from 'socket.io-client';

const Login = () => {
  const router = useRouter();
  const code = router.query.code;
  const [socket, setSocket] = useState();
  const [loginUrl, setLoginUrl] = useState();
  const [token, setToken] = useState();

  useEffect(() => {
    if (socket && code) {
      socket.emit('oauth', code);
    }
    if (!socket) {
      const _socket = io('https://2a9d7c02.ngrok.io');
      _socket.on('token', token => {
        setToken(token);
        setLoginUrl(null);
        // Redirect away from login page
        router.push('/admin');
      });
      _socket.on('auth_missing', url => {
        setLoginUrl(url);
      });
      setSocket(_socket);
    }
  }, [code, socket]);

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