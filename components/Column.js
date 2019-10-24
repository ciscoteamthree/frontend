import React from 'react';

const Column = props => (
  <div style={{ width: props.width }}>
    <a>{props.text}</a>
  </div>
);

export default Column;
