import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import WebexClient from '../components/WebexClient';
import MeetingWait from '../components/MeetingWait';
import Agenda from '../components/Agenda';
import io from 'socket.io-client';
import { WS_URL } from '../config';
import moment from 'moment';
import styled from 'styled-components';
import Clock from '../components/Clock';

const test = {
  id: 1,
  title: 'Scrum Retrospective',
  description:
    'Post Scrum meeting facilitated by the Scrum Master where the team discusses the just-concluded sprint and determines what could be changed that might make the next sprint more productive.',
  agenda: [
    {
      id: 1,
      title: 'Set the stage',
      description:
        "Welcome everyone to the retrospective meeting and establish the rules of engagement:\nEmbrace a positive spirit of continuous improvement and share whatever you think will help the team improve.\nDon't make it personal, don't take it personally.\nListen with an open mind, and remember that everyone's experience is valid (even those you don't share).\nSet the boundary of your discussion – is it that last sprint? the last quarter? since the project started? Be clear how far back you're going to go.\nEncourage the team to embrace an improvement mindset, away from blame.",
      duration: 30,
      color: '#6c5ce7'
    },
    {
      id: 2,
      title: 'What went well?',
      description:
        'Start the session on a positive note. Have each team member use green sticky notes to write down what they feel went well (one idea per sticky). As people post their stickies on the whiteboard, the facilitator should group similar or duplicate ideas together.\n\nDiscuss your ideas briefly as a team.',
      duration: 15,
      color: '#00b894'
    },
    {
      id: 3,
      title: 'What needs improvement?',
      description:
        'Same structure as above, but using pink or red stickies. Remind your team that this is about actions and outcomes – not about specific people.',
      duration: 15,
      color: '#fd79a8'
    },
    {
      id: 4,
      title: 'Next steps',
      description:
        "Having identified what didn't go so well, what concrete actions can the team take to improve those things? Have your team use blue sticky notes to place ideas on the board. Group them and then discuss as a team, agree to which actions you will take, assign owners and a due date to get them DONE.\n\nThank everyone for their involvement and their honesty. Quickly run through the list of follow-up items, their owners and due dates.",
      duration: 15,
      color: '#fab1a0'
    }
  ]
};

const Client = () => {
  const [currentMeeting, setCurrentMeeting] = useState(test);

  useEffect(() => {
    const socket = io(WS_URL);
    console.log(WS_URL);
    socket.on('currentMeeting', meeting => {
      setCurrentMeeting(meeting);
    });
  }, []);

  const meetingReady = meeting => {
    return meeting && moment().isAfter(meeting.startTime);
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
      )}
      <div>
        <Clock />
        <Agenda
          disabled={true}
          agenda={currentMeeting ? currentMeeting.agenda : []}
        />
      </div>
    </div>
  );
};

export default Client;
