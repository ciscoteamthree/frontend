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

const ColumnContainer = styled.div`
  display: grid;
  grid-template-columns: 8fr 2fr;
  grid-template-rows: 1fr;
  grid-column-gap: 5px;
`;

const ClockWrapper = styled.div`
  width: 100%;
  text-align: center;
  font-size: 40px;
  background: white;
  height: 90px;
`;

const Clock = () => <ClockWrapper>{moment().format('HH:mm')}</ClockWrapper>;

class Admin extends React.Component {
  state = {
    agenda: null,
    title: null,
    startTime: null,
    titleError: null,
    timeError: null,
    socket: null,
    teamId: null
  };

  constructor(props) {
    super(props);
    this.setAgenda = this.setAgenda.bind(this);
    this.setTitle = this.setTitle.bind(this);
    this.setTime = this.setTime.bind(this);
    this.startMeeting = this.startMeeting.bind(this);
    const socket = io(WS_URL);
    this.state = {
      socket
    };
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
    const { socket, title, time, agenda } = this.state;
    if (title === null || title == '') {
      this.setState({ titleError: 'Title needs to be set' });
    }
    if (startTime === null || startTime == '') {
      this.setState({ timeError: 'Time needs to be set' });
    }
    if (
      title === null ||
      title == '' ||
      startTime === null ||
      startTime == ''
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
    const { socket, agenda, titleError, timeError, teamId } = this.state;
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
