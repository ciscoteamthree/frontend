import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import Slice from './Slice';

const Panel = styled.div`
  background: #eee;
  margin-top: 5px;
  padding: 20px;
`;

class Agenda extends React.Component {
  render() {
    const { agenda } = this.props;
      console.log(agenda)
    return (
      <>
        <Panel>
          <h2>{moment().format('HH:mm')}</h2>
        </Panel>
        <Panel>
          <h3>Agenda</h3>
          { agenda && agenda.map(slice =>
            <Slice title={slice.title} description={slice.description} duration={slice.duration} color={slice.duration}/>
          )}
        </Panel>
      </>
    );
  }
}

export default Agenda;
