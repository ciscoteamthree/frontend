import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const spaceId3 =
  'Y2lzY29zcGFyazovL2h0dHBzOi8vY29udi1hLndieDIuY29tL2NvbnZlcnNhdGlvbi9hcGkvdjEvY29udmVyc2F0aW9ucy82Y2M0NDA3MC1mNTE1LTExZTktOTE1NC01NWQwYjgxZGMxZjAvUk9PTS82Y2M0NDA3MC1mNTE1LTExZTktOTE1NC01NWQwYjgxZGMxZjA';
const spaceTredjePlass =
  'Y2lzY29zcGFyazovL2h0dHBzOi8vY29udi1hLndieDIuY29tL2NvbnZlcnNhdGlvbi9hcGkvdjEvY29udmVyc2F0aW9ucy8xMWVmYTY5MC1kZmQ0LTExZTktYTViMy02MzI4YTk1NDFjMTkvUk9PTS8xMWVmYTY5MC1kZmQ0LTExZTktYTViMy02MzI4YTk1NDFjMTk';

const WebexClient = () => {
  const [token, setToken] = useState();

  useEffect(() => {
    const socket = io('https://5b6b05d2.ngrok.io');
    socket.on('token', token => {
      setToken(token);
    });
    socket.on('auth_missing', () => {
      alert('auth missing');
    });
  }, []);

  useEffect(() => {
    const spaceWidget = document.getElementById('webex-widget');
    if (token) {
      ciscospark.widget(spaceWidget).spaceWidget({
        accessToken: token,
        destinationType: 'spaceId',
        destinationId: spaceTredjePlass,
        initialActivity: 'meet',
        startCall: true
      });
    }
  }, [token]);
  return <div id="webex-widget" />;
};

export default WebexClient;
