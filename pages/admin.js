import React from 'react';
import Head from 'next/head';
import io from 'socket.io-client';
import { withRouter } from 'next/router';
import Column from '../components/Column';
import AdminPanel from '../components/AdminPanel';
import TeamPicker from '../components/TeamPicker';
import Agenda from '../components/Agenda';
import Header from '../components/Header';
import styled from 'styled-components';
import moment from 'moment';
import { WS_URL } from '../config';
import Clock from '../components/Clock';

const ColumnContainer = styled.div`
  display: grid;
  grid-template-columns: 8fr 2fr;
  grid-template-rows: 1fr;
  grid-column-gap: 5px;
`;

class Admin extends React.Component {
  state = {
    agenda: null,
    title: null,
    startTime: null,
    titleError: null,
    timeError: null,
    agendaError: null,
    teamId: null,
    socket: null
  };

  constructor(props) {
    super(props);
    this.setAgenda = this.setAgenda.bind(this);
    this.setTitle = this.setTitle.bind(this);
    this.setTime = this.setTime.bind(this);
    this.startMeeting = this.startMeeting.bind(this);
    console.log('WS_URL', WS_URL);
    const socket = io(WS_URL);
    console.log('Started socket!');
    this.state.socket = socket;
  }

  setAgenda = agenda => {
    this.setState({
      agenda
    });
  };

  setTitle(event) {
    this.setState({ title: event.target.value });
  }

  setTime(event) {
    this.setState({ startTime: event.target.value });
  }

  startMeeting = () => {
    console.log('startmeeting state', this.state);
    const { socket, title, startTime, agenda } = this.state;
    let newState = {};
    newState.agendaError = agenda === null || agenda == '';
    newState.titleError = title === null || title == '';
    newState.timeError = startTime === null || startTime == '';

    this.setState(newState);
    if (
      title === null ||
      title == '' ||
      startTime === null ||
      startTime == '' ||
      agenda === null ||
      agenda == ''
    ) {
      return;
    }
    const meeting = {
      title,
      startTime,
      agenda
    };
    console.log(meeting);
    socket.emit('editMeeting', meeting);
  };

  setTeamId = teamId => {
    this.setState({ teamId });
  };

  render() {
    const {
      socket,
      agenda,
      titleError,
      timeError,
      teamId,
      agendaError
    } = this.state;
    return (
      <div className="show-grid">
        <div>
          <div className="columns small-8 medium-10 gridColumn">
            <Header startMeeting={this.startMeeting} />
            {teamId ? (
              <AdminPanel
                socket={socket}
                setAgenda={this.setAgenda}
                setTitle={this.setTitle}
                title={this.state.title}
                setTime={this.setTime}
                startTime={this.state.startTime}
                titleError={titleError}
                timeError={timeError}
                agendaError={agendaError}
              />
            ) : (
              <TeamPicker
                setTeamId={this.setTeamId}
                token={this.props.router.query.token}
              />
            )}
          </div>
          <div
            className="columns small-4 medium-2 gridColumn"
            style={{ height: '100vh' }}
          >
            <Clock />
            <Agenda agenda={agenda || []} setAgenda={this.setAgenda} />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Admin);
