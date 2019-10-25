import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';

const ClockWrapper = styled.div`
  width: 100%;
  text-align: center;
  font-size: 40px;
  background: white;
  height: 90px;
`;

const Clock = () => {
  let interval;

  const [time, setTime] = useState();
  useEffect(() => {
    setTime(moment().format('HH:mm'));
    interval = setInterval(() => setTime(moment().format('HH:mm')), 10000);
  }, []);
  return <ClockWrapper>{time}</ClockWrapper>;
};

export default Clock;
