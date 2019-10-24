import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const Panel = styled.div`
  background: #eee;
  margin-top: 5px;
  padding: 20px;
`;

class Agenda extends React.Component {
  render() {
    return (
      <>
        <Panel>
          <h2>{moment().format('HH:mm')}</h2>
        </Panel>
        <Panel>
          <h3>Agenda</h3>
        </Panel>
      </>
    );
  }
}

export default Agenda;
