import React from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';
import Flex from 'styled-flex-component';
import { WS_URL } from '../config';
//import { Card, CardSection } from '@momentum-ui/react';

const Panel = styled.div`
  padding: 20px;
`;

const Template = styled.div`
  padding: 20px;
  background-color: white;
  width: 20%;
`;

const TextOverflow = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

class AdminPanel extends React.Component {
  state = {
    wsSocket: null,
      templates: [],
  };
  componentDidMount() {
    const socket = io(WS_URL);
    socket.on('templates', templates => {
      this.setState({
        templates
      });
    });
    socket.on('currentMeeting', currentMeeting => {
      console.log('current meeting', currentMeeting);
    });
  }

  render() {
    const { setAgenda, setTitle, setTime, titleError, timeError } = this.props;
    const templates = this.state.templates.map(template => (
      <Template key={template.title}>
        <Flex column full contentStretch>
          <div>
            <div>
              <h3>
                <TextOverflow>{template.title}</TextOverflow>
              </h3>
            </div>
            <hr />
            <div>{template.description}</div>
          </div>
          <Flex column style={{ height: '100%' }}>
            <Flex
              full
              column
              center
              style={{
                height: '150px',
                marginTop: '10px',
                opacity: 0.25,
                justifyContent: 'flex-end'
              }}
            >
              {template.agenda.slice(0, 3).map(slice => {
                return (
                  <span
                    key={`agenda-key-${slice.title}`}
                    className="md-badge"
                    style={{
                      backgroundColor: slice.color,
                      width: '80%',
                      padding: '10px',
                      marginBottom: '10px',
                      height: '2rem'
                    }}
                  >
                    <TextOverflow>{slice.title}</TextOverflow>
                  </span>
                );
              })}
            </Flex>
            <div style={{ textAlign: 'center', marginTop: '8px' }}>
              <button
                type="button"
                onClick={() => setAgenda(template.agenda)}
                className="md-button"
                style={{ backgroundColor: '#00a0d1', color: '#fff' }}
              >
                Use template
              </button>
            </div>
          </Flex>
        </Flex>
      </Template>
    ));
    return (
      <Panel>
        <h1>Templates</h1>
        <Flex full justifyAround style={{ marginTop: '20px' }}>
            {
                templates.length === 0
                    ? <i className="md-spinner md-spinner--28 md-spinner--blue" style={{
                        fontSize: '86px'
                    }}></i>
                    : templates
            }
        </Flex>
      </Panel>
    );
  }
}

export default AdminPanel;
