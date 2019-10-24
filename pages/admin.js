import React from 'react';
import Head from 'next/head';
import Column from '../components/Column';
import AdminPanel from '../components/AdminPanel';
import Agenda from '../components/Agenda';
import Header from '../components/Header';
import styled from 'styled-components';

const ColumnContainer = styled.div`
  display: grid;
  grid-template-columns: 8fr 2fr;
  grid-template-rows: 1fr;
  grid-column-gap: 5px;
`;

class Admin extends React.Component {
    state = {
        agenda: null
    }

    constructor(props) {
        super(props);
        this.setAgenda = this.setAgenda.bind(this)
    }

    setAgenda = (agenda) => {
        this.setState({
            agenda
        })
    }


    render() {
        const { agenda } = this.state;
        return (
        <div className="show-grid" >
            <div>
              <div className="columns small-8 medium-10 gridColumn">
                <Header />
                <AdminPanel setAgenda={this.setAgenda}/>
              </div>
              <div className="columns small-4 medium-2" style={{ height: '100vh' }}>
                <Agenda agenda={agenda} />
              </div>
          </div>
        </div>
        );
        /*
        <ColumnContainer>
            <Column background="white">
              <AdminPanel setAgenda={this.setAgenda}/>
            </Column>
            <Column background="white">
              <Agenda agenda={agenda} />
            </Column>
          </ColumnContainer>
        );
        */
    }
}

export default Admin;
