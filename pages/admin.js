import React from 'react';
import Head from 'next/head';
import Column from '../components/Column';
import AdminPanel from '../components/AdminPanel';
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
    timeError: null
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

  setTitle = title => {
    this.setState({
      title
    });
  };

  setTime = time => {
    this.setState({
      time
    });
  };

    startMeeting = () => {
        const socket = io(WS_URL);
        const { title, time, agenda } = this.state;
        if (title === null || title == '') {
            this.setState({titleError: "Title needs to be set"})
        }
        if (time === null || time == '') {
            this.setState({timeError: "Time needs to be set"})
        }
        if (title ===null || title == '' || time === null || time == '') {
            return;
        }
        const meeting = {
            title, time, agenda
        }
        socket.emit('editMeeting', meeting);
    }

  render() {
    const { agenda, titleError, timeError } = this.state;
    return (
      <div className="show-grid">
        <div>
          <div className="columns small-8 medium-10 gridColumn">
            <Header startMeeting={this.startMeeting} />
            <AdminPanel setAgenda={this.setAgenda} setTitle={this.setTitle} setTime={this.setTime} titleError={titleError} timeError={timeError}/>
          </div>
          <div
            className="columns small-4 medium-2 gridColumn"
            style={{ height: '100vh' }}
          >
            <Clock />
            <Agenda agenda={agenda} />
          </div>
        </div>
      </div>
    );
  }
}

export default Admin;
