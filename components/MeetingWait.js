import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const Element = styled.div`
  padding: 10px;
  margin: auto;
  font-size: 26px;
`;

const MeetingWait = props => {
  return props.meeting ? (
    <Element>
      Meeting is starting in{' '}
      {moment().diff(moment(props.meeting.startTime), 'minutes')}
      {' minutes.'}
    </Element>
  ) : (
    <Element>No meeting registered</Element>
  );
};

export default MeetingWait;
