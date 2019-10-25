import React from 'react';
import Router from 'next/router';
import { withRouter } from 'next/router';
import AdminPanel from '../components/AdminPanel';
import TeamPicker from '../components/TeamPicker';
import Agenda from '../components/Agenda';
import Header from '../components/Header';
import Clock from '../components/Clock';

class Admin extends React.Component {
  state = {
    agenda: null,
    title: null,
    startTime: null,
    titleError: null,
    timeError: null,
    agendaError: null,
    teamId: null
  };

  constructor(props) {
    super(props);
    this.setAgenda = this.setAgenda.bind(this);
    this.setTitle = this.setTitle.bind(this);
    this.setTime = this.setTime.bind(this);
    this.startMeeting = this.startMeeting.bind(this);
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
    const { title, startTime, agenda } = this.state;
    const { socket } = this.props;
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
    Router.push({
      pathname: '/'
    });
    socket.emit('editMeeting', meeting);
  };

  setTeamId = teamId => {
    this.setState({ teamId });
  };

  render() {
    const { agenda, titleError, timeError, teamId, agendaError } = this.state;
    const { socket, templates, currentMeeting } = this.props;
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
                templates={templates}
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
