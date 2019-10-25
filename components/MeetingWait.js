import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const Element = styled.div`
  padding: 10px;
  margin: auto;
  background: ${props => props.color};
  height: ${props => props.duration * 15}px;
  font-size: 26px;
`;

const MeetingWait = props => {
  return props.meeting ? (
    <Element>
      Meeting is starting in{' '}
      {moment.now().diff(moment(meeting.startTime), 'minutes')}
    </Element>
  ) : (
    <Element>No meeting registered</Element>
  );
};

export default MeetingWait;
