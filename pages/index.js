import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import WebexClient from '../components/WebexClient';
import MeetingWait from '../components/MeetingWait';
import Agenda from '../components/Agenda';
import moment from 'moment';
import styled from 'styled-components';
import MiniHeader from '../components/MiniHeader';
import { timeLeftSlice } from '../utils/hooks';
import { DATE_FORMAT } from '../config';

const Done = styled.div`
  position: absolute;
  width: 100%;
  background: rgba(39, 39, 39, 0.6);
  border-bottom: 5px solid red;
  box-sizing: border-box;
  height: ${props => (props.timeElapsed / 60000 / props.totalDuration) * 100}%;
`;

const Client = ({ socket, currentMeeting, token, sensorData }) => {
  const [timeElapsed, setTimeElapsed] = useState(0);
  let interval;

  const runHooks = (meeting, timeElapsed) => {
    if (!meeting) {
      return;
    }
    meeting.agenda.forEach(slice => {
      console.log(slice);
      if (10 > timeLeftSlice(meeting, slice.id) > 9) {
        socket.emit('sliceEnd', slice.title);
      }
    });
  };

  useEffect(() => {
    interval = setInterval(() => {
      setTimeElapsed(
        currentMeeting
          ? moment().diff(moment(currentMeeting.startTime, DATE_FORMAT))
          : 0
      );
      runHooks(currentMeeting, timeElapsed);
    }, 1000);
  }, []);

  const meetingReady = meeting => {
    return meeting && moment().isAfter(moment(meeting.startTime, DATE_FORMAT));
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
            disabled
            agenda={currentMeeting ? currentMeeting.agenda : []}
          />
        </div>
      </div>
    </div>
  );
};

export default Client;
