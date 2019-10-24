import React from 'react';
import styled from 'styled-components';

const Panel = styled.div`
  background: #eee;
  margin-top: 5px;
  padding: 20px;
`;

class AdminPanel extends React.Component {
  state = {
    templates: []
  };
  render() {
    const templates = this.state.templates.map(template => <h2>Something</h2>);
    return (
      <>
        <Panel>
          <h2>AdminPanel</h2>
        </Panel>
        <Panel>
          <h3>Templates</h3>
        </Panel>
      </>
    );
  }
}

export default AdminPanel;
