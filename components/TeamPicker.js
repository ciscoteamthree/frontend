import React, { useEffect, useState } from 'react';
import Flex from 'styled-flex-component';

const TeamPicker = props => {
  const handleEvent = (name, detail) => {
    console.log(name);
    console.log(detail);
    if (name == 'rooms:selected') {
      props.setTeamId(detail.data.id);
    }
  };
  useEffect(() => {
    console.log(props);
    const recentsWidget = document.getElementById('webex-widget');
    if (props.token) {
      ciscospark.widget(recentsWidget).recentsWidget({
        accessToken: props.token,
        onEvent: handleEvent
      });
    }
  }, [props.token]);
  return (
    <Flex center full style={{ height: '100%' }}>
      <div style={{ textAlign: 'center' }}>
        <h2>Choose a room for your meeting</h2>
        <div
          style={{ height: '400px', width: '400px', color: 'black' }}
          id="webex-widget"
        />
      </div>
    </Flex>
  );
};

export default TeamPicker;
