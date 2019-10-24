import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const accessToken = '';
const spaceId3 =
  'Y2lzY29zcGFyazovL2h0dHBzOi8vY29udi1hLndieDIuY29tL2NvbnZlcnNhdGlvbi9hcGkvdjEvY29udmVyc2F0aW9ucy82Y2M0NDA3MC1mNTE1LTExZTktOTE1NC01NWQwYjgxZGMxZjAvUk9PTS82Y2M0NDA3MC1mNTE1LTExZTktOTE1NC01NWQwYjgxZGMxZjA';
const spaceTredjePlass =
  'Y2lzY29zcGFyazovL2h0dHBzOi8vY29udi1hLndieDIuY29tL2NvbnZlcnNhdGlvbi9hcGkvdjEvY29udmVyc2F0aW9ucy8xMWVmYTY5MC1kZmQ0LTExZTktYTViMy02MzI4YTk1NDFjMTkvUk9PTS8xMWVmYTY5MC1kZmQ0LTExZTktYTViMy02MzI4YTk1NDFjMTk';
const spaceWidgetProps = {
  accessToken: accessToken,
  destinationType: 'spaceId',
  destinationId:
    'Y2lzY29zcGFyazovL2h0dHBzOi8vY29udi1hLndieDIuY29tL2NvbnZlcnNhdGlvbi9hcGkvdjEvY29udmVyc2F0aW9ucy82Y2M0NDA3MC1mNTE1LTExZTktOTE1NC01NWQwYjgxZGMxZjAvUk9PTS82Y2M0NDA3MC1mNTE1LTExZTktOTE1NC01NWQwYjgxZGMxZjA'
};

const recentsWidgetProps = {
  accessToken: accessToken
};

const WebexClient = props => {
  const [spaceId, setSpaceId] = useState(null);
  const [ready, setReady] = useState(false);
  const [token, setToken] = useState('https://e479bf03.ngrok.io');

  const setRoom = (name, detail) => {
    console.log(name);
    console.log(detail);
    //setSpaceId(roomId);
  };

  useEffect(() => {
    const socket = io('https://e479bf03.ngrok.io');
    socket.on('token', token => {
      console.log('token', token);
      setToken(token);
    });
  }, []);

  useEffect(() => {
    const spaceWidget = document.getElementById('webex-widget');
    const recentsWidget = document.getElementById('webex-recents');
    console.log(ready);
    //if (spaceWidget && spaceId && !ready) {
    if (token) {
      ciscospark.widget(spaceWidget).spaceWidget({
        accessToken: token,
        destinationType: 'spaceId',
        destinationId: spaceTredjePlass,
        initialActivity: 'meet',
        startCall: true
      });
    }
    //setReady(true);
    //} else if (recentsWidget && !ready) {
    //ciscospark.widget(recentsWidget).recentsWidget({
    //accessToken: accessToken,
    //onEvent: setRoom
    //});
    //}
  }, [spaceId, token]);
  return (
    <div>
      {
        //spaceId != null ? <div id="webex-widget" /> : <div id="webex-recents" />
      }
      <div id="webex-widget" />
    </div>
  );
};

export default WebexClient;
