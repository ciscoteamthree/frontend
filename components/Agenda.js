import React from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import moment from 'moment';
import { SortablePane, Pane } from 'react-sortable-pane';

const PaneWrapper = styled(Pane)`
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid 1px #ddd;
  background: ${props => props.background};
`;

const TextStyle = styled.h3`
  font-size: 16px;
  font-weight: bold;
`;

const Agenda = props => {
  const { agenda } = props;
  const slices =
    agenda &&
    agenda.map(slice => {
      console.log(slice);
      return (
        <PaneWrapper
          key={slice.id}
          defaultSize={{ width: '100%', height: 120 }}
          style={{ background: slice.color }}
        >
          <TextStyle key={slice.id}>{slice.title}</TextStyle>
        </PaneWrapper>
      );
    });
  return (
    <div style={{ padding: '10px' }}>
      <SortablePane
        direction="vertical"
        margin={20}
        onDragStart={() => console.log('DRAG START')}
        onDragStop={() => console.log('DRAG STOP')}
        onTouchStart={() => console.log('TOUCH START')}
      >
        {slices}
      </SortablePane>
    </div>
  );
};

export default Agenda;
