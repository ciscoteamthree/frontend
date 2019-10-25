import React from 'react';

const SensorData = ({ sensorData }) => {
  if (!sensorData) return <div>Loading..</div>;
  return (
    <div>
      Temp: {sensorData.temp}&deg;C
      <br />
      Co2: {sensorData.co2} ppm
    </div>
  );
};

export default SensorData;
