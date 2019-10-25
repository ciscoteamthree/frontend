import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { WS_URL } from '../config';

const WebexClient = ({ token }) => {
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
