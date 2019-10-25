import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';

const Wrapper = styled.div`
  width: 100%;
  text-align: center;
  font-size: 30px;
  background-color: white;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Child = styled.div`
  padding: 0 10px;
  td:first-child {
    padding-right: 10px;
  }
`;

const Time = styled.div`
  background-color: #777;
  padding: 0 5px;
  color: white;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const MiniHeader = ({ sensorData }) => {
  let interval;

  const [time, setTime] = useState(moment().format('HH:mm'));
  useEffect(() => {
    interval = setInterval(() => setTime(moment().format('HH:mm')), 10000);
  }, []);
  return (
    <Wrapper>
      <Child>
        <Time>{time}</Time>
      </Child>
      <Child style={{ fontSize: 13, textAlign: 'left' }}>
        {sensorData && (
          <table>
            <tbody>
              <tr>
                <td>Temp</td>
                <td>{sensorData.temperature}&deg;C</td>
              </tr>
              <tr>
                <td>CO2</td>
                <td>{sensorData.co2} ppm</td>
              </tr>
              <tr>
                <td>Noise</td>

                <td>{sensorData.noise} dB</td>
              </tr>
            </tbody>
          </table>
        )}
      </Child>
    </Wrapper>
  );
};

export default MiniHeader;
