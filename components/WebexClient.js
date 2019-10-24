import React, { useEffect, useState } from 'react';
<<<<<<< HEAD
import io from 'socket.io-client';

const accessToken = '';
const spaceId3 =
  'Y2lzY29zcGFyazovL2h0dHBzOi8vY29udi1hLndieDIuY29tL2NvbnZlcnNhdGlvbi9hcGkvdjEvY29udmVyc2F0aW9ucy82Y2M0NDA3MC1mNTE1LTExZTktOTE1NC01NWQwYjgxZGMxZjAvUk9PTS82Y2M0NDA3MC1mNTE1LTExZTktOTE1NC01NWQwYjgxZGMxZjA';
const spaceTredjePlass =
  'Y2lzY29zcGFyazovL2h0dHBzOi8vY29udi1hLndieDIuY29tL2NvbnZlcnNhdGlvbi9hcGkvdjEvY29udmVyc2F0aW9ucy8xMWVmYTY5MC1kZmQ0LTExZTktYTViMy02MzI4YTk1NDFjMTkvUk9PTS8xMWVmYTY5MC1kZmQ0LTExZTktYTViMy02MzI4YTk1NDFjMTk';
=======

const accessToken =
  '';
const spaceId3 =
  'Y2lzY29zcGFyazovL2h0dHBzOi8vY29udi1hLndieDIuY29tL2NvbnZlcnNhdGlvbi9hcGkvdjEvY29udmVyc2F0aW9ucy82Y2M0NDA3MC1mNTE1LTExZTktOTE1NC01NWQwYjgxZGMxZjAvUk9PTS82Y2M0NDA3MC1mNTE1LTExZTktOTE1NC01NWQwYjgxZGMxZjA';
>>>>>>> Add webex client widget
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
<<<<<<< HEAD
  const [token, setToken] = useState('https://e479bf03.ngrok.io');
=======
>>>>>>> Add webex client widget

  const setRoom = (name, detail) => {
    console.log(name);
    console.log(detail);
    //setSpaceId(roomId);
  };

  useEffect(() => {
<<<<<<< HEAD
    const socket = io('https://e479bf03.ngrok.io');
    socket.on('token', token => {
      console.log('token', token);
      setToken(token);
    });
  }, []);

  useEffect(() => {
=======
>>>>>>> Add webex client widget
    const spaceWidget = document.getElementById('webex-widget');
    const recentsWidget = document.getElementById('webex-recents');
    console.log(ready);
    //if (spaceWidget && spaceId && !ready) {
<<<<<<< HEAD
    if (token) {
      ciscospark.widget(spaceWidget).spaceWidget({
        accessToken: token,
        destinationType: 'spaceId',
        destinationId: spaceTredjePlass,
        initialActivity: 'meet',
        startCall: true
      });
    }
=======
    ciscospark.widget(spaceWidget).spaceWidget({
      accessToken: accessToken,
      destinationType: 'spaceId',
      destinationId: spaceId3
    });
>>>>>>> Add webex client widget
    //setReady(true);
    //} else if (recentsWidget && !ready) {
    //ciscospark.widget(recentsWidget).recentsWidget({
    //accessToken: accessToken,
    //onEvent: setRoom
    //});
    //}
<<<<<<< HEAD
  }, [spaceId, token]);
=======
  });
>>>>>>> Add webex client widget
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
