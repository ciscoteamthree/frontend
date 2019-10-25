import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import WebexClient from '../components/WebexClient';
import MeetingWait from '../components/MeetingWait';
import Agenda from '../components/Agenda';
import io from 'socket.io-client';
import moment from 'moment';

const Client = () => {
  const [currentMeeting, setCurrentMeeting] = useState();

  useEffect(() => {
    const socket = io('https://2a9d7c02.ngrok.io');
    socket.on('currentMeeting', meeting => {
      setCurrentMeeting(meeting);
    });
  });

  const meetingReady = meeting => {
    return meeting && moment().after(meeting.startTime);
  };

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
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {meetingReady(currentMeeting) ? (
        <WebexClient />
      ) : (
        <MeetingWait meeting={currentMeeting} />
      )}{' '}
      <div>
        <Agenda agenda={currentMeeting && currentMeeting.agenda} />
      </div>
    </div>
  );
};

export default Client;
