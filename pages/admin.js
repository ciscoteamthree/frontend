import React from 'react';
import Head from 'next/head';
import Column from '../components/Column';
import AdminPanel from '../components/AdminPanel';
import Agenda from '../components/Agenda';
import Header from '../components/Header';
import styled from 'styled-components';
import moment from 'moment';

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
    agenda: null
  };

  constructor(props) {
    super(props);
    this.setAgenda = this.setAgenda.bind(this);
  }

  setAgenda = agenda => {
    this.setState({
      agenda
    });
  };

  render() {
    const { agenda } = this.state;
    return (
      <div className="show-grid">
        <div>
          <div className="columns small-8 medium-10 gridColumn">
            <Header />
            <AdminPanel setAgenda={this.setAgenda} />
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
