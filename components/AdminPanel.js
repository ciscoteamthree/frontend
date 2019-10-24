import React from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';
import Flex from 'styled-flex-component';
//import { Card, CardSection } from '@momentum-ui/react';

const Panel = styled.div`
  padding: 20px;
`;

const Template = styled.div`
  padding: 20px;
  background-color: white;
  width: 20%;
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
          <Template>
              <div><h3>{template.title}</h3></div>
              <hr />
              <div>Description... {template.description}</div>
              <div>Agenda</div>
              <div>Button</div>
          </Template>
      ));
    // <button onClick={() => setAgenda(template.agenda)}>{template.title}</button>
    return (
        <Panel>
          <h1>Templates</h1>
          <Flex full justifyAround>
          {
              templates
          }
        </Flex>
        </Panel>
    );
  }
}

export default AdminPanel;
