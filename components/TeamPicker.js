import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const TeamPicker = props => {
  useEffect(() => {
    console.log(props);
    const recentsWidget = document.getElementById('webex-widget');
    if (props.token) {
      ciscospark.widget(recentsWidget).recentsWidget({
        accessToken: props.token
      });
    }
  }, [props.token]);
  return (
    <div
      style={{ height: '100vh', width: '300px', display: 'absolute' }}
      id="webex-widget"
    />
  );
};

export default TeamPicker;
