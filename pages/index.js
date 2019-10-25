import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import WebexClient from '../components/WebexClient';
import MeetingWait from '../components/MeetingWait';
import Agenda from '../components/Agenda';
import moment from 'moment';
import styled from 'styled-components';
import MiniHeader from '../components/MiniHeader';

const test = {
  id: 1,
  title: 'Scrum Retrospective',
  startTime: '2019-10-25 20:00:00',
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
      duration: 40,
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

const Done = styled.div`
  position: absolute;
  width: 19.9%;
  background: rgba(39, 39, 39, 0.6);
  border-bottom: 5px solid red;
  box-sizing: border-box;
  height: ${props => (props.timeElapsed / 60000 / props.totalDuration) * 100}%;
`;

const Client = ({ currentMeeting, token, sensorData }) => {
  const [timeElapsed, setTimeElapsed] = useState(0);
  let interval;

  useEffect(() => {
    interval = setInterval(
      () =>
        setTimeElapsed(
          currentMeeting ? moment().diff(moment(currentMeeting.startTime)) : 0
        ),
      1000
    );
  }, []);

  const meetingReady = meeting => {
    return meeting && moment().isAfter(moment(meeting.startTime));
  };
  const totalDuration = currentMeeting
    ? currentMeeting.agenda.reduce((a, b) => a + b.duration, 0)
    : 0;
  return (
    <div className="show-grid">
      <div className="columns small-8 medium-10 gridColumn">
        {meetingReady(currentMeeting) ? (
          <WebexClient token={token} meeting={currentMeeting} />
        ) : (
          <MeetingWait meeting={currentMeeting} />
        )}
      </div>
      <div>
        <div
          className="columns small-4 medium-2 gridColumn"
          style={{ height: '100vh' }}
        >
          <MiniHeader sensorData={sensorData} />
          <Done timeElapsed={timeElapsed} totalDuration={totalDuration} />
          <Agenda
            disabled={true}
            agenda={currentMeeting ? currentMeeting.agenda : []}
          />
        </div>
      </div>
    </div>
  );
};

export default Client;
