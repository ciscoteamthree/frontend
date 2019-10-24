import React from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';

const Panel = styled.div`
  background: #eee;
  margin-top: 5px;
  padding: 20px;
`;

class AdminPanel extends React.Component {
  state = {
    wsSocket: null,
    templates: []
  };
  componentDidMount() {
    const socket = io('http://localhost:8000');
    socket.on('templates', (templates) => {
        this.setState({
            templates
        })
        console.log("templates", templates)
    });
    socket.on('currentMeeting', (currentMeeting) => {
        console.log("current meeting", currentMeeting)
    });
  }

  render() {
    const { setAgenda } = this.props;
      const templates = this.state.templates.map(template => (
          <button onClick={() => setAgenda(template.agenda)}>{template.title}</button>
      ));
    return (
      <>
        <Panel>
          <h2>AdminPanel</h2>
        </Panel>
        <Panel>
          <h3>Templates</h3>
          {
              templates
          }
        </Panel>
      </>
    );
  }
}

export default AdminPanel;
