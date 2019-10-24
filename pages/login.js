import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import io from 'socket.io-client';

const clientId = `C3c13519710d1b76bc236b5295793cb7cb4f3ebada9ce60f584b1c479fc92cad3`;
const redirectUri = encodeURIComponent('http://localhost:3000/login');
const loginUrl = `https://api.ciscospark.com/v1/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=spark%3Akms%20spark%3Aall%20spark-admin%3Adevices_read%20spark-compliance%3Arooms_read&state=set_state_here`;

const Login = () => {
  const router = useRouter();
  const code = router.query.code;
  const [socket, setSocket] = useState();

  useEffect(() => {
    if (!socket) {
      const _socket = io('https://e479bf03.ngrok.io');
      _socket.on('token', () => {
        alert('login successful');
        // Redirect away from login page
        router.push(router.pathname);
      });
      _socket.on('auth_missing', () => {
        alert('No auth');
      });
      setSocket(_socket);
    }

    if (code) {
      socket.emit('oauth', code);
    }
  }, [code]);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '8fr 2fr',
        gridTemplateRows: '1fr',
        gridColumnGap: '5px',
        height: '100vh'
      }}
    >
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <a href={loginUrl}>Login</a>
      </div>
    </div>
  );
};

export default Login;
