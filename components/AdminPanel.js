import React from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';
import Flex from 'styled-flex-component';
import { WS_URL } from '../config';

const Section = styled.div`
  padding: 20px;
`;

const MeetingSetting = styled.div`
  width: 30vw;
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

const ErrorText = styled.div`
  color: #FF5C4A;
`;

class AdminPanel extends React.Component {
  state = {
    wsSocket: null,
    templates: []
  };
  componentDidMount() {
    const { socket } = this.props;
    console.log("SOCKET adminpanel!", socket)
    socket.on('templates', templates => {
      console.log("got templates", templates)
      this.setState({
        templates
      });
    });
    socket.on('currentMeeting', currentMeeting => {
      console.log('current meeting', currentMeeting);
    });
  }

  render() {
    const {
      title,
      startTime,
      setAgenda,
      setTitle,
      setTime,
      titleError,
        timeError,
        agendaError
    } = this.props;
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
                Use
              </button>
            </div>
          </Flex>
        </Flex>
      </Template>
    ));

    return (

      <Flex column>
        <Flex full row justifyAround>
            <Section>
                  <MeetingSetting>
              <Flex full center column>
                <div>
                  <h1>Meeting Title</h1>
                  <div className="md-input-group medium-12">
                    <input
                      className="md-input"
                      type="text"
                      placeholder="Important meeting"
                      value={title}
                      onChange={setTitle}
                      style={{
                          backgroundColor: 'white',
                          border: titleError && '1px solid #D93820'
                      }}
                    />
                    { titleError &&
                    <ErrorText>
                        * This field is required.
                    </ErrorText>
                    }
                  </div>
                </div>
          </Flex>
              </MeetingSetting>
            </Section>
            <Section>
          <MeetingSetting>
              <Flex full center column>
                <div>
                  <h1 style={{
                      textAlign: 'left'
                  }}>Start Time</h1>
              <div className="md-input-group medium-12">
                <input
                  className="md-input"
                  type="text"
                  value={startTime}
                  onChange={setTime}
                      style={{
                          backgroundColor: 'white',
                          border: timeError && '1px solid #D93820'

                      }}
                />
                { timeError &&
                <ErrorText>
                    * This field is required.
                </ErrorText>
                }
              </div>
            </div>
          </Flex>
          </MeetingSetting>
            </Section>
        </Flex>
        <Section>
          <h1>Templates</h1>
          { agendaError &&
          <ErrorText>
              * You need to choose a template.
          </ErrorText>
          }
          <Flex full justifyAround style={{ marginTop: '20px' }}>
            {
                templates.length === 0
                    ? <i className="md-spinner md-spinner--28 md-spinner--blue" style={{
                        fontSize: '86px'
                    }}></i>
                    : templates
            }
          </Flex>
        </Section>
      </Flex>
    );
  }
}

export default AdminPanel;
