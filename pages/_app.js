import React from 'react';
import App from 'next/app';
import io from 'socket.io-client';
import { WS_URL } from '../config';

class MyApp extends App {
  constructor() {
    super();
    const socket = io(WS_URL);
    this.state = {
      socket,
      currentMeeting: null,
      templates: [],
      token: null,
      sensorData: null
    };

    socket.on('currentMeeting', currentMeeting => {
      this.setState({ currentMeeting });
    });
    socket.on('templates', templates => {
      this.setState({ templates });
    });
    socket.on('token', token => {
      this.setState({ token });
    });
    socket.on('sensorData', sensorData => {
      this.setState({ sensorData });
    });
  }
  render() {
    const { Component, pageProps } = this.props;
    const { socket, templates, currentMeeting, token, sensorData } = this.state;

    return (
      <Component
        {...pageProps}
        token={token}
        socket={socket}
        templates={templates}
        currentMeeting={currentMeeting}
        sensorData={sensorData}
      />
    );
  }
}

export default MyApp;