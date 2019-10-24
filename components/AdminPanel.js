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
      console.log(this.state.templates);
      const templates = this.state.templates.map(template => (
          <Template>
              <div><h3>{template.title}</h3></div>
              <hr />
              <div>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              {template.description}</div>
              <div>
                  {
                      template.agenda.map(slice => {
                        <span key={`agenda-key-${slice.title}`} class="md-badge md-badge--blue">{slice}</span>
                      })
                  }
              </div>
              <div style={{ textAlign: 'center', marginTop: '13px' }}>
                  <button type="button" onClick={() => setAgenda(template.agenda)} class="md-button">Use template</button>
              </div>
          </Template>
      ));
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
