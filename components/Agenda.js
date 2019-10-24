import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { SortablePane, Pane } from 'react-sortable-pane';

const Agenda = props => {
  const { agenda } = props;
  const slices =
    agenda &&
    agenda.map(slice => (
      <Pane key={slice.id} defaultSize={{ width: '100%', height: 120 }}>
        <h2>{slice.title}</h2>
        <h2>{slice.description}</h2>
        <h2>{slice.duration}</h2>
        <h2>{slice.color}</h2>
      </Pane>
    ));
  return (
    <div style={{ padding: '10px' }}>
      <SortablePane direction="vertical" margin={20}>
        {slices}
      </SortablePane>
    </div>
  );
};

export default Agenda;
